package com.k9c202.mpick.chatting.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.k9c202.mpick.chatting.controller.response.ChatMessageResponse;
import com.k9c202.mpick.chatting.controller.request.ChatMessageRequest;
import com.k9c202.mpick.chatting.controller.response.ChatRoomResponse;
import com.k9c202.mpick.chatting.dto.ChatRoomDto;
import com.k9c202.mpick.chatting.repository.ChatRoomQueryRepository;
import com.k9c202.mpick.chatting.repository.ChatRoomRepository;
import com.k9c202.mpick.chatting.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
@Slf4j
public class ChatHandler extends TextWebSocketHandler {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomQueryRepository chatRoomQueryRepository;
    private final ObjectMapper objectMapper;
    private final ChatService chatService;
    // Map<채팅방 아이디(key타입), 세션 리스트(value타입)> (Map: 파이썬에서의 딕셔너리, key-value)
    // TODO: 2023-11-07 List<WebSocketSession> -> Set<WebSocketSession>로 수정
    private Map<Long, List<WebSocketSession>> rooms = new ConcurrentHashMap<>();
    // 접속한 사람들을 set으로(순서 없는 리스트) 저장
    private Set<WebSocketSession> sessions = Collections.newSetFromMap(new ConcurrentHashMap<WebSocketSession, Boolean>());
    ;

    // 서버 접속한 클라이언트, 클라이언트가 보낸 메세지를 매개변수로 받는 함수
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        log.info(message.getPayload());
        String loginId = Objects.requireNonNull(session.getPrincipal()).getName();
        // 채팅메세지는 String으로 오는데, ChatMessageRequest 형식에 맞게 json format으로 변환
        ChatMessageRequest chatMessageRequest = objectMapper.readValue(message.getPayload(), ChatMessageRequest.class);
        // 채팅방id가 없으면 거래id를 기반으로 채팅방을 생성하고, 채팅방id를 그에 맞게 설정
        if (chatMessageRequest.getChatRoomId() == null) {
            ChatRoomDto chatRoomDto = chatService.createChatRoom(loginId, chatMessageRequest.getTradeId());
            Long chatRoomId = chatRoomDto.getChatRoomId();
            chatMessageRequest.setChatRoomId(chatRoomId);
            if (rooms.get(chatRoomId) == null) {
                for (WebSocketSession s : sessions) {
                    if (chatRoomDto.getSellerLoginId().equals(s.getPrincipal().getName())
                            || chatRoomDto.getBuyerLoginId().equals(s.getPrincipal().getName())) {
                        addSessionToRoom(chatRoomId, s);
                        s.sendMessage(new TextMessage(objectMapper.writeValueAsString(ChatRoomResponse.of(s.getPrincipal().getName(), chatRoomDto))));
                    }
                }
            }
        }
        // 해당 채팅방에 메세지 보내기
        // 데이터베이스에 채팅메세지 등록
        ChatMessageResponse chatMessageResponse = chatService.addChatMessage(loginId, chatMessageRequest);
        // 웹소켓에 데이터 전송 (발신자, 수신자 모두 공유)
        sendChatMessage(loginId, chatMessageRequest, chatMessageResponse);
    }

    private void sendChatMessage(String loginId, ChatMessageRequest chatMessageRequest, ChatMessageResponse chatMessageResponse) throws IOException {
        List<WebSocketSession> sessionList = rooms.get(chatMessageRequest.getChatRoomId());
        if (sessionList == null) {
            return;
        }
        for (WebSocketSession session : sessionList) {
            if (loginId.equals(session.getPrincipal().getName())) {
                session.sendMessage(new TextMessage(objectMapper.writeValueAsString(chatMessageResponse)));
            } else {
                session.sendMessage(new TextMessage(objectMapper.writeValueAsString(chatMessageResponse.flipped())));
            }
        }
    }

    // Client가 접속 시 호출되는 메서드
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // 인증 정보(header에 accessToekn)가 없으면 세션 종료
        if (session.getPrincipal() == null) {
            log.info(session + " WebSocketSession 인증을 실패 했습니다");
            session.sendMessage(new TextMessage("WebSocketSession 인증을 실패 했습니다"));
            session.close();
            return;
        }
        // 로그인 아이디 불러오기
        String loginId = session.getPrincipal().getName();
        log.info(session + " 클라이언트 접속 " + loginId);
        // 세션 추가
        sessions.add(session);
        // 채팅방에 입장시키기
        List<Long> chatRoomIdList = chatRoomQueryRepository.findAllChatRoomIdByLoginId(loginId);
        for (Long chatRoomId : chatRoomIdList) {
            addSessionToRoom(chatRoomId, session);
        }
    }

    private void addSessionToRoom(Long chatRoomId, WebSocketSession session) {
        if (rooms.get(chatRoomId) == null) {
            rooms.put(chatRoomId, new ArrayList<WebSocketSession>());
        }
        rooms.get(chatRoomId).add(session);
    }

    // client가 접속해제시 호출되는 메서드
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String loginId = session.getPrincipal() == null ? "" : session.getPrincipal().getName();
        log.info(session + " 클라이언트 접속 해제 " + loginId);
        // 채팅방 퇴장
        for (Long chatRoomId : rooms.keySet()) {
            rooms.get(chatRoomId).removeIf(s -> s == session);
        }
        // sessions에서 제거
        sessions.removeIf(s -> s == session);
    }
}
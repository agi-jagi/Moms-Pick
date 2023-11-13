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

// (참고) https://docs.spring.io/spring-framework/docs/5.3.30/reference/html/web.html#websocket
// WebSocket 서버 생성 : implementing WebSocketHandler or, more likely, extending either TextWebSocketHandler or BinaryWebSocketHandler
@Component
@RequiredArgsConstructor
@Slf4j
public class ChatHandler extends TextWebSocketHandler {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomQueryRepository chatRoomQueryRepository;
    private final ObjectMapper objectMapper;
    private final ChatService chatService;

    // (1) rooms : 현재 접속한(온라인) 클라이언트들을 방별로 분류 (딕셔너리) != DB
            // 예시) {
            //          1:[user1, user2],
            //          2:[user1, user3]
            //      }
    // Map<채팅방 아이디(key타입), 세션 리스트(value타입)> (Map: 파이썬에서의 딕셔너리, key-value)
    // ConcurrentHashMap을 사용하여 동시성 문제 해결
    // TODO: 2023-11-07 List<WebSocketSession> -> Set<WebSocketSession>로 수정
    private Map<Long, Set<WebSocketSession>> rooms = new ConcurrentHashMap<>();

    // (2) sessions : 접속한 모든 웹소켓 클라이언트 모음 (Set)
                // 예시) [user3, user1, user1, user2]
    // 접속한 사람들을 set으로(순서 없는 리스트) 저장 (연결된 모든 session 저장)
    // 클라이언트가 서버에 http 요청을 보냄 -> hand shaking 시작 -> webSocket session 생성 (클라이언트와 서버 연결(서버 입장에서는 클라이언트))
    private Set<WebSocketSession> sessions = Collections.newSetFromMap(new ConcurrentHashMap<WebSocketSession, Boolean>());


    // 서버 접속한 클라이언트, 클라이언트가 보낸 메세지를 매개변수로 받는 함수
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        log.info(message.getPayload());
        String loginId = Objects.requireNonNull(session.getPrincipal()).getName();

        // 채팅메세지는 String으로 오는데, ChatMessageRequest 형식에 맞게 json format으로 변환
        // String으로 온 메세지를 자바 클래스로 변환
        ChatMessageRequest chatMessageRequest = objectMapper.readValue(message.getPayload(), ChatMessageRequest.class);

        // 채팅방 id가 없으면 거래id를 기반으로 채팅방을 생성하고, 채팅방id를 그에 맞게 설정
        // 요청에 chatRoomId가 없을 때 (없는 것이 일반적)
        if (chatMessageRequest.getChatRoomId() == null) {
            // DB에 등록 (createChatRoom)
            // chatRoomDto : 새로 생성한 채팅방
            ChatRoomDto chatRoomDto = chatService.createChatRoom(loginId, chatMessageRequest.getTradeId());
            Long chatRoomId = chatRoomDto.getChatRoomId();
            chatMessageRequest.setChatRoomId(chatRoomId);
            // rooms에 chatRoomId가 없을 때
            if (rooms.get(chatRoomId) == null) {
                // 현재 온라인인 유저들 중
                for (WebSocketSession s : sessions) {
                    // 판매자 또는 구매자에 해당하는 유저 추가
                    if (chatRoomDto.getSellerLoginId().equals(s.getPrincipal().getName())
                            || chatRoomDto.getBuyerLoginId().equals(s.getPrincipal().getName())) {
                        // rooms에 유저 등록
                        addSessionToRoom(chatRoomId, s);
                        // 새로 생성된 방에 대한 정보(ChatRoomResponse) 전송
                        s.sendMessage(new TextMessage(objectMapper.writeValueAsString(ChatRoomResponse.of(s.getPrincipal().getName(), chatRoomDto))));
                    }
                }
            }
        }

        // chatRoomId가 있는 경우
        if (chatMessageRequest.getMessage() == null) {
            // 해당 채팅방 count reset
            chatService.resetUnreadCount(loginId, chatMessageRequest);
        } else {
            // 해당 채팅방에 메세지 보내기
            // 데이터베이스에 채팅메세지 등록
            ChatMessageResponse chatMessageResponse = chatService.addChatMessage(loginId, chatMessageRequest);
            // 웹소켓에 데이터 전송 (발신자, 수신자 모두 공유)
            sendChatMessage(loginId, chatMessageRequest, chatMessageResponse);
        }
    }

    private void sendChatMessage(String loginId, ChatMessageRequest chatMessageRequest, ChatMessageResponse chatMessageResponse) throws IOException {
        // 특정 채팅방의 session들 정보
        Set<WebSocketSession> sessionList = rooms.get(chatMessageRequest.getChatRoomId());
        // 비어있는/없는 채팅방 요청이 오는 경우 웹소켓 처리X (DB처리는 handleTextMessage에서 진행)
        if (sessionList == null) {
            return;
        }
        // 특정 채팅방에서 온라인 상태인 session
        for (WebSocketSession session : sessionList) {
            // 메세지 발신자인 경우
            if (loginId.equals(session.getPrincipal().getName())) {
                // response는 java클래스이기 때문에 string으로 변환하여 전송
                session.sendMessage(new TextMessage(objectMapper.writeValueAsString(chatMessageResponse)));
            // 메세지 수신자인 경우 (toMe 변경)
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
            log.info(session + " WebSocketSession 인증에 실패했습니다");
            session.sendMessage(new TextMessage("WebSocketSession 인증에 실패했습니다"));
            session.close();
            return;
        }
        // 인증 정보가 있으면,
        // 로그인 아이디 불러오기
        String loginId = session.getPrincipal().getName();
        log.info(session + " 클라이언트 접속 " + loginId);
        // 세션 추가
        sessions.add(session);
        // 채팅방에 입장시키기
        // 접속한 sessions만 관리하기 위해 rooms를 만들고 정보 추가하는 것
        List<Long> chatRoomIdList = chatRoomQueryRepository.findAllChatRoomIdByLoginId(loginId);
        for (Long chatRoomId : chatRoomIdList) {
            addSessionToRoom(chatRoomId, session);
        }
    }

    private void addSessionToRoom(Long chatRoomId, WebSocketSession session) {
        // rooms에 각 방번호를 key로 하는 빈 리스트 생성
        // key 에러 방지
        if (rooms.get(chatRoomId) == null) {
            rooms.put(chatRoomId, new HashSet<>());
        }
        // 채팅방에 session 추가 (파이썬에서의 rooms[chatRoomId]와 동일)
        rooms.get(chatRoomId).add(session);
    }

    // client가 접속 해제시 호출되는 메서드
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String loginId = session.getPrincipal() == null ? "" : session.getPrincipal().getName();
        log.info(session + " 클라이언트 접속 해제 " + loginId);
        // 채팅방 퇴장
        // rooms의 key는 chatRoomId
        // 접속 해제하는 session은 (1)rooms에서 제거
        for (Long chatRoomId : rooms.keySet()) {
            rooms.get(chatRoomId).removeIf(s -> s == session);
        }
        // (2)sessions에서 제거
        sessions.removeIf(s -> s == session);
    }
}
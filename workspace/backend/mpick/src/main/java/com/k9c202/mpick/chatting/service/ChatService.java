package com.k9c202.mpick.chatting.service;

import com.k9c202.mpick.chatting.controller.response.ChatRoomResponse;
import com.k9c202.mpick.chatting.controller.request.ChatMessageRequest;
import com.k9c202.mpick.chatting.dto.ChatRoomDto;
import com.k9c202.mpick.chatting.entity.ChatMessage;
import com.k9c202.mpick.chatting.entity.ChatRoom;
import com.k9c202.mpick.chatting.repository.ChatMessageRepository;
import com.k9c202.mpick.chatting.repository.ChatRoomQueryRepository;
import com.k9c202.mpick.chatting.repository.ChatRoomRepository;
import com.k9c202.mpick.chatting.controller.response.ChatMessageResponse;
import com.k9c202.mpick.trade.repository.TradeRepository;
import com.k9c202.mpick.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

// TODO: 2023-11-07 한 가지 방식으로 통일하기
// WebSocket : 채팅방 : entity -> dto -> response
// Controller : 채팅방 : entity -> response

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomQueryRepository chatRoomQueryRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final TradeRepository tradeRepository;
    private final UserRepository userRepository;

    // chatRoom entity를 response로 변환
    private ChatRoomResponse convertChatRoomToChatRoomResponse(String loginId, ChatRoom chatRoom) {
        // 구매자인 경우
        if (chatRoom.getUser().getLoginId().equals(loginId)) {
            return ChatRoomResponse.builder()
                    .chatRoomId(chatRoom.getId())
                    .nickname(chatRoom.getTrade().getUser().getNickname())
                    .profileImage(chatRoom.getTrade().getUser().getProfileImage())
                    .tradeId(chatRoom.getTrade().getId())
                    .tradeTitle(chatRoom.getTrade().getTitle())
                    .unreadCount(chatRoom.getBuyerUnreadCount())
                    // Optional.ofNullable : LastChatMessage가 null일 수도 있기 때문에 Optional로 만듦
                    // null이 아니면 map함수가 실행됨. null이면 null
                    .lastMessage(Optional.ofNullable(chatRoom.getLastChatMessage()).map(ChatMessage::getMessage).orElse(null))
                    .lastDateTime(Optional.ofNullable(chatRoom.getLastChatMessage()).map(ChatMessage::getCreatedDate).orElse(null))
//                    .lastMessage(chatRoom.getLastChatMessage().getMessage())
//                    .lastDateTime(chatRoom.getLastChatMessage().getCreatedDate())
                    .build();
        // 판매자인 경우
        } else {
            return ChatRoomResponse.builder()
                    .chatRoomId(chatRoom.getId())
                    .nickname(chatRoom.getUser().getNickname())
                    .profileImage(chatRoom.getUser().getProfileImage())
                    .tradeId(chatRoom.getTrade().getId())
                    .tradeTitle(chatRoom.getTrade().getTitle())
                    .unreadCount(chatRoom.getSellerUnreadCount())
                    .lastMessage(Optional.ofNullable(chatRoom.getLastChatMessage()).map(ChatMessage::getMessage).orElse(null))
                    .lastDateTime(Optional.ofNullable(chatRoom.getLastChatMessage()).map(ChatMessage::getCreatedDate).orElse(null))
                    .build();
        }
    }

    // 특정 유저 아이디로 채팅방 목록 불러오는 함수
    // TODO: 2023-11-13 ?? chatRoomRepository.findAllByUserLoginId(loginId);
    public List<ChatRoomResponse> getChatRooms(String loginId) {
//        chatRoomRepository.findAllByUserLoginId(loginId);
        // ** 리스트타입.stream().map(함수).collcet(Collectors.toList()) **
        return chatRoomQueryRepository.findAllByLoginId(loginId).stream()
                .map(chatRoom -> convertChatRoomToChatRoomResponse(loginId, chatRoom))
                .collect(Collectors.toList());
    }

    // 로그인 아이디, 채팅방id로 채팅메세지 불러오는 함수
    // TODO: 2023-11-13 checkBuyer 함수로 대체. boolean isBuyer = chatRoom.getUser().getLoginId().equals(loginId); ✔
    public List<ChatMessageResponse> getChatMessages(String loginId, Long chatRoomId){
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId).orElseThrow();
        // 판매자인지 구매자인지 판단
        boolean isBuyer = chatRoom.getUser().getLoginId().equals(loginId);
        return chatMessageRepository.findAllByChatRoomId(chatRoomId).stream()
                .map(chatMessage->convertChatMessageToChatMessageResponse(isBuyer,chatMessage))
                .collect(Collectors.toList());
    }

    // 채팅메세지 Entity를 ChatMessageResponse로 변환
    private ChatMessageResponse convertChatMessageToChatMessageResponse(boolean isBuyer, ChatMessage chatMessage) {
        return ChatMessageResponse.builder()
                .chatRoomId(chatMessage.getChatRoom().getId())
                .chatMessageId(chatMessage.getId())
                .toMe(chatMessage.getToSeller().equals(!isBuyer))
                .message(chatMessage.getMessage())
                .dateTime(chatMessage.getCreatedDate())
                .build();
    }

    // 특정 거래 & 특정 유저 정보로 채팅방 생성
    @Transactional
    public ChatRoomDto createChatRoom(String loginId, Long tradeId){
        ChatRoom chatRoom = chatRoomRepository.findByTradeIdAndUserLoginId(tradeId,loginId).orElse(null);
        // TODO: 2023-11-13 .buyerUnreadCount(0)은 ChatRoomEntity에서 설정하기
        if (chatRoom == null) {
            chatRoom = chatRoomRepository.save(ChatRoom.builder()
                    .trade(tradeRepository.getReferenceById(tradeId))
                    .user(userRepository.findOneByLoginId(loginId).orElseThrow())
                    .buyerUnreadCount(0)
                    .sellerUnreadCount(0)
                    .build());
        }
        // TODO: 2023-11-13 ?? 체크 필요. return convertChatRoomToChatRoomDto(chatRoom);
        return convertChatRoomToChatRoomDto(chatRoom);
    }

    // TODO: 2023-11-13 수정 체크
    public ChatRoomDto convertChatRoomToChatRoomDto(ChatRoom chatRoom) {
        return ChatRoomDto.builder()
                .chatRoomId(chatRoom.getId())
                .sellerLoginId(chatRoom.getTrade().getUser().getLoginId())
                .sellerNickname(chatRoom.getTrade().getUser().getNickname())
                .sellerProfileImage(chatRoom.getTrade().getUser().getProfileImage())
                .sellerUnreadCount(chatRoom.getSellerUnreadCount())
                .buyerLoginId(chatRoom.getUser().getLoginId())
                .buyerNickname(chatRoom.getUser().getNickname())
                .buyerProfileImage(chatRoom.getUser().getProfileImage())
                .buyerUnreadCount(chatRoom.getBuyerUnreadCount())
                .tradeId(chatRoom.getTrade().getId())
                .tradeTitle(chatRoom.getTrade().getTitle())
                .lastMessage(Optional.ofNullable(chatRoom.getLastChatMessage()).map(ChatMessage::getMessage).orElse(null))
                .lastDateTime(Optional.ofNullable(chatRoom.getLastChatMessage()).map(ChatMessage::getCreatedDate).orElse(null))
                .build();
    }

    @Transactional
    public ChatMessageResponse addChatMessage(String loginId, ChatMessageRequest chatMessageRequest) {
        // TODO: 2023-11-13 findById -> findByIdWithUser 커스텀
        ChatRoom chatRoom = chatRoomRepository.findById(chatMessageRequest.getChatRoomId()).orElseThrow();
        // TODO: 2023-11-13 checkBuyer 함수 따로 정의하기. chatRoom.getUser().getLoginId().equals(loginId)는 알아보기 어려운 형태
        //         .getLoginId() 부터는 n+1 문제 발생
        //         boolean isBuyer = chatRoom.getUser().getLoginId().equals(loginId);
        boolean isBuyer = chatRoom.getUser().getLoginId().equals(loginId);
        ChatMessage chatMessage = ChatMessage.builder()
                .chatRoom(chatRoom)
                .toSeller(chatRoom.getUser().getLoginId().equals(loginId))
                .message(chatMessageRequest.getMessage())
                // TODO: 2023-11-14 초기값 entity에서 정의하기
                .hideForBuyer(false)
                .hideForSeller(false)
                .build();
        ChatMessage save = chatMessageRepository.save(chatMessage);
        chatRoom.setLastChatMessage(save);
        // TODO: 2023-11-13 if-else문 지양하기 ✔
        if(isBuyer){
            chatRoom.increaseSellerUnreadCount();
            chatRoom.resetBuyerUnreadCount();
        }else{
            chatRoom.increaseBuyerUnreadCount();
            chatRoom.resetSellerUnreadCount();
        }
        return convertChatMessageToChatMessageResponse(isBuyer,save);
    }

    // 채팅방 접속 시 읽지 않은 메세지 수 0으로 초기화
    @Transactional
    public void resetUnreadCount(String loginId, ChatMessageRequest chatMessageRequest) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatMessageRequest.getChatRoomId()).orElseThrow();
        // 구매자/판매자 여부 체크
        boolean isBuyer = chatRoom.getUser().getLoginId().equals(loginId);
        // TODO: 2023-11-13 checkBuyer 함수 따로 사용하기 ✔
        // 구매자인 경우 구매자가 읽지 않은 메세지 수 초기화
        if(isBuyer) {
            chatRoom.resetBuyerUnreadCount();
        // 판매자인 경우 판매자가 읽지 않은 메세지 수 초기화
        } else {
            chatRoom.resetSellerUnreadCount();
        }
    }

}

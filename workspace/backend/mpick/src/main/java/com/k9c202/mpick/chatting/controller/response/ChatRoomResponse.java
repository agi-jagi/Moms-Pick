package com.k9c202.mpick.chatting.controller.response;

import com.k9c202.mpick.chatting.dto.ChatRoomDto;
import com.k9c202.mpick.chatting.entity.ChatRoom;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ChatRoomResponse {
    private Long chatRoomId;
    private String nickname;    // 상대방 닉네임 (내가 필요한 닉네임 정보는 상대방)
    private String profileImage;    // 상대방 프로필 이미지
    private Long tradeId;   // 거래 관련 정보
    private String tradeTitle;
    private String tradeImage;
    private String lastMessage; // 마지막 메세지
    private LocalDateTime lastDateTime; // 마지막 메세지 시간
    private Integer unreadCount;    // 내가 안읽은 숫자

    public static ChatRoomResponse of(String loginId, ChatRoomDto chatRoomDto){
        // 판매자인 걍우
        if(loginId.equals(chatRoomDto.getSellerLoginId())) {
            return ChatRoomResponse.builder()
                    .chatRoomId(chatRoomDto.getChatRoomId())
                    .nickname(chatRoomDto.getBuyerNickname())
                    .profileImage(chatRoomDto.getBuyerProfileImage())
                    .tradeId(chatRoomDto.getTradeId())
                    .tradeTitle(chatRoomDto.getTradeTitle())
                    .tradeImage(chatRoomDto.getTradeImage())
                    .lastMessage(chatRoomDto.getLastMessage())
                    .lastDateTime(chatRoomDto.getLastDateTime())
                    .unreadCount(chatRoomDto.getSellerUnreadCount())
                    .build();
        // 구매자인 경우
        }else{
            return ChatRoomResponse.builder()
                    .chatRoomId(chatRoomDto.getChatRoomId())
                    .nickname(chatRoomDto.getSellerNickname())
                    .profileImage(chatRoomDto.getSellerProfileImage())
                    .tradeId(chatRoomDto.getTradeId())
                    .tradeTitle(chatRoomDto.getTradeTitle())
                    .tradeImage(chatRoomDto.getTradeImage())
                    .lastMessage(chatRoomDto.getLastMessage())
                    .lastDateTime(chatRoomDto.getLastDateTime())
                    .unreadCount(chatRoomDto.getBuyerUnreadCount())
                    .build();

        }
    }
}
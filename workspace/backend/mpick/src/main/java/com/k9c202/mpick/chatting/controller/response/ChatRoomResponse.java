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
    private String tradeThumbnailImage;
    private String lastMessage; // 마지막 메세지
    private LocalDateTime lastDateTime; // 마지막 메세지 시간
    private Integer unreadCount;    // 내가 안읽은 숫자

    public static ChatRoomResponse of(String loginId, ChatRoomDto chatRoomDto){
        // 판매자인 경우
        if(loginId.equals(chatRoomDto.getSellerLoginId())) {
            return ChatRoomResponse.builder()
                    .chatRoomId(chatRoomDto.getChatRoomId())
                    .nickname(chatRoomDto.getBuyerNickname())   // 구매자 닉네임 (상대방 정보 필요)
                    .profileImage(chatRoomDto.getBuyerProfileImage())   // 구매자 프로필 이미지 (상대방 정보 필요)
                    .tradeId(chatRoomDto.getTradeId())
                    .tradeTitle(chatRoomDto.getTradeTitle())
                    .tradeThumbnailImage(chatRoomDto.getTradeThumbnailImage())
                    .lastMessage(chatRoomDto.getLastMessage())
                    .lastDateTime(chatRoomDto.getLastDateTime())
                    .unreadCount(chatRoomDto.getSellerUnreadCount())    // 판매자가 안 읽은 메세지 수 (내가 안 읽은 메세지)
                    .build();
        // 구매자인 경우
        }else{
            return ChatRoomResponse.builder()
                    .chatRoomId(chatRoomDto.getChatRoomId())
                    .nickname(chatRoomDto.getSellerNickname())  // 판매자 닉네임 (상대방 정보 필요)
                    .profileImage(chatRoomDto.getSellerProfileImage())  // 판매자 프로필 이미지 (상대방 정보 필요)
                    .tradeId(chatRoomDto.getTradeId())
                    .tradeTitle(chatRoomDto.getTradeTitle())
                    .tradeThumbnailImage(chatRoomDto.getTradeThumbnailImage())
                    .lastMessage(chatRoomDto.getLastMessage())
                    .lastDateTime(chatRoomDto.getLastDateTime())
                    .unreadCount(chatRoomDto.getBuyerUnreadCount()) // 구매자가 안 읽은 메세지 수 (내가 안 읽은 메세지)
                    .build();

        }
    }
}
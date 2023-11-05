package com.k9c202.mpick.chatting.controller.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatRoomResponse {
    private String nickname;
    private String profileImage;
    private String tradeId;
    private String tradeTitle;
    private String tradeImage;
    private String lastMessage;
    private String unreadCount;


}

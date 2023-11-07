package com.k9c202.mpick.chatting.controller.request;

// WebSocket클라이언트가 WebSocket서버로 메세지를 보내는 형식 (따로 폴더 만들어야 할까?)

import lombok.Data;

@Data
public class ChatMessageRequest {
    // 채팅방이 없는 경우, message & tradeId
    // 채팅방이 있는 경우, message & chatRoomId
    private Long chatRoomId;
    private String message;
    private Long tradeId;
}
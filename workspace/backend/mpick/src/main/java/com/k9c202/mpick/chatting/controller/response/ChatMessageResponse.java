package com.k9c202.mpick.chatting.controller.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ChatMessageResponse {
    private Long chatRoomId;
    private Long chatMessageId;
    private Long tradeId;
    private Boolean toMe;   // 나에게 온 메세지인지 여부
    private String message; // 메세지 내용
    private LocalDateTime dateTime; // 각 메세지 전송 시간
    private String myProfile;
    private String myNickname;
    private String myLoginId;
    private String otherProfile;
    private String otherNickname;
    private String otherLoginId;

    // 수신자, 발신자가 뒤바뀌는 경우
    public ChatMessageResponse flipped(){
        return ChatMessageResponse.builder()
                .chatRoomId(getChatRoomId())
                .chatMessageId(getChatMessageId())
                .tradeId(getTradeId())
                .toMe(!getToMe()) // toMe값 true <-> false 전환
                .message(getMessage())
                .myProfile(getOtherLoginId())
                .myNickname(getOtherNickname())
                .myLoginId(getOtherLoginId())
                .otherProfile(getMyProfile())
                .otherNickname(getMyNickname())
                .otherLoginId(getMyLoginId())
                .dateTime(getDateTime())
                .build();
    }
}
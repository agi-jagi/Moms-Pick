package com.k9c202.mpick.trade.controller.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.validation.constraints.NotNull;

@Data
@SuperBuilder
@NoArgsConstructor
public class TradeCompleteRequest {

    @NotNull(message = "채팅 id는 비어 있을 수 없습니다.")
    private Long chatRoomId;

    public TradeCompleteRequest(Long chatRoomId) {
        this.chatRoomId = chatRoomId;
    }
}

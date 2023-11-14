package com.k9c202.mpick.trade.controller.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
public class TradeCompleteRequest {

    private Long chatRoomId;

    public TradeCompleteRequest(Long chatRoomId) {
        this.chatRoomId = chatRoomId;
    }
}

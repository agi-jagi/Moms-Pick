package com.k9c202.mpick.trade.controller.request;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class TradeCompleteRequest {

    private Long tradeId;

    private Long ChatRoomId;
}

package com.k9c202.mpick.trade.controller.response;

import com.k9c202.mpick.trade.entity.TradeStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class SellListResponse {

    private Long tradeId;

    private String thumbNailImage;

    private String title;

    private String nickname;

    private Integer price;

    private TradeStatus tradeStatus;
}

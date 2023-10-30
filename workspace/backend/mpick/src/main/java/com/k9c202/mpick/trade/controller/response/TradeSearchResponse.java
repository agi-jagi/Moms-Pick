package com.k9c202.mpick.trade.controller.response;

import javax.validation.constraints.NotEmpty;

public class TradeSearchResponse {

    @NotEmpty
    private Integer tradeId;

    @NotEmpty
    private String nickname;

    @NotEmpty
    private Integer price;

    @NotEmpty
    private String title;

    @NotEmpty
    private String tradeImage;
}

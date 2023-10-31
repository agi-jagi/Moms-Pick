package com.k9c202.mpick.trade.controller.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@AllArgsConstructor
@NoArgsConstructor
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

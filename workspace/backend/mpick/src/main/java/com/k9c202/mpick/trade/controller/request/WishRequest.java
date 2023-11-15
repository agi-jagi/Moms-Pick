package com.k9c202.mpick.trade.controller.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class WishRequest {

    @NotNull(message = "판매글 id는 비어 있을 수 없습니다.")
    private Long tradeId;
}

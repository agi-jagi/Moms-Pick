package com.k9c202.mpick.trade.controller.request;

import lombok.Data;
import lombok.experimental.SuperBuilder;

import javax.validation.constraints.NotEmpty;
import java.math.BigDecimal;

@Data
@SuperBuilder
public class TradeQueryRequest {

    private String keyword;

    private Long categoryId;

    private Long categoryId2;

    @NotEmpty
    private BigDecimal latitude;

    @NotEmpty
    private BigDecimal longitude;

    @NotEmpty
    private Integer radius;
}

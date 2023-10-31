package com.k9c202.mpick.trade.controller.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import java.math.BigDecimal;

@Data
public class TradeSearchRequest {

    private Long categoryId;

    private Long categoryId2;

    @NotEmpty
    private BigDecimal latitude;

    @NotEmpty
    private BigDecimal longitude;

    @NotEmpty
    private Integer radius;

    public TradeQueryRequest toQueryRequest(String keyword) {
        return TradeQueryRequest.builder()
                .keyword(keyword)
                .categoryId(this.categoryId)
                .categoryId2(this.categoryId2)
                .latitude(this.latitude)
                .longitude(this.longitude)
                .radius(this.radius)
                .build();
    }
}

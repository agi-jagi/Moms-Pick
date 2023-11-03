package com.k9c202.mpick.trade.controller.component;

import com.k9c202.mpick.trade.entity.TradeStatus;
import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Data
@SuperBuilder
public class TradeDetailDto {

    private String title;

    private Integer price;

    private TradeStatus tradeStatus;

    private Timestamp tradeCreateDate;

    private String tradeExplain;

    private Long wishCount;

    private Long viewCount;
}

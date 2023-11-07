package com.k9c202.mpick.trade.controller.response;

import com.k9c202.mpick.trade.entity.TradeStatus;
import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Data
@SuperBuilder
public class TradeDetailResponse {

    private List<String> tradeImages;

    private String title;

    private Integer price;

    private TradeStatus tradeStatus;

    private Timestamp tradeCreateDate;

    private String tradeExplain;

    private String nickname;

    private BigDecimal rating;

    private Long wishCount;

    private Long viewCount;

    private String Address;

    private String tradeBabyMonth;

    private String mainCategory;

    private String subCategory;
}

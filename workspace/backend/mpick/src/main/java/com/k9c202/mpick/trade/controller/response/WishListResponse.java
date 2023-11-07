package com.k9c202.mpick.trade.controller.response;

import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.sql.Timestamp;

@Data
@SuperBuilder
public class WishListResponse {

    private Long tradeId;

    private String tradeImage;

    private String title;

    private String nickname;

    private Integer price;

    private Timestamp createDate;
}

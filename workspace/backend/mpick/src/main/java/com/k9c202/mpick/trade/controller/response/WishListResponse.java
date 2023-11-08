package com.k9c202.mpick.trade.controller.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.sql.Timestamp;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class WishListResponse {

    private Long tradeId;

    private String thumbNailImage;

    private String title;

    private String nickname;

    private Integer price;
}

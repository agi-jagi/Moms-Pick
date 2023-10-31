package com.k9c202.mpick.trade.controller.request;

import com.k9c202.mpick.trade.entity.Category;
import com.k9c202.mpick.trade.entity.TradeStatus;
import com.k9c202.mpick.user.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
public class TradeAddRequest {

    private String loginId;

    private Long categoryId;

    private Integer addressId;

    private String title;

    private Integer price;

    private String tradeExplain;

}

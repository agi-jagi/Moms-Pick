package com.k9c202.mpick.trade.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigInteger;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TradeListResponseDto {

    private BigInteger tradeId;
}
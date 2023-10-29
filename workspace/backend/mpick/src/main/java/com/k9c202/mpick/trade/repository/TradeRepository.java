package com.k9c202.mpick.trade.repository;

import com.k9c202.mpick.trade.entity.Trade;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public interface TradeRepository {

    void save(Trade trade);

    Trade findOne(UUID id);

    List<Trade> findAll();

    List<Trade> findByTitle(String title);
}

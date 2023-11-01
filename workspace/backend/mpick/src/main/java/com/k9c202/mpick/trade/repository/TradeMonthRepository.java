package com.k9c202.mpick.trade.repository;

import com.k9c202.mpick.trade.entity.TradeMonth;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TradeMonthRepository extends JpaRepository<TradeMonth, Integer> {
}

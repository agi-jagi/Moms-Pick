package com.k9c202.mpick.trade.repository;

import com.k9c202.mpick.trade.entity.BabyMonth;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BabyMonthRepository extends JpaRepository<BabyMonth, Integer> {

    BabyMonth findByStartMonth(Integer startMonth);
}

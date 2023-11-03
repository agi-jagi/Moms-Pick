package com.k9c202.mpick.trade.repository;

import com.k9c202.mpick.trade.entity.BabyMonth;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BabyMonthRepository extends JpaRepository<BabyMonth, Integer> {

    Optional<BabyMonth> findByStartMonth(Integer startMonth);
}

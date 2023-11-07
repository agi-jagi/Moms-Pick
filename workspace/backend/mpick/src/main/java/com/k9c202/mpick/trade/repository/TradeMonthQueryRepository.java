package com.k9c202.mpick.trade.repository;


import com.k9c202.mpick.trade.entity.BabyMonth;
import com.k9c202.mpick.trade.entity.TradeMonth;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static com.k9c202.mpick.trade.entity.QTrade.trade;
import static com.k9c202.mpick.trade.entity.QTradeMonth.tradeMonth;
import static com.k9c202.mpick.trade.entity.QBabyMonth.babyMonth;

@Slf4j
@Repository
public class TradeMonthQueryRepository {

    private final JPAQueryFactory queryFactory;

    public TradeMonthQueryRepository(EntityManager em) { this.queryFactory = new JPAQueryFactory(em); }

    public List<BabyMonth> findBabyMonthByTradeId(Long tradeId) {
        List<BabyMonth> result = queryFactory
                .select(tradeMonth.babyMonth)
                .from(tradeMonth)
                .where(tradeMonth.trade.id.eq(tradeId))
                .fetch();

        return result;
    }
}

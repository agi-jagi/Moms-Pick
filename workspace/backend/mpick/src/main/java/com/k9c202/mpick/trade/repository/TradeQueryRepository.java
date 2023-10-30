package com.k9c202.mpick.trade.repository;

import com.k9c202.mpick.trade.controller.request.TradeQueryRequest;
import com.k9c202.mpick.trade.controller.request.TradeSearchRequest;
import com.k9c202.mpick.trade.entity.QTrade;
import com.k9c202.mpick.trade.entity.Trade;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static com.k9c202.mpick.trade.entity.QTrade.trade;

@Repository
public class TradeQueryRepository {

    private final JPAQueryFactory queryFactory;

    public TradeQueryRepository(EntityManager em) { this.queryFactory = new JPAQueryFactory(em); }

    public List<Trade> tradeFilterContainer(TradeQueryRequest request) {

        List<Trade> result = queryFactory
                .select(trade)
                .from(trade)
                .where(trade.category.id.eq(request.getCategoryId()))
                .fetch();

        return result;
    }

}

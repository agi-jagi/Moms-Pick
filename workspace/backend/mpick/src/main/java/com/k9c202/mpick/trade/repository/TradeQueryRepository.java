package com.k9c202.mpick.trade.repository;

import com.k9c202.mpick.trade.controller.request.TradeQueryRequest;
import com.k9c202.mpick.trade.controller.response.PurchaseListResponse;
import com.k9c202.mpick.trade.controller.response.SaleListResponse;
import com.k9c202.mpick.trade.controller.response.TradeSearchResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static com.k9c202.mpick.trade.entity.QTrade.trade;
import static com.k9c202.mpick.trade.entity.QCategory.category;
import static com.k9c202.mpick.user.entity.QUser.user;

@Slf4j
@Repository
public class TradeQueryRepository {

    private final JPAQueryFactory queryFactory;

    public TradeQueryRepository(EntityManager em) { this.queryFactory = new JPAQueryFactory(em); }

    public List<SaleListResponse> findSellList(Long userId) {
        List<SaleListResponse> result = queryFactory
                .select(Projections.constructor(SaleListResponse.class,
                        trade.id,
                        trade.thumbNailImage,
                        trade.title,
                        trade.user.nickname,
                        trade.price,
                        trade.tradeStatus))
                .from(trade)
                .where(trade.user.id.eq(userId))
                .fetch();

        return result;
    }

    public List<PurchaseListResponse> findPurchaseList(Long userId) {
        List<PurchaseListResponse> result = queryFactory
                .select(Projections.constructor(PurchaseListResponse.class,
                        trade.id,
                        trade.thumbNailImage,
                        trade.title,
                        trade.user.nickname,
                        trade.price,
                        trade.tradeStatus))
                .from(trade)
                .where(trade.user.id.eq(userId))
                .fetch();

        return result;
    }
}

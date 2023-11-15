package com.k9c202.mpick.trade.repository;

import com.k9c202.mpick.trade.controller.request.TradeQueryRequest;
import com.k9c202.mpick.trade.controller.response.PurchaseListResponse;
import com.k9c202.mpick.trade.controller.response.SaleListResponse;
import com.k9c202.mpick.trade.controller.response.TradeSearchResponse;
import com.k9c202.mpick.trade.entity.TradeStatus;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static com.k9c202.mpick.trade.entity.QTrade.trade;
import static com.k9c202.mpick.trade.entity.QCategory.category;
import static com.k9c202.mpick.trade.entity.QWish.wish;
import static com.k9c202.mpick.user.entity.QUser.user;

@Slf4j
@Repository
public class TradeQueryRepository {

    private final JPAQueryFactory queryFactory;

    public TradeQueryRepository(EntityManager em) { this.queryFactory = new JPAQueryFactory(em); }

    public List<SaleListResponse> findSellList(Long userId) {

        OrderSpecifier<Integer> orderSpecifier = orderByEnum();

        List<SaleListResponse> result = queryFactory
                .select(Projections.constructor(SaleListResponse.class,
                        trade.id,
                        trade.thumbNailImage,
                        trade.title,
                        trade.user.nickname,
                        trade.price,
                        trade.tradeStatus))
                .from(trade)
                .where(trade.user.id.eq(userId),
                        trade.tradeStatus.ne(TradeStatus.삭제됨))
                .orderBy(orderSpecifier)
                .fetch();

        return result;
    }

    public List<PurchaseListResponse> findPurchaseList(Long userId) {

        OrderSpecifier<Integer> orderSpecifier = orderByEnum();

        List<PurchaseListResponse> result = queryFactory
                .select(Projections.constructor(PurchaseListResponse.class,
                        trade.id,
                        trade.thumbNailImage,
                        trade.title,
                        trade.user.nickname,
                        trade.price,
                        trade.tradeStatus))
                .from(trade)
                .where(trade.user.id.eq(userId),
                        trade.tradeStatus.ne(TradeStatus.삭제됨))
                .orderBy(orderSpecifier)
                .fetch();

        return result;
    }

    private OrderSpecifier<Integer> orderByEnum() {
        // Wish 엔터티의 tradeStatus 필드가 Enum 타입인 경우를 가정합니다.
        NumberExpression<Integer> cases = new CaseBuilder()
                .when(trade.tradeStatus.eq(TradeStatus.판매중)).then(1) // 판매중이면 1
                .when(trade.tradeStatus.eq(TradeStatus.판매완료)).then(2) // 판매완료이면 2
                .otherwise(3); // 그 외의 경우에는 3
        return new OrderSpecifier<>(Order.ASC, cases);
    }
}

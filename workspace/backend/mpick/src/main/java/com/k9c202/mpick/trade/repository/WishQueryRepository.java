package com.k9c202.mpick.trade.repository;

import com.k9c202.mpick.trade.controller.response.WishListResponse;
import com.k9c202.mpick.trade.entity.QWish;
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
import java.math.BigDecimal;
import java.util.List;

import static com.k9c202.mpick.user.entity.QRating.rating;
import static com.k9c202.mpick.trade.entity.QWish.wish;

@Slf4j
@Repository
public class WishQueryRepository {

    private final JPAQueryFactory queryFactory;

    public WishQueryRepository(EntityManager em) { this.queryFactory = new JPAQueryFactory(em); }

    public List<BigDecimal> findRatingByUserId(Long userId) {

        List<BigDecimal> result = queryFactory
                .select(rating.rate)
                .from(rating)
                .where(rating.reviewer.id.eq(userId))
                .fetch();

        return result;
    }

    public Long getWishCount(Long tradeId) {

        Long result = queryFactory
                .select(wish.count())
                .from(wish)
                .where(wish.trade.id.eq(tradeId))
                .fetchOne();


        return result;
    }

    public List<WishListResponse> findWishList(Long userId) {

        OrderSpecifier<Integer> orderSpecifier = orderByEnum();

        List<WishListResponse> result = queryFactory
                .select(Projections.constructor(WishListResponse.class,
                        wish.trade.id,
                        wish.trade.thumbNailImage,
                        wish.trade.title,
                        wish.user.nickname,
                        wish.trade.price,
                        wish.trade.tradeStatus
                        ))
                .from(wish)
                .where(wish.user.id.eq(userId))
                .orderBy(orderSpecifier)
                .fetch();

        return result;
    }

    public Long existWish(Long userId, Long tradeId) {
        Long result = queryFactory
                .select(wish.count())
                .from(wish)
                .where(
                        wish.trade.id.eq(tradeId),
                        wish.user.id.eq(userId)
                )
                .fetchFirst();

        return result;
    }

    private OrderSpecifier<Integer> orderByEnum() {
        // Wish 엔터티의 tradeStatus 필드가 Enum 타입인 경우를 가정합니다.
        NumberExpression<Integer> cases = new CaseBuilder()
                .when(wish.trade.tradeStatus.eq(TradeStatus.판매중)).then(1) // 판매중이면 1
                .when(wish.trade.tradeStatus.eq(TradeStatus.판매완료)).then(2) // 판매완료이면 2
                .otherwise(3); // 그 외의 경우에는 3
        return new OrderSpecifier<>(Order.ASC, cases);
    }

}

package com.k9c202.mpick.trade.repository;

import com.k9c202.mpick.trade.controller.response.WishListResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.List;

import static com.k9c202.mpick.user.entity.QRating.rating;
import static com.k9c202.mpick.trade.entity.QWish.wish;
import static com.k9c202.mpick.trade.entity.QTrade.trade;
import static com.k9c202.mpick.user.entity.QUser.user;

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
        List<WishListResponse> result = queryFactory
                .select(Projections.constructor(WishListResponse.class,
                        wish.trade.id,
                        wish.trade.thumbNailImage,
                        wish.trade.title,
                        wish.user.nickname,
                        wish.trade.price
                        ))
                .from(wish)
                .where(wish.user.id.eq(userId))
                .fetch();

        return result;
    }
}

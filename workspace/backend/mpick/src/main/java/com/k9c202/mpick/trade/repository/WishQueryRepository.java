package com.k9c202.mpick.trade.repository;

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
}

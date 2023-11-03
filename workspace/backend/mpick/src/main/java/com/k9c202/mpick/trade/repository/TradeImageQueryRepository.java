package com.k9c202.mpick.trade.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static com.k9c202.mpick.trade.entity.QTradeImage.tradeImage;

@Slf4j
@Repository
public class TradeImageQueryRepository {

    private final JPAQueryFactory queryFactory;

    public TradeImageQueryRepository(EntityManager em) { this.queryFactory = new JPAQueryFactory(em); }
    public List<String> findTradeDetailImages(Long tradeId) {

        List<String> result = queryFactory
                .select(tradeImage.saveFileName)
                .from(tradeImage)
                .where(tradeImage.trade.id.eq(tradeId))
                .fetch();

        return result;
    }
}

package com.k9c202.mpick.trade.repository;

import com.k9c202.mpick.trade.controller.component.TradeDetailDto;
import com.k9c202.mpick.trade.controller.request.TradeQueryRequest;
import com.k9c202.mpick.trade.controller.request.TradeSearchRequest;
import com.k9c202.mpick.trade.controller.response.TradeSearchResponse;
import com.k9c202.mpick.trade.entity.QTrade;
import com.k9c202.mpick.trade.entity.Trade;
import com.k9c202.mpick.trade.entity.TradeImage;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static com.k9c202.mpick.trade.entity.QTrade.trade;
import static com.k9c202.mpick.trade.entity.QCategory.category;
import static com.k9c202.mpick.user.entity.QUser.user;
import static com.k9c202.mpick.trade.entity.QTradeImage.tradeImage;

@Slf4j
@Repository
public class TradeQueryRepository {

    private final JPAQueryFactory queryFactory;

    public TradeQueryRepository(EntityManager em) { this.queryFactory = new JPAQueryFactory(em); }

    public List<TradeSearchResponse> tradeFilterContainer(TradeQueryRequest request, Integer page) {

        List<TradeSearchResponse> result = queryFactory
                .select(Projections.constructor(TradeSearchResponse.class,
                        trade.id,
                        user.nickname,
                        trade.price,
                        trade.title,
                        trade.tradeExplain
                        ))
                .from(trade)
                .where(
//                        trade.category.id.eq(request.getCategoryId())
                )
                .leftJoin(category).on(trade.category.eq(category))
                .leftJoin(user).on(trade.user.eq(user))
//                .innerJoin(tradeImage).on(tradeImage.trade.eq(trade))
//                .offset(page.longValue()*9)
//                .limit(9)
                .fetch();

        return result;
    }



    public void increaseViewCount(Long tradeId) {
        Long updateCnt = queryFactory
                .update(trade)
                .set(trade.viewCount, trade.viewCount.add(1))
                .where(trade.id.eq(tradeId))
                .execute();
        return;
//        Long updateeViewCount = queryFactory
//                .select(trade.viewCount)
//                .from(trade)
//                .where(trade.id.eq(tradeId))
//                .fetchOne().longValue();
    }
}

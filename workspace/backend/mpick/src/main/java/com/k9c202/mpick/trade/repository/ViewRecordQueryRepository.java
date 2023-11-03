package com.k9c202.mpick.trade.repository;

import com.k9c202.mpick.trade.entity.ViewRecordId;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

import static com.k9c202.mpick.trade.entity.QViewRecord.viewRecord;
import static com.k9c202.mpick.user.entity.QUser.user;

@Repository
public class ViewRecordQueryRepository {

    private final JPAQueryFactory queryFactory;

    public ViewRecordQueryRepository(EntityManager em) { this.queryFactory = new JPAQueryFactory(em); }

    public boolean existViewRecord(ViewRecordId viewRecordId) {

        ViewRecordId result = queryFactory
                .select(viewRecord.viewRecordId)
                .from(viewRecord)
                .where(viewRecord.viewRecordId.eq(viewRecordId))
                .fetchFirst();

        return result != null;
    }

    public Long getViewRecordCount(Long tradeId) {

        Long viewCount = queryFactory
                .select(viewRecord.count())
                .from(viewRecord)
                .where(viewRecord.viewRecordId.trade.id.eq(tradeId))
                .fetchFirst();

        return viewCount;
    }
}

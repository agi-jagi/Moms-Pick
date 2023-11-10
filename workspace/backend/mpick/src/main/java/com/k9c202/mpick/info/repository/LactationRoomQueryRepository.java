package com.k9c202.mpick.info.repository;

import com.k9c202.mpick.info.controller.response.LactationRoomResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.expression.Expression;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.List;

import static com.k9c202.mpick.info.entity.QLactationRoom.lactationRoom;

@Repository
public class LactationRoomQueryRepository {

    private final JPAQueryFactory queryFactory;

    public LactationRoomQueryRepository(EntityManager em) { this.queryFactory = new JPAQueryFactory(em); }

//    public List<LactationRoomResponse> findLactationByLocation(BigDecimal latitude, BigDecimal longitude) {
//        List<LactationRoomResponse> result = queryFactory
//                .select(Projections.constructor(LactationRoomResponse.class,
//                        lactationRoom.id,
//                        lactationRoom.facilityName,
//                        lactationRoom.address,
//                        lactationRoom.buildingName,
//                        lactationRoom.latitude,
//                        lactationRoom.longitude))
//                .from(lactationRoom)
//                .where(Expressions.stringTemplate())
//                .fetch();
//
//        return result;
//    }

}

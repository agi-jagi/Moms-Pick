package com.k9c202.mpick.info.repository;

import com.k9c202.mpick.info.controller.response.LactationRoomInfoResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.*;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.List;

import static com.k9c202.mpick.info.entity.QLactationRoom.lactationRoom;

@Repository
public class LactationRoomQueryRepository {

    private final JPAQueryFactory queryFactory;

    public LactationRoomQueryRepository(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    public List<LactationRoomInfoResponse> findLactationByLocation(BigDecimal latitude, BigDecimal longitude) {

        // latitude 를 radians 로 계산
        NumberExpression<Double> radiansLatitude =
                Expressions.numberTemplate(Double.class, "radians({0})", latitude);

        // 계산된 latitude -> 코사인 계산
        NumberExpression<Double> cosLatitude =
                Expressions.numberTemplate(Double.class, "cos({0})", radiansLatitude);
        NumberExpression<Double> cosLactationLatitude =
                Expressions.numberTemplate(Double.class, "cos(radians({0}))", lactationRoom.latitude);

        // 계산된 latitude -> 사인 계산
        NumberExpression<Double> sinLatitude =
                Expressions.numberTemplate(Double.class, "sin({0})", radiansLatitude);
        NumberExpression<Double> sinLactationLatitude =
                Expressions.numberTemplate(Double.class, "sin(radians({0}))", lactationRoom.latitude);

        // 사이 거리 계산
        NumberExpression<Double> cosLongitude =
                Expressions.numberTemplate(Double.class, "cos(radians({0}) - radians({1}))", lactationRoom.longitude, longitude);

        NumberExpression<Double> acosExpression =
                Expressions.numberTemplate(Double.class, "acos({0})", cosLatitude.multiply(cosLactationLatitude).multiply(cosLongitude).add(sinLatitude.multiply(sinLactationLatitude)));

        // 최종 계산
        NumberExpression<Double> distanceExpression =
                Expressions.numberTemplate(Double.class, "6371 * {0}", acosExpression);

        return queryFactory
                .select(Projections.constructor(LactationRoomInfoResponse.class,
                        lactationRoom.id,
                        lactationRoom.facilityName,
                        lactationRoom.address,
                        lactationRoom.buildingName,
                        lactationRoom.latitude,
                        lactationRoom.longitude))
                .from(lactationRoom)
                .where(distanceExpression.loe(5))
                .fetch();
    }
}
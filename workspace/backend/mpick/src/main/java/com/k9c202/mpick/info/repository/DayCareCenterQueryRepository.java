package com.k9c202.mpick.info.repository;

import com.k9c202.mpick.info.controller.response.DayCareCenterInfoResponse;
import com.k9c202.mpick.info.controller.response.KindergartenInfoResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.List;

import static com.k9c202.mpick.info.entity.QDayCareCenter.dayCareCenter;

@Repository

public class DayCareCenterQueryRepository {

    private final JPAQueryFactory queryFactory;

    public DayCareCenterQueryRepository(EntityManager em) { this.queryFactory = new JPAQueryFactory(em); }

    public List<DayCareCenterInfoResponse> findDayCareCenterByLocation(BigDecimal latitude, BigDecimal longitude) {

        // latitude 를 radians 로 계산
        NumberExpression<Double> radiansLatitude =
                Expressions.numberTemplate(Double.class, "radians({0})", latitude);

        // 계산된 latitude -> 코사인 계산
        NumberExpression<Double> cosLatitude =
                Expressions.numberTemplate(Double.class, "cos({0})", radiansLatitude);
        NumberExpression<Double> cosDayCareLatitude =
                Expressions.numberTemplate(Double.class, "cos(radians({0}))", dayCareCenter.latitude);

        // 계산된 latitude -> 사인 계산
        NumberExpression<Double> sinLatitude =
                Expressions.numberTemplate(Double.class, "sin({0})", radiansLatitude);
        NumberExpression<Double> sinDayCareLatitude =
                Expressions.numberTemplate(Double.class, "sin(radians({0}))", dayCareCenter.latitude);

        // 사이 거리 계산
        NumberExpression<Double> cosLongitude =
                Expressions.numberTemplate(Double.class, "cos(radians({0}) - radians({1}))", dayCareCenter.longitude, longitude);

        NumberExpression<Double> acosExpression =
                Expressions.numberTemplate(Double.class, "acos({0})", cosLatitude.multiply(cosDayCareLatitude).multiply(cosLongitude).add(sinLatitude.multiply(sinDayCareLatitude)));

        // 최종 계산
        NumberExpression<Double> distanceExpression =
                Expressions.numberTemplate(Double.class, "6371 * {0}", acosExpression);

        return queryFactory
                .select(Projections.constructor(DayCareCenterInfoResponse.class,
                        dayCareCenter.id,
                        dayCareCenter.address,
                        dayCareCenter.latitude,
                        dayCareCenter.longitude,
                        dayCareCenter.establish,
                        dayCareCenter.dayCareCenterName,
                        dayCareCenter.hpAddress))
                .from(dayCareCenter)
                .where(distanceExpression.loe(5))
                .fetch();
    }
}

package com.k9c202.mpick.info.repository;

import com.k9c202.mpick.info.controller.response.KindergartenInfoResponse;
import com.k9c202.mpick.info.controller.response.LactationRoomInfoResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

import java.math.BigDecimal;
import java.util.List;

import static com.k9c202.mpick.info.entity.QKindergarten.kindergarten;

@Repository
public class KindergartenQueryRepository {

    private final JPAQueryFactory queryFactory;

    public KindergartenQueryRepository(EntityManager em) { this.queryFactory = new JPAQueryFactory(em); }

    public List<KindergartenInfoResponse> findKindergartenByLocation(BigDecimal latitude, BigDecimal longitude) {

        // latitude 를 radians 로 계산
        NumberExpression<Double> radiansLatitude =
                Expressions.numberTemplate(Double.class, "radians({0})", latitude);

        // 계산된 latitude -> 코사인 계산
        NumberExpression<Double> cosLatitude =
                Expressions.numberTemplate(Double.class, "cos({0})", radiansLatitude);
        NumberExpression<Double> cosKinderLatitude =
                Expressions.numberTemplate(Double.class, "cos(radians({0}))", kindergarten.latitude);

        // 계산된 latitude -> 사인 계산
        NumberExpression<Double> sinLatitude =
                Expressions.numberTemplate(Double.class, "sin({0})", radiansLatitude);
        NumberExpression<Double> sinKinderLatitude =
                Expressions.numberTemplate(Double.class, "sin(radians({0}))", kindergarten.latitude);

        // 사이 거리 계산
        NumberExpression<Double> cosLongitude =
                Expressions.numberTemplate(Double.class, "cos(radians({0}) - radians({1}))", kindergarten.longitude, longitude);

        NumberExpression<Double> acosExpression =
                Expressions.numberTemplate(Double.class, "acos({0})", cosLatitude.multiply(cosKinderLatitude).multiply(cosLongitude).add(sinLatitude.multiply(sinKinderLatitude)));

        // 최종 계산
        NumberExpression<Double> distanceExpression =
                Expressions.numberTemplate(Double.class, "6371 * {0}", acosExpression);

        return queryFactory
                .select(Projections.constructor(KindergartenInfoResponse.class,
                        kindergarten.id,
                        kindergarten.address,
                        kindergarten.latitude,
                        kindergarten.longitude,
                        kindergarten.establish,
                        kindergarten.kinderName,
                        kindergarten.hpAddress))
                .from(kindergarten)
                .where(distanceExpression.loe(5))
                .fetch();
    }
}

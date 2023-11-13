package com.k9c202.mpick.info.repository;

import com.k9c202.mpick.info.controller.response.BabyMealInfoListResponse;
import com.k9c202.mpick.info.entity.SubMealCategory;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static com.k9c202.mpick.info.entity.QbabyMeal.babyMeal;

@Repository
public class BabyMealQueryRepository {

    private final JPAQueryFactory queryFactory;

    public BabyMealQueryRepository(EntityManager em) { this.queryFactory = new JPAQueryFactory(em); }

    public List<BabyMealInfoListResponse> findBabyMealBySubCategory(SubMealCategory subMealCategory, Integer page) {

        return queryFactory
                .select(Projections.constructor(BabyMealInfoListResponse.class,
                        babyMeal.id,
                        babyMeal.mealName))
                .from(babyMeal)
                .where(babyMeal.subMealCategory.eq(subMealCategory))
                .offset((page.longValue() - 1L)*10)
                .limit(10)
                .fetch();
    }
}

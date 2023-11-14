package com.k9c202.mpick.info.repository;

import com.k9c202.mpick.info.controller.component.BabyMealDetailDto;
import com.k9c202.mpick.info.controller.component.BabyMealInfoDto;
import com.k9c202.mpick.info.controller.component.PageCountDto;
import com.k9c202.mpick.info.controller.response.BabyMealDetailInfoResponse;
import com.k9c202.mpick.info.controller.response.BabyMealInfoListResponse;
import com.k9c202.mpick.info.entity.SubMealCategory;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.apache.lucene.index.DocIDMerger;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.RoundingMode;
import java.util.List;

import static com.k9c202.mpick.info.entity.QbabyMeal.babyMeal;

@Repository
public class BabyMealQueryRepository {

    private final JPAQueryFactory queryFactory;

    public BabyMealQueryRepository(EntityManager em) { this.queryFactory = new JPAQueryFactory(em); }

    public PageCountDto babyMealMaxPage(SubMealCategory subMealCategory) {
        return queryFactory
                .select(Projections.constructor(PageCountDto.class,
                        babyMeal.count().divide(10).ceil().longValue(),
                        babyMeal.count()))
                .from(babyMeal)
                .where(babyMeal.subMealCategory.eq(subMealCategory))
                .fetchOne();
    }

    public List<BabyMealInfoDto> findBabyMealBySubCategory(SubMealCategory subMealCategory, Integer page) {

        return queryFactory
                .select(Projections.constructor(BabyMealInfoDto.class,
                        babyMeal.id,
                        babyMeal.mealName))
                .from(babyMeal)
                .where(babyMeal.subMealCategory.eq(subMealCategory))
                .offset((page.longValue() - 1L)*10)
                .limit(10)
                .fetch();
    }

    public BabyMealDetailDto findOneById(Long id) {

        return queryFactory
                .select(Projections.constructor(BabyMealDetailDto.class,
                        babyMeal.mealName,
                        babyMeal.cookMethod,
                        babyMeal.materialName,
                        babyMeal.carbohydrates,
                        babyMeal.protein,
                        babyMeal.fat,
                        babyMeal.sodium,
                        babyMeal.calcium,
                        babyMeal.fe,
                        babyMeal.calorie))
                .from(babyMeal)
                .where(babyMeal.id.eq(id))
                .fetchOne();
    }
}

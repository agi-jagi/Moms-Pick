package com.k9c202.mpick.trade.repository;

import com.k9c202.mpick.trade.controller.component.MainCategoryDto;
import com.k9c202.mpick.trade.entity.Category;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

import java.util.List;
import java.util.Map;

import static com.k9c202.mpick.trade.entity.QCategory.category;

@Slf4j
@Repository
public class CategoryQueryRepository {

    private final JPAQueryFactory queryFactory;

    public CategoryQueryRepository(EntityManager em) { this.queryFactory = new JPAQueryFactory(em); }
    public Category findOne(Long categoryId) {
        Category result = queryFactory
                .select(category)
                .from(category)
                .where(category.id.eq(categoryId))
                .fetchOne();

        return result;
    }

    public List<Category> findMainCategory() {
        List<Category> result = queryFactory
                .select(category)
                .from(category)
                .where(category.categoryId2.eq((Long) null))
                .fetch();

        return result;
    }

    public List<MainCategoryDto> findMainCategoryNameAndId() {
        List<MainCategoryDto> result = queryFactory
                .select(
                        Projections.constructor(MainCategoryDto.class,
                                category.id,
                                category.categoryName))
                .from(category)
                .where(category.categoryId2.isNull())
                .fetch();

        return result;
    }

    public List<String> findSubCategoryNameByCategoryId(Long categoryId) {
        List<String> result = queryFactory
                .select(category.categoryName)
                .from(category)
                .where(category.categoryId2.eq(categoryId))
                .fetch();

        return result;
    }
}

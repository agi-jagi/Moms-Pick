package com.k9c202.mpick.trade.repository;

import com.k9c202.mpick.trade.entity.Category;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

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

}

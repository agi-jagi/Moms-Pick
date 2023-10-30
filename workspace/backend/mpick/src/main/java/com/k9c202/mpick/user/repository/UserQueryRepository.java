package com.k9c202.mpick.user.repository;

import com.k9c202.mpick.user.entity.QUser;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

import static com.k9c202.mpick.user.entity.QUser.user;

@Repository
public class UserQueryRepository {

    private final JPAQueryFactory queryFactory;

    public UserQueryRepository(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    public boolean existLoginId(String loginId) {
        Long content = queryFactory
                .select(user.id)
                .from(user)
                .where(user.loginId.eq(loginId))
                .fetchFirst();
        return content != null;
    }

    public boolean existEmail(String email) {
        Long content = queryFactory
                .select(user.id)
                .from(user)
                .where(user.email.eq(email))
                .fetchFirst();
        return content != null;
    }

    public boolean existNickname(String nickname) {
        Long content = queryFactory
                .select(user.id)
                .from(user)
                .where(user.nickname.eq(nickname))
                .fetchFirst();
        return content != null;
    }
}

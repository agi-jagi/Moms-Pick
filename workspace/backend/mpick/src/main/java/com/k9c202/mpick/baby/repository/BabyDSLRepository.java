package com.k9c202.mpick.baby.repository;

import com.k9c202.mpick.baby.entity.Baby;
import com.k9c202.mpick.baby.entity.QBaby;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class BabyDSLRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QBaby baby = QBaby.baby;

    public List<Baby> loadBaby(){
        System.out.println("1111");
        List<Baby> result = jpaQueryFactory
                .select(baby)
                .from(baby)
                .fetch();

        System.out.println("2222");
        return result;
    }

}

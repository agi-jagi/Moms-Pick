package com.k9c202.mpick.user.repository;

import com.k9c202.mpick.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
// <엔티티 클래스 이름, primary key 타입>
// save, find 등의 기본적인 함수 有
// ex) 유저 로그인 id(primary key아님)로 위시리스트를 전부 불러올 때
//     List<Wish> findAllByUserLoginId(String loginId);
// 참고 : https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.query-methods.details
//        https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repository-query-keywords
public interface UserRepository extends JpaRepository<User, Long> {

    // Optional : 조건문을 뒤에 달 수 있음 (ex null일때 실행할 내용들)
    // Optional<Entity>
    Optional<User> findOneByLoginId(String loginId);

    Optional<User> findByEmail(String email);
}

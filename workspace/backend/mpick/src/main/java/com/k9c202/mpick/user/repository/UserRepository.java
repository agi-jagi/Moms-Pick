package com.k9c202.mpick.user.repository;

import com.k9c202.mpick.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// <엔티티 클래스 이름, primary key 타입>
public interface UserRepository extends JpaRepository<User,Long> {

    // Optional : 조건문을 뒤에 달 수 있음 (ex null일때 실행할 내용들)
    Optional<User> findOneByLoginId(String username);
}

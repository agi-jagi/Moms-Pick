package com.k9c202.mpick.baby.repository;

import com.k9c202.mpick.baby.entity.Baby;
import com.k9c202.mpick.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BabyRepository extends JpaRepository<Baby,Long> {

    List<Baby> findAll();
    Optional<Baby> findById(Long id);

    Optional<Integer> countByUserIdAndStatus(Long userId,String status);
}

package com.k9c202.mpick.baby.repository;

import com.k9c202.mpick.baby.entity.Baby;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BabyRepository extends JpaRepository<Baby,Long> {

    List<Baby> findAll();
}

package com.k9c202.mpick.trade.repository;

import com.k9c202.mpick.trade.entity.Wish;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WishRepository extends JpaRepository<Wish, Long> {

}

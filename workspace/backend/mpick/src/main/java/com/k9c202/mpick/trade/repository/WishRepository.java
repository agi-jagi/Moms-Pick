package com.k9c202.mpick.trade.repository;

import com.k9c202.mpick.trade.entity.Wish;
import com.k9c202.mpick.user.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WishRepository extends JpaRepository<Wish, Long> {

    Optional<Wish> findById(Long id);

    Optional<Wish> findByUser(User user);

    Optional<Wish> findByUserIdAndTradeId(Long userId, Long tradeId);
}

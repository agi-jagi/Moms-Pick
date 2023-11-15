package com.k9c202.mpick.user.repository;

import com.k9c202.mpick.user.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    Optional<Rating> findByReviewerLoginIdAndTradeId(String loginId, Long tradeId);
}

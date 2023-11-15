package com.k9c202.mpick.user.service;

import com.k9c202.mpick.trade.repository.TradeRepository;
import com.k9c202.mpick.user.entity.Rating;
import com.k9c202.mpick.user.repository.RatingRepository;
import com.k9c202.mpick.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class RatingService {

    private final RatingRepository ratingRepository;
    private final UserRepository userRepository;
    private final TradeRepository tradeRepository;

    public Float updateRating(String loginId, Long tradeId, Float rate) {
        Rating rating = ratingRepository.findByReviewerLoginIdAndTradeId(loginId, tradeId).orElse(null);
        if (rating == null) {
            rating = Rating.builder()
                    .reviewer(userRepository.findOneByLoginId(loginId).orElseThrow())
                    .trade(tradeRepository.getReferenceById(tradeId))
                    .rate(BigDecimal.valueOf(rate))
                    .build();
        } else {
            rating.editRate(BigDecimal.valueOf(rate));
        }
        ratingRepository.save(rating);
        return rating.getRate().floatValue();
    }

    public Float getRating(String loginId, Long tradeId) {
        Rating rating = ratingRepository.findByReviewerLoginIdAndTradeId(loginId, tradeId).orElse(null);
        if (rating == null) {
            return null;
        }
        return rating.getRate().floatValue();
    }


}

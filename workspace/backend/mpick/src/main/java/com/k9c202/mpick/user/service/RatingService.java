package com.k9c202.mpick.user.service;

import com.k9c202.mpick.trade.entity.Trade;
import com.k9c202.mpick.trade.entity.TradeStatus;
import com.k9c202.mpick.trade.repository.TradeRepository;
import com.k9c202.mpick.user.entity.Rating;
import com.k9c202.mpick.user.entity.User;
import com.k9c202.mpick.user.repository.RatingRepository;
import com.k9c202.mpick.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

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

        Trade trade = tradeRepository.findById(tradeId).orElseThrow();
        if (trade.getTradeStatus() == TradeStatus.판매중) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "아직 판매중인 상품입니다.");
        }
        User buyer = trade.getBuyer();
        if (buyer == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "아직 구매자가 결정되지 않은 상품입니다.");
        }

        User seller = trade.getUser();
        User reviewer = null;
        User reviewee = null;
        // 평가자가 판매자일 경우
        if (seller.getLoginId().equals(loginId)) {
            reviewer = seller;
            // 피평가자는 구매자
            reviewee = buyer;
        // 평가자가 구매자일 경우
        } else if (buyer.getLoginId().equals(loginId)) {
            reviewer = buyer;
            // 피평가자는 판매자
            reviewee = seller;
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "당신은 판매자나 구매자가 아닙니다.");
        }

        Rating rating = ratingRepository.findByReviewerLoginIdAndTradeId(loginId, tradeId).orElse(null);
        if (rating == null) {
            rating = Rating.builder()
                    .reviewer(reviewer)
                    .reviewee(reviewee)
                    .trade(trade)
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

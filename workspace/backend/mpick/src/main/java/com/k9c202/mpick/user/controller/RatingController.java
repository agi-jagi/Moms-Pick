package com.k9c202.mpick.user.controller;

import com.k9c202.mpick.global.response.CommonResponse;
import com.k9c202.mpick.user.jwt.SecurityUtils;
import com.k9c202.mpick.user.service.RatingService;
import com.k9c202.mpick.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api/users/trades")
public class RatingController {

    private final RatingService ratingService;

    // 특정 거래 판매자에게 평점 부여하기
    @PutMapping("/{tradeId}/rating")
    public CommonResponse<Float> updateRating(@PathVariable Long tradeId, @RequestBody Map<String, Float> body) {
        return CommonResponse.OK(ratingService.updateRating(SecurityUtils.getCurrentLoginId(), tradeId, body.get("rate")));
    }

    // 특정 거래 판매자에게 내가 부여한 평점 조회하기
    @GetMapping("{tradeId}/rating")
    public CommonResponse<Float> getRating(@PathVariable Long tradeId) {
        return CommonResponse.OK(ratingService.getRating(SecurityUtils.getCurrentLoginId(), tradeId));
    }

}

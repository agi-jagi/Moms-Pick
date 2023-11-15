package com.k9c202.mpick.trade.service;

import com.k9c202.mpick.global.response.NotFoundException;
import com.k9c202.mpick.trade.controller.response.PurchaseListResponse;
import com.k9c202.mpick.trade.controller.response.SaleListResponse;
import com.k9c202.mpick.trade.controller.response.WishListResponse;
import com.k9c202.mpick.trade.repository.TradeQueryRepository;
import com.k9c202.mpick.trade.repository.WishQueryRepository;
import com.k9c202.mpick.trade.repository.WishRepository;
import com.k9c202.mpick.user.entity.User;
import com.k9c202.mpick.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class UserTradeService {

    private final WishRepository wishRepository;

    private final WishQueryRepository wishQueryRepository;

    private final UserRepository userRepository;

    private final TradeQueryRepository tradeQueryRepository;
    public List<WishListResponse> getWishList(String loginId) {

        User user = userRepository.findOneByLoginId(loginId).orElseThrow(() -> new NotFoundException("존재하지 않는 유저입니다."));

        List<WishListResponse> result = wishQueryRepository.findWishList(user.getId());

        return result;
    }

    public List<SaleListResponse> getSellList(String loginId) {
        User user = userRepository.findOneByLoginId(loginId).orElseThrow(() -> new NotFoundException("존재하지 않는 유저입니다."));

        List<SaleListResponse> result = tradeQueryRepository.findSellList(user.getId());

        return result;
    }

    public List<PurchaseListResponse> getPurchaseList(String loginId) {
        User user = userRepository.findOneByLoginId(loginId).orElseThrow(() -> new NotFoundException("존재하지 않는 유저입니다."));

        List<PurchaseListResponse> result = tradeQueryRepository.findPurchaseList(user.getId());

        return result;
    }
}

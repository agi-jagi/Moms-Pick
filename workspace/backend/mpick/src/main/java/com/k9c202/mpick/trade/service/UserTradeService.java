package com.k9c202.mpick.trade.service;

import com.amazonaws.services.kms.model.NotFoundException;
import com.k9c202.mpick.trade.controller.response.WishListResponse;
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
    public List<WishListResponse> getWishList(String loginId) {
        System.out.println("여기있어요");

        User user = userRepository.findOneByLoginId(loginId).orElseThrow(() -> new NotFoundException("존재하지 않는 유저입니다."));

        List<WishListResponse> result = wishQueryRepository.findWishList(user.getId());

        System.out.println("여기있어요");
        System.out.println(result);
        System.out.println("여기있어요");
        return result;
    }
}

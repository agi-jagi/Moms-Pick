package com.k9c202.mpick.user.service;

import com.k9c202.mpick.user.controller.response.AddressResponse;
import com.k9c202.mpick.user.entity.Address;
import com.k9c202.mpick.user.repository.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

// TODO: 2023-11-13 서비스 CUD, R 분리하기 / @Transactional(readOnly = true) / CQRS 공부하기
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AddressQueryService {

    private final AddressRepository addressRepository;

    // 주소 조회
    public List<AddressResponse> addressList() {
        // https://www.baeldung.com/get-user-in-spring-security
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loginId = authentication.getName();
        // 단축키 : ctrl + alt + v
        // List<Address> -> List<AddressResponse> 변환
        List<Address> addresses = addressRepository.findAllByUserLoginId(loginId);
        return addresses.stream()
                .map(AddressResponse::of)
                .collect(Collectors.toList());
    }
}

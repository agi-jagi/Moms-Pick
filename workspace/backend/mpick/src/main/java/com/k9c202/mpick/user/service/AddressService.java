package com.k9c202.mpick.user.service;

import com.k9c202.mpick.user.controller.response.AddressResponse;
import com.k9c202.mpick.user.dto.AddressDto;
import com.k9c202.mpick.user.entity.Address;
import com.k9c202.mpick.user.entity.User;
import com.k9c202.mpick.user.repository.AddressRepository;
import com.k9c202.mpick.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AddressService {
    // 등록 조회 수정 삭제
    // TODO: 2023-11-13 서비스 CUD, R 분리하기 / @Transactional(readOnly = true)
    // TODO: 2023-11-13 CQRS 공부하기
    // TODO: 2023-11-13 추가 공부 목록 - MSA, CQRS, Messagequeue(kafka, rabbitMQ), CI/CD

    // 주소 조회
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

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

    // 주소 등록
    public AddressResponse addAddress(AddressDto addressDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loginId = authentication.getName();
        // TODO: 2023-11-13 getUserEntity 함수 따로 정의
        //      User user = userRepository.findOneByLoginId(loginId)
        //                  .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        // TODO: 2023-11-13 createAddree로 따로 함수 정의하기
        User user = userRepository.findOneByLoginId(loginId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Address address = Address.builder()
                .latitude((addressDto.getLatitude()))
                .longitude(addressDto.getLongitude())
                .addressName(addressDto.getAddressName())
                .addressString(addressDto.getAddressString())
                .isSet(addressDto.getIsSet())
                .user(user)
                .build();
        Address savedAddress = addressRepository.save(address);
        return AddressResponse.of(savedAddress);
    }

    // 주소 삭제
    public void deleteAddress(Long addressId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loginId = authentication.getName();
        // TODO: 2023-11-13 문제 해결하기
//        addressRepository.deleteByIdAndUserLoginId(addressId,loginId);
        addressRepository.deleteById(addressId);
    }

    // 주소 수정
    public AddressResponse updateAddress(Long addressId, AddressDto addressDto) {
        // TODO: 2023-11-13 Address oldAddress = getMyAddressEntity(addressId);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loginId = authentication.getName();
        Address oldAddress = addressRepository.findByIdAndUserLoginId(addressId, loginId)
                .orElseThrow(() -> new UsernameNotFoundException("User address not found"));
        // TODO: 2023-11-13 따로 정의한 createAddress 함수 사용하기
        Address address = Address.builder()
                .id(oldAddress.getId())
                .latitude((addressDto.getLatitude()))
                .longitude(addressDto.getLongitude())
                .addressName(addressDto.getAddressName())
                .addressString(addressDto.getAddressString())
                .isSet(addressDto.getIsSet())
                .user(oldAddress.getUser())
                .build();
        // TODO: 2023-11-13 addressRepository.save(address) 대신 edit 함수 사용하기 (Address 엔티티 파일에 따로 정의)
        Address savedAddress = addressRepository.save(address);
        return AddressResponse.of(savedAddress);
    }
}


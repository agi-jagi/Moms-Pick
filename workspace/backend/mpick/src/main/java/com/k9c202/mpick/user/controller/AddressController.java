package com.k9c202.mpick.user.controller;

import com.k9c202.mpick.global.response.CommonResponse;
import com.k9c202.mpick.user.controller.request.AddAddressRequest;
import com.k9c202.mpick.user.controller.request.UpdateAddressRequest;
import com.k9c202.mpick.user.controller.response.AddressResponse;
import com.k9c202.mpick.user.service.AddressService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api/users/addresses")
public class AddressController {

    private final AddressService addressService;
    // TODO: 2023-11-13 JWT는 반드시 컨트롤러에서 꺼내서 나가기
    //      서비스단 들어가기 전에는 반드시 검증이 된 정보들만 들어가야 함

    // TODO: 2023-11-13 주석 달기
    /**
     * 내 위치 목록 조회 API
     *
     * @return 조회된 위치 목록
     * @throws IllegalArgumentException 어떤 상황에서 예외가 발생
     */

    // TODO: 2023-11-13 @Valid 안붙이면 유효성 검증 실행이 안됨
    // TODO: 2023-11-13 POST는 HttpStatus 201로 내보내기
    // 내 위치 목록 조회
    @GetMapping
    public CommonResponse<List<AddressResponse>> addressList(){
        return CommonResponse.OK(addressService.addressList());
    }

    // TODO: 2023-11-13 물음표는 사용하지 말 것 -> 컴파일 시점에 오류를 잡을 수 없음
    // TODO: 2023-11-13 PathVariable은 자세히 작성 -> "/{addressId}"
    // 내 위치 추가
    @PostMapping
    public CommonResponse<AddressResponse> addAddress(@RequestBody AddAddressRequest addressRequest){
        return CommonResponse.OK(addressService.addAddress(addressRequest.toAddressDto()));
    }

    // 내 위치 삭제
    @DeleteMapping("/{id}")
    public CommonResponse<?> deleteAddress(@PathVariable("id") Long addressId) {
        addressService.deleteAddress(addressId);
        return CommonResponse.OK(null);
    }

    // 내 위치 수정
    @PatchMapping("/{id}")
    public CommonResponse<AddressResponse> updateAddress(
            @PathVariable("id") Long addressId,
            @RequestBody UpdateAddressRequest addressRequest){
        return CommonResponse.OK(addressService.updateAddress(addressId,addressRequest.toAddressDto()));
    }



}

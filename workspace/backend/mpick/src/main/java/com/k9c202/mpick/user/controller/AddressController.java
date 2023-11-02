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

    // 내 위치 목록 조회
    @GetMapping
    public CommonResponse<List<AddressResponse>> addressList(){
        return CommonResponse.OK(addressService.addressList());
    }


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
    @PutMapping("/{id}")
    public CommonResponse<AddressResponse> updateAddress(@PathVariable("id") Long addressId, @RequestBody UpdateAddressRequest addressRequest){
        return CommonResponse.OK(addressService.updateAddress(addressId,addressRequest.toAddressDto()));
    }



}

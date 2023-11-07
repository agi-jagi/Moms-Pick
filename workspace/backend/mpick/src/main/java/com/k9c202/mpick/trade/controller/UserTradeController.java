//package com.k9c202.mpick.trade.controller;
//
//import com.k9c202.mpick.global.response.CommonResponse;
//import com.k9c202.mpick.trade.controller.response.WishListResponse;
//import io.swagger.v3.oas.annotations.Operation;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.security.core.Authentication;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@Slf4j
//@RequiredArgsConstructor
//@RequestMapping("/api/users")
//public class UserTradeController {
//
//    @Operation(summary = "찜 목록 조회 기능", description = "찜 목록 조회 기능")
//    @GetMapping(value = "/wish-list")
//    public CommonResponse<WishListResponse> wishList(
//            Authentication authentication) {
//
//    }
//
//    @Operation(summary = "판매 내역 조회 기능", description = "판매 내역 조회 기능")
//    @GetMapping(value = "/sale-list")
//    public CommonResponse<?> saleList(
//            Authentication authentication) {
//
//    }
//
//    @Operation(summary = "구매 내역 조회 기능", description = "구매 내역 조회 기능")
//    @GetMapping(value = "/purchase-list")
//    public CommonResponse<?> purchaseList(
//            Authentication authentication) {
//
//    }
//}

package com.k9c202.mpick.info.controller;

import com.k9c202.mpick.global.response.CommonResponse;
import com.k9c202.mpick.info.controller.request.BabyMealInfoRequest;
import com.k9c202.mpick.info.controller.request.DayCareCenterInfoRequest;
import com.k9c202.mpick.info.controller.request.KindergartenInfoRequest;
import com.k9c202.mpick.info.controller.request.LactationRoomInfoRequest;
import com.k9c202.mpick.info.controller.response.*;
import com.k9c202.mpick.info.service.InfoService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/info")
public class InfoController {

    private final InfoService infoService;

    @Operation(summary = "수유실 검색 기능", description = "수유실 검색 기능")
    @GetMapping("/lactation")
    public CommonResponse<List<LactationRoomInfoResponse>> searchLactation(
            Authentication authentication,
            @RequestParam BigDecimal latitude,
            @RequestParam BigDecimal longitude) {

        return CommonResponse.OK(infoService.lactationList(latitude, longitude));
    }

    @Operation(summary = "유치원 검색 기능", description = "유치원 검색 기능")
    @PostMapping("/kinder")
    public CommonResponse<List<KindergartenInfoResponse>> searchKinder(
            Authentication authentication,
            @RequestBody KindergartenInfoRequest request) {

        return CommonResponse.OK(infoService.kinderList(request));
    }

    @Operation(summary = "어린이집 검색 기능", description = "어린이집 검색 기능")
    @PostMapping("/daycare")
    public CommonResponse<List<DayCareCenterInfoResponse>> searchDayCare(
            Authentication authentication,
            @RequestBody DayCareCenterInfoRequest request) {

        return CommonResponse.OK(infoService.dayCareList(request));
    }

    @Operation(summary = "유아 음식 이름 리스트 조회", description = "유아 음식 이름 리스트 조회")
    @PostMapping("/babymeal")
    public CommonResponse<BabyMealInfoListResponse> searchBabyMealList(
            Authentication authentication,
            @RequestBody BabyMealInfoRequest request) {

        return CommonResponse.OK(infoService.babyMealList(request));
    }

    @Operation(summary = "유아 음식 상세 조회", description = "유아 음식 상세 조회")
    @GetMapping("/babymeal/{id}")
    public CommonResponse<BabyMealDetailInfoResponse> searchBabyMealDetail(
            Authentication authentication,
            @PathVariable Long id) {

        return CommonResponse.OK(infoService.babyMealDetail(id));
    }
}

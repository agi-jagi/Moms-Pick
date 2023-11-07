package com.k9c202.mpick.baby.controller;

import com.k9c202.mpick.baby.dto.BabyDto;
import com.k9c202.mpick.baby.repository.BabyDSLRepository;
import com.k9c202.mpick.baby.service.BabyService;
import com.k9c202.mpick.global.response.CommonResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profiles/child")
public class BabyController {
    private final BabyService babyService;
    private final RedisTemplate<String, Object> redisTemplate;
    //추가
    @PostMapping
    @Operation(summary = "아기 추가", description = "아기 추가")
    public CommonResponse<String> addChild(@RequestBody BabyDto babyDto, Authentication authentication){
        //아기가 5명이 넘으면 안되게 예외 처리를 해줘야함
        return CommonResponse.OK(babyService.add(babyDto,authentication.getName()));
    }
    //삭제
    @DeleteMapping
    @Operation(summary = "아기 삭제", description = "아기 삭제")
    public CommonResponse<String> deleteChild(@RequestBody BabyDto babyDto, Authentication authentication){

        babyService.delete(babyDto.getBabyId(), authentication.getName());
        return CommonResponse.OK("success");
    }

    //수정
    @PatchMapping
    @Operation(summary = "아기 수정", description = "아기 수정")
    public CommonResponse<String> modifyChild(@RequestBody BabyDto babyDto, Authentication authentication){

        return CommonResponse.OK(babyService.modify(babyDto, authentication.getName()));
    }

    @GetMapping
    @Operation(summary = "아기 수정", description = "아기 수정")
    public CommonResponse<List<BabyDto>> listBaby(Authentication authentication){

        return CommonResponse.OK(babyService.loadBaby(authentication.getName()));
    }


}

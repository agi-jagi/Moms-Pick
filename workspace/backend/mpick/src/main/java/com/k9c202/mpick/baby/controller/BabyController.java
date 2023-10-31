package com.k9c202.mpick.baby.controller;

import com.k9c202.mpick.baby.dto.BabyDto;
import com.k9c202.mpick.baby.repository.BabyDSLRepository;
import com.k9c202.mpick.baby.service.BabyService;
import com.k9c202.mpick.global.response.CommonResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profiles/child")
public class BabyController {
    private final BabyService babyService;

    //추가
    @PostMapping
    @Operation(summary = "아기 추가", description = "아기 추가")
    public CommonResponse<String> addChild(){

        return CommonResponse.OK("yes");
    }
    //삭제
    @DeleteMapping
    public CommonResponse deleteChild(){
        return CommonResponse.OK("");
    }

    //수정
    @PatchMapping
    public CommonResponse modifyChild(){
        return CommonResponse.OK("");
    }
}

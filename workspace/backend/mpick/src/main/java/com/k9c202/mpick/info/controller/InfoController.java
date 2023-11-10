package com.k9c202.mpick.info.controller;

import com.k9c202.mpick.global.response.CommonResponse;
import com.k9c202.mpick.info.controller.request.LactationRoomRequest;
import com.k9c202.mpick.info.service.InfoService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/info")
public class InfoController {

    private final InfoService infoService;

    @Operation(summary = "수유실 검색 기능", description = "수유실 검색 기능")
    @GetMapping("/lactation")
    public CommonResponse<?> searchLactation(
            Authentication authentication,
            @RequestParam LactationRoomRequest request) {



        return CommonResponse.OK(true);
    }
}

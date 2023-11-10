package com.k9c202.mpick.elateicSearch.controller;

import com.k9c202.mpick.elateicSearch.dto.ESTradeDto;
import com.k9c202.mpick.elateicSearch.service.ESService;
import com.k9c202.mpick.global.response.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ES")
public class ESController {

    private final ESService esService;

    @PostMapping
    public CommonResponse<String> saveES(@RequestBody ESTradeDto esTradeDto){

        return CommonResponse.OK(esService.save(esTradeDto));
    }

    @GetMapping
    public CommonResponse<?> saveES(){

        return CommonResponse.OK(esService.loadAll());
    }
}

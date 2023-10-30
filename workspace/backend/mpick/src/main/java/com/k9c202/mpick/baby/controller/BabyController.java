package com.k9c202.mpick.baby.controller;

import com.k9c202.mpick.baby.repository.BabyDSLRepository;
import com.k9c202.mpick.global.response.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/test")
public class BabyController {
    private BabyDSLRepository babyDSLRepository;

    @GetMapping
    public CommonResponse test(){
        System.out.println("1");
        babyDSLRepository.loadBaby();
        System.out.println("2");
        return CommonResponse.OK("");
    }
}

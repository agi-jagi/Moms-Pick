package com.k9c202.mpick.user.controller;

import com.k9c202.mpick.global.response.CommonResponse;
import com.k9c202.mpick.user.controller.request.UpdateStatusRequest;
import com.k9c202.mpick.user.service.AdminService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminController {
    private final AdminService adminService;

    @PatchMapping("/change-status")
    public CommonResponse<?> changeStatus(@RequestBody UpdateStatusRequest updateStatusRequest){
        adminService.changeStatus(updateStatusRequest);
        return CommonResponse.OK(null);
    }

}

package com.k9c202.mpick.user.controller;

import com.k9c202.mpick.global.response.CommonResponse;
import com.k9c202.mpick.user.controller.response.EmailVerificationResponse;
import com.k9c202.mpick.user.service.MailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api/emails")
public class EmailController {

    private final MailService mailService;

    // 이메일 인증 코드 발송
    @PostMapping("/verification-requests")
    //    public ResponseEntity sendMessage(@RequestParam("email") @Valid @CustomEmail String email) {
    public CommonResponse<Object> sendMessage(@RequestParam("email") @Valid String email) {
        mailService.sendCodeToEmail(email);

//        return new ResponseEntity<>(HttpStatus.OK);
        return CommonResponse.OK(null);
    }

    // 이메일 인증 코드 확인
    @GetMapping("/verifications")
    //    public ResponseEntity<EmailVerificationResult> verificationEmail(@RequestParam("email") @Valid @CustomEmail String email,
    public CommonResponse<EmailVerificationResponse> verificationEmail(@RequestParam("email") @Valid String email,
                                                                       @RequestParam("code") String authCode) {
        EmailVerificationResponse response = mailService.verifiedCode(email, authCode);

//        return ResponseEntity.ok(response);
        return CommonResponse.OK(null);

    }
}

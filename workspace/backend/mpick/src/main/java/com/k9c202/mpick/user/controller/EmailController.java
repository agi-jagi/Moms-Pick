package com.k9c202.mpick.user.controller;

import com.k9c202.mpick.global.response.CommonResponse;
import com.k9c202.mpick.user.controller.request.CheckEmailCodeRequest;
import com.k9c202.mpick.user.controller.request.CheckEmailRequest;
import com.k9c202.mpick.user.controller.request.SendEmailCodeRequest;
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
@RequestMapping("/api/auth/emails")
public class EmailController {

    private final MailService mailService;

    // 이메일 인증 코드 발송
    @PostMapping("/code-request")
    //    public ResponseEntity sendMessage(@RequestParam("email") @Valid @CustomEmail String email) {
//    public CommonResponse<Object> sendMessage(@RequestParam("email") @Valid String email) {
    public CommonResponse<Object> sendMessage(@RequestBody SendEmailCodeRequest sendEmailCodeRequest) {
        mailService.sendCodeToEmail(sendEmailCodeRequest.getEmail());
//        return new ResponseEntity<>(HttpStatus.OK);
//        return ResponseEntity.ok(response);
        return CommonResponse.OK(null);
    }

    // 이메일 인증 코드 확인
    @PostMapping("/code-verification")
    //    public ResponseEntity<EmailVerificationResult> verificationEmail(@RequestParam("email") @Valid @CustomEmail String email,
//    public CommonResponse<EmailVerificationResponse> verificationEmail(@RequestParam("email") @Valid String email,
//                                                                       @RequestParam("code") String authCode)
    public CommonResponse<EmailVerificationResponse> verificationEmail(
            @RequestBody CheckEmailCodeRequest checkEmailCodeRequest) {
        EmailVerificationResponse response = mailService.verifiedCode(checkEmailCodeRequest.getEmail(), checkEmailCodeRequest.getAuthCode());
        return CommonResponse.OK(response);
    }
}

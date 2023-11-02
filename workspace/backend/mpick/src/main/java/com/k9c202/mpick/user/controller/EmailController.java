package com.k9c202.mpick.user.controller;

import com.k9c202.mpick.user.controller.response.EmailVerificationResult;
import com.k9c202.mpick.user.service.MailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<?> sendMessage(@RequestParam("email") @Valid String email) {
        mailService.sendCodeToEmail(email);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 이메일 인증 코드 확인
    @GetMapping("/verifications")
    //    public ResponseEntity<EmailVerificationResult> verificationEmail(@RequestParam("email") @Valid @CustomEmail String email,
    public ResponseEntity<EmailVerificationResult> verificationEmail(@RequestParam("email") @Valid String email,
                                                                     @RequestParam("code") String authCode) {
        EmailVerificationResult response = mailService.verifiedCode(email, authCode);

        return ResponseEntity.ok(response);
    }
}

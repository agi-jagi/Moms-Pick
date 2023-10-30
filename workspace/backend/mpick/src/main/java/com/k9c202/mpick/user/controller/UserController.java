package com.k9c202.mpick.user.controller;

import com.k9c202.mpick.user.controller.request.JoinUserRequest;
import com.k9c202.mpick.user.controller.response.EmailVerificationResult;
import com.k9c202.mpick.user.controller.response.JoinUserResponse;
import com.k9c202.mpick.user.dto.LoginDto;
import com.k9c202.mpick.user.dto.UserDto;
import com.k9c202.mpick.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api")
public class UserController {
    /*
    REST ful
    /schools/{schoolId}/classes/{classId}/students/{studentId}

    POST /schools
    GET /schools
    GET /schools/{schoolId}
    PUT /schools/{schoolId}
    DELETE /schools/{schoolId}
     */

    private final UserService userService;


    // /api/users 경로로 post요청이 왔을 때 실행될 부분
    // 어떤 타입을 사용할지 모를 때 <?>

    // 아래 방법은 데이터만 보내고, status code를 조정 못함
    //    @PostMapping
    //    public UserDto signup(@RequestBody UserDto userDto) {
    //        userService.signup(userDto);
    //        return userDto;
    //    }

    @PostMapping("/join")
    public ResponseEntity<JoinUserResponse> signup(@Valid @RequestBody JoinUserRequest request) {
        // ResponseEntity : HTTP 요청(Request)/응답(Response)에 해당하는 HttpHeader/HttpBody를 포함하는 클래스
        // 값 null, 길이제한, 포멧팅 -> JoinUserRequest에서 처리
        log.debug("call UserController#signup");
        log.debug("JoinUserRequest={}", request);

        // JoinUserRequest 에서 정의한 toUserDto (id, password, nickname, email)
        JoinUserResponse response = userService.signup(request.toUserDto());
        log.debug("JoinUserResponse={}", response);

        // 200일 경우, return ResponseEntity.status(200).body(null);과 동일
        // 예외 처리를 어떻게 할지 정해야 함. 일단 성공인 경우만 적어놓음 (500으로 에러 처리 될 것)
        return ResponseEntity.ok(response);
        // 다른 형식 예) return ResponseEntity.status(HttpStatus.CONFLICT).body(userDto);
    }


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto){
        userService.login(loginDto);
        return ResponseEntity.ok(null);
    }


    @PostMapping("/emails/verification-requests")
//    public ResponseEntity sendMessage(@RequestParam("email") @Valid @CustomEmail String email) {
    public ResponseEntity<?> sendMessage(@RequestParam("email") @Valid String email) {
        userService.sendCodeToEmail(email);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/emails/verifications")
//    public ResponseEntity<EmailVerificationResult> verificationEmail(@RequestParam("email") @Valid @CustomEmail String email,
    public ResponseEntity<EmailVerificationResult> verificationEmail(@RequestParam("email") @Valid String email,
                                            @RequestParam("code") String authCode) {
        EmailVerificationResult response = userService.verifiedCode(email, authCode);

        return ResponseEntity.ok(response);
    }


    // 요청 및 security 확인 시 사용할 test url
    @GetMapping("/test")
    public String hello(){
        return "test";
    }


}

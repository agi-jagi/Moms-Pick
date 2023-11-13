package com.k9c202.mpick.user.controller;

import com.k9c202.mpick.global.response.CommonResponse;
import com.k9c202.mpick.user.controller.request.JoinUserRequest;
import com.k9c202.mpick.user.controller.response.JoinUserResponse;
import com.k9c202.mpick.user.dto.LoginDto;
import com.k9c202.mpick.user.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    // 회원가입
    @PostMapping("/signup")
    public CommonResponse<JoinUserResponse> signup(@Valid @RequestBody JoinUserRequest request) {
        // ResponseEntity : HTTP 요청(Request)/응답(Response)에 해당하는 HttpHeader/HttpBody를 포함하는 클래스
        // 값 null, 길이제한, 포멧팅 -> JoinUserRequest에서 처리
        // log level : trace, debug, info, warning, error
        log.debug("call UserController#signup");
        log.debug("JoinUserRequest={}", request);

        // JoinUserRequest 에서 정의한 toUserDto (id, password, nickname, email)
        // 반환한 UserDto를 signup에 넣음
        JoinUserResponse response = authService.signup(request.toUserDto());
        log.debug("JoinUserResponse={}", response);

        // 200일 경우, return ResponseEntity.status(200).body(null);과 동일
        // 예외 처리를 어떻게 할지 정해야 함. 일단 성공인 경우만 적어놓음 (500으로 에러 처리 될 것)
        return CommonResponse.OK(null);
        // 다른 형식 예) return ResponseEntity.status(HttpStatus.CONFLICT).body(userDto);
    }

    // 로그인
    @PostMapping("/login")
    public CommonResponse<String> login(@RequestBody LoginDto loginDto){
//        userService.login(loginDto);
//        return ResponseEntity.ok(null);
        // login 요청시 jwt 토큰을 반환하도록 변경
        return CommonResponse.OK(authService.login(loginDto));
    }

    // 민감한 정보 체크는 GET이 아닌 POST 요청
    // 아이디 중복체크
    // TODO: 2023-11-13 Response<?> 사용하지 않기 
    @PostMapping("/checks/id")
//    public CommonResponse<?> idCheck(@RequestParam String loginId){
    public CommonResponse<?> idCheck(@RequestBody String loginId){
        authService.checkDuplicatedLoginId(loginId);
        return CommonResponse.OK(null);
    }

    // 닉네임 중복체크
    @PostMapping("/checks/nickname")
//    public CommonResponse<?> nicknameCheck(@RequestParam String nickname){
    public CommonResponse<?> nicknameCheck(@RequestBody String nickname){
        authService.checkDuplicatedNickname(nickname);
        return CommonResponse.OK(null);
    }

    // 이메일 중복체크
    @PostMapping("/checks/email")
//    public CommonResponse<?> emailCheck(@RequestParam String email){
    public CommonResponse<?> emailCheck(@RequestBody String email){
        authService.checkDuplicatedEmail(email);
        return CommonResponse.OK(null);
    }

}

package com.k9c202.mpick.user.controller;

import com.k9c202.mpick.global.response.CommonResponse;
import com.k9c202.mpick.user.controller.request.JoinUserRequest;
import com.k9c202.mpick.user.controller.response.EmailVerificationResult;
import com.k9c202.mpick.user.controller.response.JoinUserResponse;
import com.k9c202.mpick.user.controller.response.UserInfoResponse;
import com.k9c202.mpick.user.dto.LoginDto;
import com.k9c202.mpick.user.dto.UserDto;
import com.k9c202.mpick.user.service.MailService;
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
@RequestMapping("/api/users")
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

    // 회원가입
    @PostMapping("/join")
    public ResponseEntity<JoinUserResponse> signup(@Valid @RequestBody JoinUserRequest request) {
        // ResponseEntity : HTTP 요청(Request)/응답(Response)에 해당하는 HttpHeader/HttpBody를 포함하는 클래스
        // 값 null, 길이제한, 포멧팅 -> JoinUserRequest에서 처리
        // log level : trace, debug, info, warning, error
        log.debug("call UserController#signup");
        log.debug("JoinUserRequest={}", request);

        // JoinUserRequest 에서 정의한 toUserDto (id, password, nickname, email)
        // 반환한 UserDto를 signup에 넣음
        JoinUserResponse response = userService.signup(request.toUserDto());
        log.debug("JoinUserResponse={}", response);

        // 200일 경우, return ResponseEntity.status(200).body(null);과 동일
        // 예외 처리를 어떻게 할지 정해야 함. 일단 성공인 경우만 적어놓음 (500으로 에러 처리 될 것)
        return ResponseEntity.ok(response);
        // 다른 형식 예) return ResponseEntity.status(HttpStatus.CONFLICT).body(userDto);
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto){
//        userService.login(loginDto);
//        return ResponseEntity.ok(null);
        // login 요청시 jwt 토큰을 반환하도록 변경
        return ResponseEntity.ok(userService.login(loginDto));
    }

    // 회원 정보 조회
    @GetMapping
    public CommonResponse<UserInfoResponse> getUserInfo() {
        return CommonResponse.OK(userService.getUserInfo());
    }

    // 로그아웃

    // 회원탈퇴

    // 회원 정보 수정

    // 현재 비밀번호 체크

    // 비밀번호 변경


    // 아이디 중복체크
    @GetMapping("/id-check")
    public ResponseEntity<?> idCheck(@RequestParam String loginId){
        userService.checkDuplicatedLoginId(loginId);
        return ResponseEntity.ok(null);
    }

    // 닉네임 중복체크
    @GetMapping("/nickname-check")
    public ResponseEntity<?> nicknameCheck(@RequestParam String nickname){
        userService.checkDuplicatedNickname(nickname);
        return ResponseEntity.ok(null);
    }

    // 이메일 중복체크
    @GetMapping("/email-check")
    public ResponseEntity<?> emailCheck(@RequestParam String email){
        userService.checkDuplicatedEmail(email);
        return ResponseEntity.ok(null);
    }





}

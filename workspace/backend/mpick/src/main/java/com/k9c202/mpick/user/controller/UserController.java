package com.k9c202.mpick.user.controller;

import com.k9c202.mpick.global.response.CommonResponse;
import com.k9c202.mpick.user.controller.request.JoinUserRequest;
import com.k9c202.mpick.user.controller.request.CheckPasswordRequest;
import com.k9c202.mpick.user.controller.request.UpdatePasswordRequest;
import com.k9c202.mpick.user.controller.request.UpdateUserInfoRequest;
import com.k9c202.mpick.user.controller.response.JoinUserResponse;
import com.k9c202.mpick.user.controller.response.UserInfoResponse;
import com.k9c202.mpick.user.dto.LoginDto;
import com.k9c202.mpick.user.jwt.SecurityUtils;
import com.k9c202.mpick.user.jwt.TokenProvider;
import com.k9c202.mpick.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api/users")
public class UserController {
    // TODO(지현): 2023-11-05 url 동사 사용X, POST -> PATCH
    // 로그인 아이디는 자주 활용되기 때문에 jwt/SecurityUtils에서 getCurrentLoginId() 정의하여 사용 -> SecurityUtils.getCurrentLoginId();
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
    private final TokenProvider tokenProvider;

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
    public CommonResponse<JoinUserResponse> signup(@Valid @RequestBody JoinUserRequest request) {
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
        return CommonResponse.OK(null);
        // 다른 형식 예) return ResponseEntity.status(HttpStatus.CONFLICT).body(userDto);
    }

    // 로그인
    @PostMapping("/login")
    public CommonResponse<String> login(@RequestBody LoginDto loginDto){
//        userService.login(loginDto);
//        return ResponseEntity.ok(null);
        // login 요청시 jwt 토큰을 반환하도록 변경
        return CommonResponse.OK(userService.login(loginDto));
    }

    // 회원 정보 조회
    @GetMapping
    public CommonResponse<UserInfoResponse> getUserInfo() {
        return CommonResponse.OK(userService.getUserInfo());
    }

    // 로그아웃
    // 토큰 필요 (토큰이 아닌 아이디를 활용하도록 코드를 짜면 여러 곳에서 로그인 후 한 곳에서 로그아웃 하면 동시에 로그아웃 처리됨)
    @PostMapping("/logout")
    public CommonResponse<String> logout(HttpServletRequest request) {
        String accessToken = tokenProvider.resolveToken(request);
        userService.logout(accessToken);
        return CommonResponse.OK("로그아웃 성공");
    }

    // 회원탈퇴
    // 로그인 아이디 필요
    @DeleteMapping("/withdraw")
    public CommonResponse<String> withdraw() {
        userService.withdraw();
        return CommonResponse.OK("회원탈퇴 성공");
    }

    // TODO(지현): 2023-11-05 정보 수정 각각 나누기 (이메일, 닉네임, 소개글)
 //    // 회원 정보 수정
//    @PatchMapping
//    public CommonResponse<UserInfoResponse> updateUserInfo(
////            @AuthenticationPrincipal UserDetails userDetails,
//            // 프로필 이미지가 포함되어 있기 때문에 multipart
//            @RequestPart(name = "data", required = false) UpdateUserInfoRequest updateUserInfoRequest,
//            @RequestPart(name = "file", required = false) MultipartFile profileImg
//            ) throws IOException {
////        return CommonResponse.OK(userService.updateUserInfo(userDetails.getUsername(), updateUserInfoRequest, profileImg));
//        return CommonResponse.OK(userService.updateUserInfo(currentLoginId, updateUserInfoRequest, profileImg));
//    }

    // 현재 비밀번호 체크
    @PostMapping("/pw-check")
    public CommonResponse<?> checkPassword(
//            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody CheckPasswordRequest checkPasswordRequest
            ) {
//        userService.checkPassword(userDetails.getUsername(), checkPasswordRequest.getPassword());
        userService.checkPassword(SecurityUtils.getCurrentLoginId(), checkPasswordRequest.getPassword());
        return CommonResponse.OK(null);
    }

    // 비밀번호 변경
    @PostMapping("/pw-change")
    public CommonResponse<?> changePassword(
//            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody UpdatePasswordRequest updatePasswordRequest
            ) {
        userService.changePassword(
//                userDetails.getUsername(),
                SecurityUtils.getCurrentLoginId(),
                updatePasswordRequest.getPassword(),
                updatePasswordRequest.getNewPassword()
        );
        return CommonResponse.OK(null);
    }


    // 민감한 정보 체크는 GET이 아닌 POST 요청
    // 아이디 중복체크
    @PostMapping("/id-check")
//    public CommonResponse<?> idCheck(@RequestParam String loginId){
    public CommonResponse<?> idCheck(@RequestBody String loginId){
        userService.checkDuplicatedLoginId(loginId);
        return CommonResponse.OK(null);
    }

    // 닉네임 중복체크
    @PostMapping("/nickname-check")
//    public CommonResponse<?> nicknameCheck(@RequestParam String nickname){
    public CommonResponse<?> nicknameCheck(@RequestBody String nickname){
        userService.checkDuplicatedNickname(nickname);
        return CommonResponse.OK(null);
    }

    // 이메일 중복체크
    @PostMapping("/email-check")
//    public CommonResponse<?> emailCheck(@RequestParam String email){
    public CommonResponse<?> emailCheck(@RequestBody String email){
        userService.checkDuplicatedEmail(email);
        return CommonResponse.OK(null);
    }





}

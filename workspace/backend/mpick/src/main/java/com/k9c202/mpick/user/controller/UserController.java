package com.k9c202.mpick.user.controller;

import com.k9c202.mpick.global.response.CommonResponse;
import com.k9c202.mpick.user.controller.request.*;
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
    // TODO(지현): 2023-11-07 테스트코드 작성

    // 로그인 아이디는 자주 활용되기 때문에 jwt/SecurityUtils에서 getCurrentLoginId() 정의하여 사용 -> SecurityUtils.getCurrentLoginId();
    // 여러 방법 가능

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
    @PostMapping("/check/password")
    public CommonResponse<?> checkPassword(
//            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody CheckPasswordRequest checkPasswordRequest
            ) {
//        userService.checkPassword(userDetails.getUsername(), checkPasswordRequest.getPassword());
        userService.checkPassword(SecurityUtils.getCurrentLoginId(), checkPasswordRequest.getPassword());
        return CommonResponse.OK(null);
    }

    // 비밀번호 변경
    @PostMapping("/change/password")
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



}

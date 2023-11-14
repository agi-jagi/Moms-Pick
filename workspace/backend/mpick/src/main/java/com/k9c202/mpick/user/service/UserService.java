package com.k9c202.mpick.user.service;

import com.amazonaws.SdkClientException;
import com.k9c202.mpick.trade.service.S3Service;
import com.k9c202.mpick.user.controller.request.UpdateUserInfoRequest;
import com.k9c202.mpick.user.controller.response.EmailVerificationResponse;
import com.k9c202.mpick.user.controller.response.JoinUserResponse;
import com.k9c202.mpick.user.controller.response.UserInfoResponse;
import com.k9c202.mpick.user.dto.LoginDto;
import com.k9c202.mpick.user.dto.UserDto;
import com.k9c202.mpick.user.entity.User;
import com.k9c202.mpick.user.entity.UserStatus;
import com.k9c202.mpick.user.jwt.JwtFilter;
import com.k9c202.mpick.user.jwt.TokenProvider;
import com.k9c202.mpick.user.repository.UserQueryRepository;
import com.k9c202.mpick.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.client.ResponseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Duration;
import java.util.Optional;
import java.util.Random;

import static com.k9c202.mpick.user.entity.UserStatus.*;

// TODO: 2023-11-13 ❓) getUserInfo를 UserQueryService로 따로 분리하면 getUserEntity 함수는?
@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class UserService {

    // object에 종속된 변수
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final RedisService redisService;
    private final S3Service s3Service;
    private final MailService mailService;
    private final AuthService authService;

    // 생성자, 같은 이름으로 정의, 실제 객체를 만들 때 사용
    // UserService userService = new UserService(userRepository)에서 UserService에 대한 정의
//    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder) {
//        this.userRepository = userRepository;
//        this.passwordEncoder = passwordEncoder;
//        this.tokenProvider = tokenProvider;
//        this.authenticationManagerBuilder = authenticationManagerBuilder;
//    }
// --> @RequiredArgsConstructor

    // builder 형식으로 생성자 대신 사용
    // 생성자 형식 -> User a = new User(nickname,password,status,....)
    // 아래는 builder 형식

    // 정보 조회
    public UserInfoResponse getUserInfo() {
        // 유저 아이디 정보는 SecurityContextHolder.getContext().getAuthentication().getName()으로 얻을 수 있음
        // JwtFilter에서 setAuthentication
        // 방법2(회원정보수정)/ @AuthenticationPrincipal UserDetails userDetails
        //      userDetails.getUsername()
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loginId = authentication.getName();
        System.out.println("loginId = " + loginId);
        // 로그인 아이디에 해당하는 유저 정보 불러오기
        // findOneByLoginId는 Optional 클래스를 반환하는데, User 클래스를 얻어야 함
        // UserRepository에서 지정해준 클래스(User)로 반환하도록 Optional 함수 중 .orElseThrow 사용
        // Optional 객체 접근 방법 : https://velog.io/@alicesykim95/Java-Optional
        // 함수에 따라 반환값 다름
        // null이 아니면 User 클래스 반환, null이면 UsernameNotFoundException 반환
        User user = getUserEntity(loginId);
        return UserInfoResponse.of(user);
    }

    // 로그아웃
    // redis에 accesstoken을 저장하여 로그아웃 여부 체크
    public void logout(String accessToken) {
        long accessTokenExpirationMillis = tokenProvider.getTokenValidityInMilliseconds();
        redisService.setValues(accessToken, "logout", Duration.ofMillis(accessTokenExpirationMillis));
    }

    // 회원 탈퇴
    public void withdraw() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loginId = authentication.getName();
        User user = getUserEntity(loginId);
        user.editStatus(WITHDRAW);
    }

    // 이메일 수정
    public void changeEmail (String loginId, String newEmail, String authCode) {
        User user = getUserEntity(loginId);
        EmailVerificationResponse emailVerificationResponse = mailService.verifiedCode(newEmail, authCode);
        if (emailVerificationResponse.isSucceeded()) {
            user.editEmail(newEmail);
        } else {
//            throw new IllegalArgumentException("인증코드가 일치하지 않습니다.");
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "인증코드가 일치하지 않습니다.");
        }
    }

    // 닉네임 수정
    public void changeNickname (String loginId, String newNickname) {
        User user = getUserEntity(loginId);
        authService.checkDuplicatedNickname(newNickname);
        user.editNickname(newNickname);
    }

    // 소개글 수정
    public void changeUserIntro (String loginId, String newUserIntro) {
        User user = getUserEntity(loginId);
        user.editUserIntro(newUserIntro);
    }

    // 프로필 이미지 수정
    public void changeProfileImage (String loginId, MultipartFile profileImg) throws IOException {
        User user = getUserEntity(loginId);
        try {
            String profileUrl = s3Service.upload(profileImg, "profiles/");
            user.editProfileImage(profileUrl);
            // TODO: 현재는 2023-11-11 ec2서버에 저장 후 s3서버로 전송하는 방식 -> s3서버에 바로 저장하는 방식으로 변경 + 에러 내용 수정
            // s3 서버에 저장하기 전 ec2 서버에 임시 파일 만들 때 발생하는 에러
        } catch (IOException | IllegalArgumentException exception) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "임시 파일 생성에 실패했습니다.");
        } catch (SdkClientException exception) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "S3 서버 업로드에 실패했습니다.");
        }
    }
//    // 회원 정보 수정 --> (각각 분리)
//    public UserInfoResponse updateUserInfo(String loginId, UpdateUserInfoRequest updateUserInfoRequest, MultipartFile profileImg) throws IOException {
////            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
////            String loginId = authentication.getName();
//
////        User user = userRepository.findOneByLoginId(loginId)
////                .orElseThrow(() -> new UsernameNotFoundException("유저를 찾을 수 없습니다."));
//// ---> (수정)
//        User user = getUserEntity(loginId);
//
//
//        // updateUserInfoRequest != null 조건을 추가하지 않으면 data없이 프로필이미지만 수정했을 때 null 에러 발생
//        /* 아래 조건은 Service가 아닌 request에서 처리
//        if (updateUserInfoRequest != null) {
//            if (updateUserInfoRequest.getNickname() != null) {
//  setNickname -> editNickname (엔티티에서 수정하지 않기. 엔티티에서 setter 사용하지 않기)
//                user.setNickname(updateUserInfoRequest.getNickname());
//            }
//            if (updateUserInfoRequest.getEmail() != null) {
//                user.setEmail(updateUserInfoRequest.getEmail());
//            }
//            if (updateUserInfoRequest.getUserIntro() != null) {
//                user.setUserIntro(updateUserInfoRequest.getUserIntro());
//            }
//        }
//        */
//
//        if (profileImg != null) {
//            String profileUrl = s3Service.upload(profileImg, "profiles/");
//            user.editProfileImage(profileUrl);
//        }
//        return UserInfoResponse.of(user);
//    }

    // 현재 비밀번호 체크
    public void checkPassword(String loginId, String password) {
        User user = getUserEntity(loginId);
        // 사용자가 입력한 password를 암호화한 값과 같은지 비교
        boolean isPasswordCorrect = passwordEncoder.matches(password, user.getPassword());
        if (!isPasswordCorrect) {
//            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "비밀번호가 일치하지 않습니다.");
        }

    }

    // 현재 비밀번호 변경
    public void changePassword(String loginId, String password, String newPassword) {
        User user = getUserEntity(loginId);
        // 현재 비밀번호 체크 후 변경
        checkPassword(loginId, password);
        // 입력받은 새비밀번호 암호화 후 변경
        String encodedNewPassword = passwordEncoder.encode(newPassword);
        user.editPassword(encodedNewPassword);
    }


    // 로그인 아이디로 유저 정보 불러오기 (자주 사용되는 내용 함수로 따로 정의)
    private User getUserEntity(String loginId) {
        Optional<User> findUser = userRepository.findOneByLoginId(loginId);
        if (findUser.isEmpty()) {
            // TODO: 2023-11-13 메세지 하드코딩 하지 말기 ✔
            throw new UsernameNotFoundException("유저를 찾을 수 없습니다.");
        }
        return findUser.get();
    }

 }

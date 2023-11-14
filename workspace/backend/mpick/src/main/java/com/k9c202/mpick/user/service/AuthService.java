package com.k9c202.mpick.user.service;

import com.k9c202.mpick.user.controller.response.JoinUserResponse;
import com.k9c202.mpick.user.dto.LoginDto;
import com.k9c202.mpick.user.dto.UserDto;
import com.k9c202.mpick.user.entity.User;
import com.k9c202.mpick.user.jwt.TokenProvider;
import com.k9c202.mpick.user.repository.UserQueryRepository;
import com.k9c202.mpick.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

// TODO: 2023-11-13 refresh token 
@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserQueryRepository userQueryRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TokenProvider tokenProvider;


    // 회원가입
    public JoinUserResponse signup(UserDto userDto) {

        checkDuplicatedLoginId(userDto.getLoginId());
        checkDuplicatedEmail(userDto.getEmail());
        checkDuplicatedNickname(userDto.getNickname());

        User user = User.builder()
                .loginId(userDto.getLoginId())
                .password(passwordEncoder.encode(userDto.getPassword())) // 패스워드 암호화
                .nickname(userDto.getNickname())
                .email(userDto.getEmail())
                .build();
        // build가 return하는 타입이 User (.build 이후 User)

        // save -> JpaRepository에 정의돼있음
        User savedUser = userRepository.save(user);

        return JoinUserResponse.of(savedUser);
    }

    // 로그인 아이디 중복체크
    public void checkDuplicatedLoginId(String loginId) {
        boolean isExistLoginId = userQueryRepository.existLoginId(loginId);
        if (isExistLoginId) {
//            throw new IllegalArgumentException("로그인 아이디 중복");
            throw new ResponseStatusException(HttpStatus.CONFLICT, "로그인 아이디 중복");
        }
    }

    // 닉네임 중복체크
    public void checkDuplicatedNickname(String nickname) {
        boolean isExistNickname = userQueryRepository.existNickname(nickname);
        if (isExistNickname) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "닉네임 중복");
//            throw new IllegalArgumentException("닉네임 중복");
        }
    }

    // 이메일 중복체크
    public void checkDuplicatedEmail(String email) {
        boolean isExistEmail = userQueryRepository.existEmail(email);
        if (isExistEmail) {
//            throw new IllegalArgumentException("이메일 중복");
            throw new ResponseStatusException(HttpStatus.CONFLICT, "이메일 중복");
        }
    }

    // 로그인
    public String login(LoginDto loginDto) {
        if(!userQueryRepository.existLoginId(loginDto.getLoginId())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "해당 아이디가 존재하지 않습니다.");
        }

        // 인증에 필요한 정보 authenticationToken에 저장
        UsernamePasswordAuthenticationToken authenticationToken =
                // 입력받은 id, password 정보 사용
                // loadUserByUsername의 반환값과 비교하여 일치여부 체크
                new UsernamePasswordAuthenticationToken(loginDto.getLoginId(), loginDto.getPassword());

        // SecurityContext에 인증 여부(authentication) 저장
        try {
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
            // 인증 여부(authentication)를 context에 저장
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return tokenProvider.createToken(authentication);
        } catch (AuthenticationException exception) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "비밀번호가 일치하지 않습니다.");
        }
    }
}

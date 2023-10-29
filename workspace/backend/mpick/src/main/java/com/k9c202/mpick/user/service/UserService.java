package com.k9c202.mpick.user.service;

import com.k9c202.mpick.user.controller.response.JoinUserResponse;
import com.k9c202.mpick.user.dto.LoginDto;
import com.k9c202.mpick.user.dto.UserDto;
import com.k9c202.mpick.user.entity.User;
import com.k9c202.mpick.user.jwt.JwtFilter;
import com.k9c202.mpick.user.jwt.TokenProvider;
import com.k9c202.mpick.user.repository.UserQueryRepository;
import com.k9c202.mpick.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class UserService {

    // object에 종속된 변수
    private final UserRepository userRepository;
    private final UserQueryRepository userQueryRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    // 생성자, 같은 이름으로 정의, 실제 객체를 만들 때 사용
    // UserService userService = new UserService(userRepository)에서 UserService에 대한 정의
//    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder) {
//        this.userRepository = userRepository;
//        this.passwordEncoder = passwordEncoder;
//        this.tokenProvider = tokenProvider;
//        this.authenticationManagerBuilder = authenticationManagerBuilder;
//    }

    // builder 형식으로 생성자 대신 사용
    // 생성자 형식 -> User a = new User(nickname,password,status,....)
    // 아래는 builder 형식

    public JoinUserResponse signup(UserDto userDto) {
        //로그인 아이디 중복
        boolean isExistLoginId = userQueryRepository.existLoginId(userDto.getLoginId());
        if (isExistLoginId) {
            throw new IllegalArgumentException("로그인 아이디 중복");
        }

        //이메일 중복
        boolean isExistEmail = userQueryRepository.existEmail(userDto.getEmail());
        if (isExistEmail) {
            throw new IllegalArgumentException("이메일 중복");
        }

        //닉네임 중복
        boolean isExistNickname = userQueryRepository.existNickname(userDto.getNickname());
        if (isExistNickname) {
            throw new IllegalArgumentException("닉네임 중복");
        }

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

    public String login(LoginDto loginDto) {
        // 인증에 필요한 정보 authenticationToken에 저장
        UsernamePasswordAuthenticationToken authenticationToken =
                // 입력받은 id, password 정보 사용
                new UsernamePasswordAuthenticationToken(loginDto.getLoginId(), loginDto.getPassword());

        // SecurityContext에 인증 여부(authentication) 저장
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        // 인증여부(authentication)를 context에 저장
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return tokenProvider.createToken(authentication);
    }
}

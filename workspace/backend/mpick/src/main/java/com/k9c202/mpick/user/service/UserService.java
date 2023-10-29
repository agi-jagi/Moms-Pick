package com.k9c202.mpick.user.service;

import com.k9c202.mpick.user.dto.UserDto;
import com.k9c202.mpick.user.entity.User;
import com.k9c202.mpick.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    // object에 종속된 변수
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // 생성자, 같은 이름으로 정의, 실제 객체를 만들 때 사용
    // UserService userService = new UserService(userRepository)에서 UserService에 대한 정의
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // builder 형식으로 생성자 대신 사용
    // 생성자 형식 -> User a = new User(nickname,password,status,....)
    // 아래는 builder 형식
    public void signup(UserDto userDto) {
        User user=User.builder()
                .loginId(userDto.getLoginId())
                .nickname(userDto.getNickname())
//                .password(userDto.getPassword())
                .password(passwordEncoder.encode(userDto.getPassword())) // 패스워드 암호화
                .userStatus(userDto.getUserStatus())
                .profileImage(userDto.getProfileImage())
                .email(userDto.getEmail())
                .userIntro(userDto.getUserIntro())
                // build가 return하는 타입이 User (.build 이후 User)
                .build();

        // save -> JpaRepository에 정의돼있음
        userRepository.save(user);
    }
}

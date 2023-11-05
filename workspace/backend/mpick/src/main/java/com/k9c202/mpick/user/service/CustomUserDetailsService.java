package com.k9c202.mpick.user.service;

import com.k9c202.mpick.user.entity.User;
import com.k9c202.mpick.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
//@Component("userDetailsService")
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

//    public CustomUserDetailsService(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
// -> @RequiredArgsConstructor

    // 어떤 User 정보를 넘겨줄지 정의하는 부분
    // UserRepository에서 정보를 찾도록 Security에서 정의한 loadUserByname함수 재정의
    // loadUserByUsername의 반환값과 로그인 시 입력받은 id, password 정보를 비교하여 로그인
    @Override
//    @Transactional
    public UserDetails loadUserByUsername(final String loginId) {
        return userRepository.findOneByLoginId(loginId)
                // entity 클래스를 security의 UserDetails로 변환
                // User Entity를 UserDetails로 변경
                .map(user -> toUserDetails(loginId, user))
                .orElseThrow(() -> new UsernameNotFoundException(loginId + " -> 데이터베이스에서 찾을 수 없습니다."));
    }

    // User Entity를 Secutiry의 User 클래스(userdetails 인터페이스 상속)로 변환하는 함수
    // User정보(entity)를 받아서 UserDetails 클래스 생성
    // createUser 함수의 반환값 User는 내가 정의한 User 엔티티와 다른 것 (다음부터는 Member로 이름 지어야지...)
    private org.springframework.security.core.userdetails.User toUserDetails(String username, User user) {

//        List<GrantedAuthority> grantedAuthorities = user.getAuthorities().stream()
//                .map(authority -> new SimpleGrantedAuthority(authority.getAuthorityName()))
//                .collect(Collectors.toList());

//        List<GrantedAuthority> grantedAuthorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));

        // 탈퇴한 계정은 로그인을 하지 못하도록 설정
        // user의 status가 2(탈퇴)가 아니면 true, 2(탈퇴)면 false
        // user status는 기획 시 1정상, 2탈퇴, 3휴면으로 설정했음
        boolean isEnabled = user.getStatus() != 2;

        return new org.springframework.security.core.userdetails.User(
                user.getLoginId(),
                user.getPassword(),
//                true, true, true, true, new ArrayList<>()
                isEnabled, true, true, true, new ArrayList<>()
        );
    }


}
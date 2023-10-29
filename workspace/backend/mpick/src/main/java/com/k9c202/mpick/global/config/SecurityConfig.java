package com.k9c202.mpick.global.config;

import com.k9c202.mpick.user.jwt.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import java.util.concurrent.ExecutionException;

// https://docs.spring.io/spring-boot/docs/2.7.17/reference/htmlsingle/ 참고
@EnableWebSecurity
@Configuration
public class SecurityConfig {

    // SecurityFilterChain 기본 설정 덮어씌우기 (Bean으로 등록)
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .sessionManagement(sessionManagement ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(authorizeHttpRequest -> authorizeHttpRequest
                        // 아래 url은 권한 필요X
                        .antMatchers("/api/users","/api/users/hello","/api/users/login").permitAll()
                        // 나머지 경로는 권한(인증) 필요
                        .anyRequest().authenticated()
                )
                // (필터 설정 추가하기)
                ;
        // HttpSecurity 안에 builder 有
        return http.build();

    }

    // PasswordEncoder의 Bean 등록
    // DB에 비밀번호 암호화해서 저장
    @Bean
    public PasswordEncoder passwordEncoder() {
        // PasswordEncoder의 여러 종류 중에서 BCryptPasswordEncoder를 사용할 것을 정해준 것
        return new BCryptPasswordEncoder();
    }
}

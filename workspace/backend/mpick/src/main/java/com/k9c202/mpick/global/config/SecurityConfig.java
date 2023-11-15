package com.k9c202.mpick.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.k9c202.mpick.user.jwt.JwtFilter;
import com.k9c202.mpick.user.jwt.TokenProvider;
import com.k9c202.mpick.user.service.RedisService;
import org.springframework.boot.jta.atomikos.AtomikosDependsOnBeanFactoryPostProcessor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.concurrent.ExecutionException;

// https://docs.spring.io/spring-boot/docs/2.7.17/reference/htmlsingle/ 참고
@EnableWebSecurity
@Configuration
public class SecurityConfig {

    // SecurityFilterChain 기본 설정 덮어씌우기 (Bean으로 등록)
    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
// tokenProvider를 매개변수로 받을 수 있도록 수정
    // TODO: 2023-11-15 security
        public SecurityFilterChain filterChain(HttpSecurity http, TokenProvider tokenProvider, RedisService redisService, ObjectMapper objectMapper) throws Exception {
        http
                .csrf().disable()
                .sessionManagement(sessionManagement ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(authorizeHttpRequest -> authorizeHttpRequest
                        // 아래 url은 권한 필요X
                        // .antMatchers("/api/login","/api/join","/api/emails/*").permitAll()
//                        .antMatchers("/api/admin/**").hasRole("ADMIN") // ROLE_ADMIN 권한이 있어야 접근 가능
                        .antMatchers("/**").permitAll()
                        // 나머지 경로는 권한(인증) 필요
                        .anyRequest().authenticated()
                )
                //  JwtFilter 필터 설정
                .addFilterBefore(new JwtFilter(tokenProvider, redisService, objectMapper), UsernamePasswordAuthenticationFilter.class);
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

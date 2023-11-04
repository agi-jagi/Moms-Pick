package com.k9c202.mpick.user.jwt;

import com.k9c202.mpick.user.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtFilter extends GenericFilterBean {

    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);
    public static final String AUTHORIZATION_HEADER = "Authorization";
    private final TokenProvider tokenProvider;
    private final RedisService redisService;

//    public JwtFilter(TokenProvider tokenProvider) {
//        this.tokenProvider = tokenProvider;
//    }

    // doFilter는 abstract 클래스에 있는 아직 정의되지 않은 함수
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        String jwt = tokenProvider.resolveToken(httpServletRequest);
        String requestURI = httpServletRequest.getRequestURI();

        // 유효한 토큰일 때
        // jwt 내용이 있어야 하고, 토큰이 유효해야하고, 로그아웃이 안된 상태여야 인증정보 저장
        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt) && !isLogout(jwt)) {
            Authentication authentication = tokenProvider.getAuthentication(jwt);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            logger.debug("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), requestURI);
        // 유효하지 않은 토큰일 때
        } else {
            logger.debug("유효한 JWT 토큰이 없습니다, uri: {}", requestURI);
        }

        // 다음 필터 실행
        filterChain.doFilter(servletRequest, servletResponse);
    }

    // 로그아웃하면 redis에 accessToken 등록하여 사용하지 않을 것이라는 정보 저장
    // redis에 accesstoken이 있으면 로그아웃 됐다는 의미
    private boolean isLogout(String accessToken) {
        String value = redisService.getValues(accessToken);
        return redisService.checkExistsValue(value);
    }

}
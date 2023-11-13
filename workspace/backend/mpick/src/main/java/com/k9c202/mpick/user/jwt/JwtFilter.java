package com.k9c202.mpick.user.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.k9c202.mpick.global.response.CommonResponse;
import com.k9c202.mpick.user.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtFilter extends GenericFilterBean {

    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);
    public static final String AUTHORIZATION_HEADER = "Authorization";
    private final TokenProvider tokenProvider;
    private final RedisService redisService;
    private final ObjectMapper objectMapper;

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
        try {
            if (!StringUtils.hasText(jwt)) {
                logger.trace("비회원 접근. uri: {}", requestURI);
            } else if (!tokenProvider.validateToken(jwt)) {
                logger.trace("유효하지 않은 JWT 토큰. uri: {}", requestURI);
            } else if (isLogout(jwt)) {
                logger.trace("로그아웃된 회원 접근. uri: {}", requestURI);
            } else {
                // 토큰 검증 이후 유저 아이디 정보 저장
                // 유저 아이디는 authentication 클래스 안에 담겨 있는 정보. 아이디 정보 얻을때 authentication.getName()으로 접근
                Authentication authentication = tokenProvider.getAuthentication(jwt);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                logger.debug("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), requestURI);
            }
            // 다음 필터 실행
            filterChain.doFilter(servletRequest, servletResponse);
        // 유효하지 않은 토큰일 때 예외처리 (http status)
        // validateToken 함수에서 throw new ResponseStatusException((1)상태코드, (2)"메세지");로 예외 던짐 (TokenProvider.java 파일 확인하기)
        } catch (ResponseStatusException exception) {
            HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;
            // (1) 넘겨준 상태코드 적용
            httpServletResponse.setStatus(exception.getStatus().value());

            // (2) 넘겨준 에러 내용 적용
            // httpServletResponse.setContentType("application/json") 사용 시 한글 깨짐 현상 발생
                // 방법1) httpServletResponse.addHeader("Content-Type","application/json; charset=UTF-8");
                // 방법2) .setContentType("application/json") & .setCharacterEncoding("UTF-8")
            httpServletResponse.setContentType(MediaType.APPLICATION_JSON_VALUE); // application/json 형식
            httpServletResponse.setCharacterEncoding("UTF-8"); // 인코딩
            httpServletResponse.getWriter().write(objectMapper.writeValueAsString(
                    CommonResponse.ERROR(exception, exception.getStatus())
                    // new CommonResponse<>(false, null, new ErrorResponse(exception, exception.getStatus()))));
            ));
        }
    }

    // 로그아웃하면 redis에 accessToken 등록하여 사용하지 않을 것이라는 정보 저장
    // redis에 accesstoken이 있으면 로그아웃 됐다는 의미
    private boolean isLogout(String accessToken) {
        String value = redisService.getValues(accessToken);
        return redisService.checkExistsValue(value);
    }

}
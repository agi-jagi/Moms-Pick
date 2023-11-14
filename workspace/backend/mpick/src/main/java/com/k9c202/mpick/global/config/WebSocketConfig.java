package com.k9c202.mpick.global.config;

import com.k9c202.mpick.chatting.controller.ChatHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

// https://docs.spring.io/spring-framework/docs/5.3.30/reference/html/web.html#websocket
// WebSocket Handshake
// HandshakeInterceptor를 사용하면 WebSocket Handshake를 커스터마이징할 수 있음
//      (+ handshake를 배제하거나 WebSocketSession에 속성 부여 가능)
@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {

    private final ChatHandler chatHandler;

    // localhost:5000/ws 경로로 접속하면 chatHandler 실행 (WebSocket 서버가 열리는 것)
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(chatHandler, "/ws").setAllowedOrigins("*");
    }
}
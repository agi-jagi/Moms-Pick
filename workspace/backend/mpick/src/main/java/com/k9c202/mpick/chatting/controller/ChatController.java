package com.k9c202.mpick.chatting.controller;

import com.k9c202.mpick.chatting.controller.response.ChatMessageResponse;
import com.k9c202.mpick.chatting.controller.response.ChatRoomResponse;
import com.k9c202.mpick.chatting.service.ChatService;
import com.k9c202.mpick.global.response.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/chattings")
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;

    // TODO: 2023-11-07  userDetails.getUsername 부분 수정 고려
    // 내 채팅방 목록 (로그인 아이디 사용)
    @GetMapping
    public CommonResponse<List<ChatRoomResponse>> getChatRooms(@AuthenticationPrincipal UserDetails userDetails){
        return CommonResponse.OK(chatService.getChatRooms(userDetails.getUsername()));
    }

    // 채팅방 메세지 목록
    // 특정 채팅방id를 통해 메세지 반환
    // 로그인id, 채팅방id
    @GetMapping("/{chatRoomId}")
    public CommonResponse<List<ChatMessageResponse>> getChatMessages(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long chatRoomId){
        return CommonResponse.OK(chatService.getChatMessages(userDetails.getUsername(), chatRoomId));
    }
}
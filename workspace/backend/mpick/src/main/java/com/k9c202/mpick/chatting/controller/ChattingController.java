package com.k9c202.mpick.chatting.controller;

import com.k9c202.mpick.chatting.controller.response.ChatRoomResponse;
import com.k9c202.mpick.chatting.service.ChattingService;
import com.k9c202.mpick.global.response.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller
@RequestMapping("/api/chattings")
@RestController
@RequiredArgsConstructor
public class ChattingController {

    private final ChattingService chattingService;

//    @GetMapping
//    public CommonResponse<List<ChatRoomResponse>> getChatRooms(@AuthenticationPrincipal UserDetails userDetails) {
//        return CommonResponse.OK(chattingService.getChatRooms(userDetails.getUsername()));
//    }

}

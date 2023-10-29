package com.k9c202.mpick.user.controller;

import com.k9c202.mpick.user.dto.UserDto;
import com.k9c202.mpick.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // /api/users 경로로 post요청이 왔을 때 실행될 부분
    // 어떤 타입을 사용할지 모를 때 <?>

    // 아래 방법은 데이터만 보내고, status code를 조정 못함
    //    @PostMapping
    //    public UserDto signup(@RequestBody UserDto userDto) {
    //        userService.signup(userDto);
    //        return userDto;
    //    }

    @PostMapping
    public ResponseEntity<UserDto> signup(@RequestBody UserDto userDto) {
        userService.signup(userDto);
        // 200일 경우, return ResponseEntity.status(200).body(null);과 동일
        // 예외 처리를 어떻게 할지 정해야 함. 일단 성공인 경우만 적어놓음 (500으로 에러 처리 될 것)
        return ResponseEntity.ok(null);
        // 다른 형식 예) return ResponseEntity.status(HttpStatus.CONFLICT).body(userDto);
    }

    @GetMapping("/hello")
    public String hello(){
        return "hello";
    }



}

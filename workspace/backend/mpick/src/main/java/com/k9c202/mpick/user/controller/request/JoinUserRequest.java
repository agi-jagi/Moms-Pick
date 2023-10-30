package com.k9c202.mpick.user.controller.request;

import com.k9c202.mpick.user.dto.UserDto;
import lombok.Data;

import javax.validation.constraints.*;

@Data
public class JoinUserRequest {
    // 회원가입 시 입력받는 값들 (Dto와 동일한 변수들)
    // 입력값 체크

    @NotEmpty(message = "로그인 아이디는 필수값입니다.") // null
    @Size(max = 20) // 길이 제한
    private String loginId;

    @NotEmpty
    @Size(max = 20)
    private String password;

    @NotEmpty
    @Size(max = 20)
    private String nickname;

    @NotEmpty
    @Size(max = 100)
    @Email  // 이메일 형식 체크
    private String email;

    // to
    public UserDto toUserDto() {
        return UserDto.builder()
                .loginId(this.loginId)
                .password(this.password)
                .nickname(this.nickname)
                .email(this.email)
                .build();
    }
}

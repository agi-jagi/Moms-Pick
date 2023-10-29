package com.k9c202.mpick.user.controller.request;

import com.k9c202.mpick.user.dto.UserDto;
import lombok.Data;

import javax.validation.constraints.*;

@Data
public class JoinUserRequest {

    @NotEmpty(message = "로그인 아이디는 필수값입니다.")
    @Size(max = 20)
    private String loginId;

    @NotEmpty
    @Size(max = 20)
    private String password;

    @NotEmpty
    @Size(max = 20)
    private String nickname;

    @NotEmpty
    @Size(max = 100)
    @Email
    private String email;

    public UserDto toUserDto() {
        return UserDto.builder()
                .loginId(this.loginId)
                .password(this.password)
                .nickname(this.nickname)
                .email(this.email)
                .build();
    }
}

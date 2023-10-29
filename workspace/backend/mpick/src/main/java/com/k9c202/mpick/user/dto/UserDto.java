package com.k9c202.mpick.user.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

// controller와 service가 dto로 주고 받고, service와 repository가 entity로 주고 받음
// 로직X, 주고 받을 데이터 포맷, getter&setter
@Data
public class UserDto {

    private String loginId;
    private String nickname;
    private String password;
    private String email;

    @Builder
    private UserDto(String loginId, String nickname, String password, String email) {
        this.loginId = loginId;
        this.nickname = nickname;
        this.password = password;
        this.email = email;
    }
}

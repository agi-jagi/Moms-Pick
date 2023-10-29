package com.k9c202.mpick.user.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

// controller와 service가 dto로 주고 받고, service와 repository가 entity로 주고 받음
// 로직X, 주고 받을 데이터 포맷, getter&setter
@Getter
@Setter
public class UserDto {
    String loginId;
    String nickname;
    String password;
    String userStatus;
    String profileImage;
    String email;
    LocalDateTime createdDate;
    String userIntro;
}

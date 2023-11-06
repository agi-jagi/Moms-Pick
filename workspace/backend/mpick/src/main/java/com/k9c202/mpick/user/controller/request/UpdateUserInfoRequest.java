package com.k9c202.mpick.user.controller.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class UpdateUserInfoRequest {
    // @NotEmpty와 같은 조건들은 Service가 아닌 request에서 처리
    private String nickname;
    private String email;
    private String userIntro;
}

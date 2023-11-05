package com.k9c202.mpick.user.controller.request;

import lombok.Data;

@Data
public class UpdateUserInfoRequest {
    private String nickname;
    private String email;
    private String userIntro;
}

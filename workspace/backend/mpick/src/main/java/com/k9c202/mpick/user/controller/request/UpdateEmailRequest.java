package com.k9c202.mpick.user.controller.request;

import lombok.Data;

@Data
public class UpdateEmailRequest {
    private String email;
    private String authCode;
}

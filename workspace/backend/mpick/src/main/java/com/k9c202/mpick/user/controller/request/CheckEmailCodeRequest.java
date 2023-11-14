package com.k9c202.mpick.user.controller.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Data
public class CheckEmailCodeRequest {
    @Email
    private String email;
    @NotNull
    private String authCode;

}

package com.k9c202.mpick.user.controller.request;

import lombok.Data;

// TODO: 2023-11-09 request 입력값 형식 체크하는 코드 전반적으로 추가하기  
@Data
public class CheckEmailRequest {
    private String email;
}

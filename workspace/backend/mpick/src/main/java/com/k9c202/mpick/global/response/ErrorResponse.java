package com.k9c202.mpick.global.response;

import org.springframework.http.HttpStatus;

public class ErrorResponse {
    private final String message;
    private final HttpStatus httpStatus;

    public ErrorResponse(Throwable throwable,HttpStatus httpStatus){
        this.message = throwable.getMessage();
        this.httpStatus = httpStatus;
    }
}

package com.k9c202.mpick.global.response;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Getter
public class ErrorResponse {
    private final String message;
    private final HttpStatus httpStatus;

    public ErrorResponse(ResponseStatusException exception, HttpStatus httpStatus){
        this.message = exception.getReason();
        this.httpStatus = httpStatus;
    }

    public ErrorResponse(Throwable throwable, HttpStatus httpStatus){
        this.message = throwable.getMessage();
        this.httpStatus = httpStatus;
    }

    public ErrorResponse(String errorMessage, HttpStatus httpStatus) {
        this.message = errorMessage;
        this.httpStatus = httpStatus;
    }
}

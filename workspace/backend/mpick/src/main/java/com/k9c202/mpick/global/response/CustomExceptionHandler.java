package com.k9c202.mpick.global.response;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

@ControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<CommonResponse<String>> handleCustomException(ResponseStatusException exception) {
        return ResponseEntity.status(exception.getStatus())
                .body(CommonResponse.ERROR(exception, exception.getStatus()));
    }
}

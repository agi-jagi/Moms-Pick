package com.k9c202.mpick.global.response;

import org.springframework.http.HttpStatus;
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

    @ExceptionHandler(Exception.class)
    public ResponseEntity<CommonResponse<String>> Exception(Exception exception) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(CommonResponse.ERROR(exception, HttpStatus.INTERNAL_SERVER_ERROR));
    }

}

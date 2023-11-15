package com.k9c202.mpick.global.response;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Getter
public class CommonResponse<T> {

    private final boolean success;
    private final T response;
    private final ErrorResponse errorResponse;

    public CommonResponse(boolean success, T response,ErrorResponse errorResponse){
        this.success = success;
        this.response = response;
        this.errorResponse = errorResponse;
    }

    public static <T> CommonResponse<T> OK(T response){
        return new CommonResponse<>(true,response,null);
    }

    public static <T> CommonResponse<T> ERROR(ResponseStatusException exception, HttpStatus httpStatus){
        return new CommonResponse<>(false, null, new ErrorResponse(exception,httpStatus));
    }
    public static <T> CommonResponse<T> ERROR(Throwable throwable, HttpStatus httpStatus){
        return new CommonResponse<>(false, null, new ErrorResponse(throwable,httpStatus));
    }

    public static <T> CommonResponse<T> ERROR(String errorMessage, HttpStatus httpStatus) {
        return new CommonResponse<>(false, null, new ErrorResponse(errorMessage, httpStatus));
    }
}

package com.k9c202.mpick.user.controller.response;

import lombok.Builder;
import lombok.Data;

@Data
public class EmailVerificationResponse {
    private boolean isSucceeded;

    @Builder
    private EmailVerificationResponse(boolean isSucceeded) {
        this.isSucceeded = isSucceeded;
    }

    public static EmailVerificationResponse of(boolean authResult) {
        return EmailVerificationResponse.builder()
                .isSucceeded(authResult)
                .build();
    }
}

package com.k9c202.mpick.user.controller.response;

import lombok.Builder;
import lombok.Data;

@Data
public class EmailVerificationResult {
    private boolean isSucceeded;

    @Builder
    private EmailVerificationResult(boolean isSucceeded) {
        this.isSucceeded = isSucceeded;
    }

    public static EmailVerificationResult of(boolean authResult) {
        return EmailVerificationResult.builder()
                .isSucceeded(authResult)
                .build();
    }
}

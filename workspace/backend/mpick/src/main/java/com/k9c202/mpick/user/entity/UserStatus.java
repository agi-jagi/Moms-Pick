package com.k9c202.mpick.user.entity;

import lombok.Getter;

@Getter
public enum UserStatus {

    ACTIVE(1, "정상"),
    WITHDRAW(2, "탈퇴"),
    DEACTIVE(3, "휴면");

    private final int code;
    private final String text;

    UserStatus(int code, String text) {
        this.code = code;
        this.text = text;
    }
}

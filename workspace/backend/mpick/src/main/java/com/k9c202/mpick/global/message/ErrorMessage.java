package com.k9c202.mpick.global.message;

import lombok.AllArgsConstructor;
import lombok.Getter;

// 에러 메세지 사용 방법
// 1) enum
// 2) abstract class
// 3) Resource Bundle 'error_message'
//      error_message_en.properties
//      error_message_ko.properties
@Getter
@AllArgsConstructor
public enum ErrorMessage {

    // TODO: 11/12/23 에러 메세지 공통화 ✔
    NO_SUCH_USER("해당하는 유저를 찾을 수 없습니다.");

    private final String message;
}
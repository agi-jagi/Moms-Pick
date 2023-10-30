package com.k9c202.mpick.user.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

// controller와 service가 dto로 주고 받고, service와 repository가 entity로 주고 받음
// 로직X, 주고 받을 데이터 포맷, getter&setter
// @Data : @Getter, @Setter, @RequiredArgsConstructor, @ToString, @EqualsAndHashCode
//         모든 필드를 대상으로 접근자와 설정자가 자동으로 생성되고,
//         final 또는 @NotNull 필드 값을 파라미터로 받는 생성자가 만들어지고,
//         toString, equals, hashCode 메소드가 자동으로 만들어짐
@Data
public class UserDto {
    // 회원가입 시 입력받는 값
    private String loginId;
    private String nickname;
    private String password;
    private String email;

    @Builder
    private UserDto(String loginId, String nickname, String password, String email) {
        this.loginId = loginId;
        this.nickname = nickname;
        this.password = password;
        this.email = email;
    }
}

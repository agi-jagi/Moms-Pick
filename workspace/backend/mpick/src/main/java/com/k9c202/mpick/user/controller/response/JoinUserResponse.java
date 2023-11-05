package com.k9c202.mpick.user.controller.response;

import com.k9c202.mpick.user.entity.User;
import com.k9c202.mpick.user.entity.UserStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class JoinUserResponse {
    private Long userId;
    private String loginId;
    private String nickname;
    private String email;
    private String status;
    private LocalDateTime createdDate;

    @Builder
    private JoinUserResponse(Long userId, String loginId, String nickname, String email, String status, LocalDateTime createdDate) {
        this.userId = userId;
        this.loginId = loginId;
        this.nickname = nickname;
        this.email = email;
        this.status = status;
        this.createdDate = createdDate;
    }


    // of
    // builder 사용
    public static JoinUserResponse of(User user) {
        return JoinUserResponse.builder()
                .userId(user.getId())
                .loginId(user.getLoginId())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .status(user.getStatus().getText())
                .createdDate(user.getCreatedDate())
                .build();
    }

}

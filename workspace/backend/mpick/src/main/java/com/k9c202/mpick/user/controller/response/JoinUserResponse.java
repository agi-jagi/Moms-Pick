package com.k9c202.mpick.user.controller.response;

import com.k9c202.mpick.user.entity.User;
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
    private JoinUserResponse(Long userId, String loginId, String nickname, String email, Integer status, LocalDateTime createdDate) {
        this.userId = userId;
        this.loginId = loginId;
        this.nickname = nickname;
        this.email = email;
        this.status = getStatus(status);
        this.createdDate = createdDate;
    }

    private String getStatus(int status) {
        if (status == 1) {
            return "정상";
        }
        if (status == 2) {
            return "탈퇴";
        }
        return "휴면";
    }

    public static JoinUserResponse of(User user) {
        return JoinUserResponse.builder()
                .userId(user.getId())
                .loginId(user.getLoginId())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .status(user.getStatus())
                .createdDate(user.getCreatedDate())
                .build();
    }

}

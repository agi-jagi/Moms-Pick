package com.k9c202.mpick.user.controller.response;

import com.k9c202.mpick.user.entity.User;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserInfoResponse {
    // 개발 시 확인할 값들
    // 자주 사용되는 값을 위쪽으로 위치시키기
    private String loginId;
    private String nickname;
    private String email;
    private String status;
    private String profileImage;
    private String userIntro;

    // builder 정의
    @Builder
    private UserInfoResponse(String loginId, String nickname, String email, Integer status, String profileImage, String userIntro) {
        this.loginId = loginId;
        this.nickname = nickname;
        this.email = email;
        this.status = getStatus(status);
        this.profileImage = profileImage;
        this.userIntro = userIntro;
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

    // of
    // builder 사용
    public static UserInfoResponse of(User user) {
        return UserInfoResponse.builder()
                .loginId(user.getLoginId())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .status(user.getStatus())
                .profileImage(user.getProfileImage())
                .userIntro(user.getUserIntro())
                .build();
    }

}

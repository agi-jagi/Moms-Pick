package com.k9c202.mpick.user.controller.request;

import com.k9c202.mpick.user.entity.UserStatus;
import lombok.Data;

@Data
public class UpdateStatusRequest {
    private String loginId; // 관리자가 수정하고 싶은 유저의 아이디
    private UserStatus userStatus;
}

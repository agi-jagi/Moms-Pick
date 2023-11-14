package com.k9c202.mpick.user.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@EntityListeners(AuditingEntityListener.class)
// NoArgsConstructor, AllArgsConstructor 체크 필요
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment, IDENTITY는 기본키 생성을 DB에 위임
    @Column(name = "user_id")   // 컬럼명 따로 지정
    private Long id;

    // 중복/null값/수정 허용 여부, 길이제한
    @Column(unique = true, nullable = false, updatable = false, length = 20)
    private String loginId;

//  Entity에서 @Setter 사용X -> editPassword() 따로 정의
    @Column(nullable = false, columnDefinition = "char(60)")
    private String password;

//    @Setter
    @Column(unique = true, nullable = false, length = 20)
    private String nickname;

//    @Setter
    @Column(unique = true, nullable = false, length = 100)
    private String email;

//    @Setter
    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private UserStatus status; // 1(ACTIVE)

//    @Setter
    @Column(length = 255)
    private String profileImage; // null

//    @Setter
    @Column(length = 300)
    private String userIntro; // null

    @CreatedDate
    private LocalDateTime createdDate;

    @Enumerated(value = EnumType.STRING)
    private UserAuthority userAuthority;

    protected User() {
        this.status = UserStatus.ACTIVE;
        this.profileImage = null;
        this.userIntro = null;
        this.userAuthority = UserAuthority.ROLE_USER; // 기본값은 ROLE_USER
    }

    @Builder
    private User(String loginId, String nickname, String password, String email) {
        this();
        this.loginId = loginId;
        this.nickname = nickname;
        this.password = password;
        this.email = email;
    }

    // 비밀번호 변경
    public User editPassword(String password) {
        this.password = password;
        return this;
    }

    // 닉네임 변경
    public User editNickname(String nickname) {
        this.nickname = nickname;
        return this;
    }

    // 이메일 변경
    public void editEmail(String email) {
        this.email = email;
    }

    // 회원 상태 변경
    public User editStatus(UserStatus status) {
        this.status = status;
        return this;
    }

    // 프로필 이미지 변경
    public User editProfileImage(String profileImage) {
        this.profileImage = profileImage;
        return this;
    }

    // 유저 정보 변경
    public User editUserIntro(String userIntro) {
        this.userIntro = userIntro;
        return this;
    }
}

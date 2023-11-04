package com.k9c202.mpick.user.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
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

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment, IDENTITY는 기본키 생성을 DB에 위임
    @Column(name = "user_id")   // 컬럼명 따로 지정
    private Long id;

    // 중복/null값/수정 허용 여부, 길이제한
    @Column(unique = true, nullable = false, updatable = false, length = 20)
    private String loginId;

    @Column(nullable = false, columnDefinition = "char(60)")
    private String password;

    @Column(unique = true, nullable = false, length = 20)
    private String nickname;

    @Column(unique = true, nullable = false, updatable = false, length = 100)
    private String email;

    @Setter
    @Column(nullable = false)
    private Integer status; //1

    @Column(length=255)
    private String profileImage; //null

    @Column(length=300)
    private String userIntro; // null

    @CreatedDate
    private LocalDateTime createdDate;

    protected User() {
        this.status = 1;
        this.profileImage = null;
        this.userIntro = null;
    }

    @Builder
    private User(String loginId, String nickname, String password, String email) {
        this();
        this.loginId = loginId;
        this.nickname = nickname;
        this.password = password;
        this.email = email;
    }

}

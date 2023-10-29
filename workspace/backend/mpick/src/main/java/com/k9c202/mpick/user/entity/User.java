package com.k9c202.mpick.user.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
// NoArgsConstructor, AllArgsConstructor 체크 필요
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    // 일단 Long 타입으로 설정하고 테스트 (UUID 수정하거나)
    Long userId;
    @Column(length=20)
    String loginId;
    @Column(length=20)
    String nickname;
    @Column(columnDefinition = "char(60)")
    String password;
    String userStatus;
    @Column(length=255)
    String profileImage;
    @Column(length=100)
    String email;
    @CreationTimestamp
    LocalDateTime createdDate;
    @Column(length=300)
    String userIntro;


}

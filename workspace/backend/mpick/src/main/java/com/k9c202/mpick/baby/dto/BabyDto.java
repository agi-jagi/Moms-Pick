package com.k9c202.mpick.baby.dto;

import com.k9c202.mpick.baby.entity.Baby;
import com.k9c202.mpick.user.entity.User;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class BabyDto {

    private Long babyId;
    private String babyName;
    private String babyGender;
    private Date babyBirth;
    private Integer babyOrder;

    public Baby toEntity(User user){
        return Baby.builder()
                .babyId(babyId)
                .user(user)
                .babyGender(babyGender)
                .babyName(babyName)
                .babyBirth(babyBirth)
                .babyOrder(babyOrder)
                .build();
    }


}

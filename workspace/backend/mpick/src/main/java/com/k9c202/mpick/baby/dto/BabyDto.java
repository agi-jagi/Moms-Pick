package com.k9c202.mpick.baby.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class BabyDto {

    private Long babyId;
    private Long user;
    private String babyName;
    private String babyGender;
    private Date babyBirth;
    private Integer babyOrder;

}

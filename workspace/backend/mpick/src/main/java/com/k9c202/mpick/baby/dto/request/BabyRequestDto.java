package com.k9c202.mpick.baby.dto.request;

import com.k9c202.mpick.baby.entity.Baby;
import com.k9c202.mpick.user.entity.User;
import lombok.Data;
import lombok.experimental.SuperBuilder;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Data
@SuperBuilder
public class BabyRequestDto {

    private Long babyId;
    private User user;
    private String babyName;
    private String babyGender;
    private Date babyBirth;
    private Integer babyOrder;





}

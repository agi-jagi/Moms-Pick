package com.k9c202.mpick.baby.dto.request;

import com.k9c202.mpick.baby.entity.Baby;
import com.k9c202.mpick.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class BabyRequestDto {

    private Long babyId;
    private String user;
    private String babyName;
    private String babyGender;
    private Date babyBirth;
    private Integer babyOrder;





}

package com.k9c202.mpick.baby.entity;

import com.k9c202.mpick.user.entity.User;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.stereotype.Repository;

import javax.persistence.*;
import java.util.Date;

@Getter
@SuperBuilder
@NoArgsConstructor
@Entity
@Table(name = "baby")
public class Baby {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long babyId;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    private String babyName;

    private String babyGender;

    @Temporal(TemporalType.DATE)
    private Date babyBirth;

    private Integer babyOrder;


}

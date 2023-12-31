package com.k9c202.mpick.baby.entity;

import com.k9c202.mpick.baby.dto.BabyDto;
import com.k9c202.mpick.user.entity.User;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.stereotype.Repository;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
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

    private String status;

    public BabyDto toBabyDto(){
        return BabyDto.builder()
                .babyId(babyId)
                .babyName(babyName)
                .babyGender(babyGender)
                .babyBirth(babyBirth)
                .babyOrder(babyOrder)
                .status(status)
                .build();
    }

}

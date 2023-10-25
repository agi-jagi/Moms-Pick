package com.k9c202.mpick.global.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@SuperBuilder
@Table(name = "baby_month")
@Entity
public class BabyMonthEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer babyMonthId;

    @Column
    private Integer startMonth;

    @Column(nullable = true)
    private Integer endMonth;
}

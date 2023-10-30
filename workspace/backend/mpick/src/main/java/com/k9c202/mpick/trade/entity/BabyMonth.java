package com.k9c202.mpick.trade.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "baby_month")
public class BabyMonth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "baby_month_id")
    private Integer id;

    @Column(nullable = false)
    private Integer startMonth;

    @Column
    private Integer endMonth;
}

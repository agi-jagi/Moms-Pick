package com.k9c202.mpick.global.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@SuperBuilder
@Table(name = "trade_month")
@Entity
public class TradeMonthEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer tradeMonthId;

    @Column
    private Long tradeId;

    @Column
    private Integer babyMonthId;
}

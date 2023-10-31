package com.k9c202.mpick.trade.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "trade_month")
public class TradeMonth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trade_month_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "trade_id")
    private Trade trade;

    @ManyToOne
    @JoinColumn(name = "baby_month_id")
    private BabyMonth babyMonth;
}

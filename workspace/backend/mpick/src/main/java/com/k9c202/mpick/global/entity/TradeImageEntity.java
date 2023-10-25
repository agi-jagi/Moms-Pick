package com.k9c202.mpick.global.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.math.BigInteger;
import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Getter
@NoArgsConstructor
@SuperBuilder
@Table(name = "trade_image")
@Entity
public class TradeImageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger tradeImageId;

    @Column
    private Integer tradeId;

    @Column
    private String uploadFileName;

    @Column
    private String saveFileName;

    @Column(name = "created_date", insertable = false)
    @CreationTimestamp
    private Timestamp tradeImageCreateDate;

    @Column(name = "update_date", insertable = false)
    @UpdateTimestamp
    private Timestamp tradeImageUpdateDate;

    @Column
    private Integer sequence;
}

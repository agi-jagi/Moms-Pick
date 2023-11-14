package com.k9c202.mpick.info.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.math.BigDecimal;

@Getter
@SuperBuilder
@NoArgsConstructor
@Entity
public class Kindergarten {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String address;

    @Column(precision = 19, scale = 16, nullable = false)
    private BigDecimal latitude;

    @Column(precision = 19, scale = 16, nullable = false)
    private BigDecimal longitude;

    @Column
    private String establish;

    @Column
    private String kinderName;

    @Column
    private String opertime;

    @Column
    private String hpAddress;

    @Column
    private String telephoneNo;
}

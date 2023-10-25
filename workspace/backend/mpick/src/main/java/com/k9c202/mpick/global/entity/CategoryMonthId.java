package com.k9c202.mpick.global.entity;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigInteger;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class CategoryMonthId implements Serializable {

    @Column(name = "category_id")
    private BigInteger categoryId;

    @Column(name = "baby_month_id")
    private Integer babyMonthId;
}

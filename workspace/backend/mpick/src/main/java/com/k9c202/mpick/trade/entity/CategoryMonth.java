package com.k9c202.mpick.trade.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "category_month")
public class CategoryMonth {

    @EmbeddedId
    private CategoryMonthId categoryMonthId;

    @Column
    private String parentingInfo;
}

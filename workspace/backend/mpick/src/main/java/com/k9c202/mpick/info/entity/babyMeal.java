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
public class babyMeal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String mealCategory;

    @Column
    private String mealName;

    @Column(length = 500)
    private String cookMethod;

    @Column
    private String materialName;

    @Column(precision = 5, scale = 1)
    private BigDecimal calorie;

    @Column(precision = 5, scale = 1)
    private BigDecimal carbohydrates;

    @Column(precision = 5, scale = 1)
    private BigDecimal protein;

    @Column(precision = 5, scale = 1)
    private BigDecimal fat;

    @Column(precision = 5, scale = 1)
    private BigDecimal cellulose;

    @Column(precision = 5, scale = 1)
    private BigDecimal calcium;

    @Column(precision = 5, scale = 1)
    private BigDecimal phosphorus;

    @Column(precision = 5, scale = 1)
    private BigDecimal fe;

    @Column(precision = 5, scale = 1)
    private BigDecimal sodium;

    @Column(precision = 5, scale = 1)
    private BigDecimal potassium;

    @Column(precision = 5, scale = 1, name = "vitamin_a")
    private BigDecimal vitaminA;

    @Column(precision = 5, scale = 1)
    private BigDecimal thiamine;

    @Column(precision = 5, scale = 1)
    private BigDecimal riboflavin;

    @Column(precision = 5, scale = 1)
    private BigDecimal niacin;

    @Column(precision = 5, scale = 1, name = "vitamin_c")
    private BigDecimal vitaminC;

    @Column
    @Enumerated(value = EnumType.STRING)
    private SubMealCategory subMealCategory;
}

package com.k9c202.mpick.info.controller.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class BabyMealDetailInfoResponse {

    private String mealName;

    private String cookMethod;

    private String materialName;

    private BigDecimal carbohydrates;

    private BigDecimal protein;

    private BigDecimal fat;

    private BigDecimal sodium;

    private BigDecimal calcium;

    private BigDecimal fe;

    private BigDecimal calorie;
}

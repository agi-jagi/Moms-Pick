package com.k9c202.mpick.info.controller.component;

import com.k9c202.mpick.info.controller.response.BabyMealDetailInfoResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class BabyMealDetailDto {
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

    public BabyMealDetailInfoResponse toBabyMealDeatailInfoResponse() {

        List<String> cmethods = List.of(this.cookMethod.split("<br>"));

        return BabyMealDetailInfoResponse.builder()
                .mealName(this.mealName)
                .cookMethod(cmethods)
                .materialName(this.materialName)
                .carbohydrates(this.carbohydrates)
                .protein(this.protein)
                .fat(this.fat)
                .sodium(this.sodium)
                .calcium(this.calcium)
                .fe(this.fe)
                .calorie(this.calorie)
                .build();
    }
}

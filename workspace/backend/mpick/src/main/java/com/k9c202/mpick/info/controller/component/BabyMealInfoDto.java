package com.k9c202.mpick.info.controller.component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class BabyMealInfoDto {

    private Long id;

    private String mealName;
}

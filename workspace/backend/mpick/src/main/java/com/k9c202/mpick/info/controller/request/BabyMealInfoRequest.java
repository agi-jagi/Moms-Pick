package com.k9c202.mpick.info.controller.request;

import com.k9c202.mpick.info.entity.SubMealCategory;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
public class BabyMealInfoRequest {

    private SubMealCategory subMealCategory;

    private Integer page;
}

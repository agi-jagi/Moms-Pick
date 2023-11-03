package com.k9c202.mpick.trade.controller.component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class MainCategoryDto {

    private Long categoryId;

    private String categoryName;
}

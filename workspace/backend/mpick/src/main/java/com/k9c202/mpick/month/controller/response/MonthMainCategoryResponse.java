package com.k9c202.mpick.month.controller.response;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class MonthMainCategoryResponse {

    private Long categoryId;

    private String categoryName;
}

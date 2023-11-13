package com.k9c202.mpick.info.controller.response;

import com.k9c202.mpick.info.controller.component.BabyMealInfoDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class BabyMealInfoListResponse {

    private Long maxPage;

    private Long maxCount;

    private List<BabyMealInfoDto> babyMealInfoDtoList;

    public void setBabyMealInfoDtoList(List<BabyMealInfoDto> babyMealInfoDtoList) {
        this.babyMealInfoDtoList = babyMealInfoDtoList;
    }
}

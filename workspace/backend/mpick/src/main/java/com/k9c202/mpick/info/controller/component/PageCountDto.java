package com.k9c202.mpick.info.controller.component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class PageCountDto {

    private Long maxPage;

    private Long maxCount;
}

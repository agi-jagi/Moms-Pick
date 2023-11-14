package com.k9c202.mpick.info.controller.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Data
@SuperBuilder
@NoArgsConstructor
public class DayCareCenterInfoRequest {

    private BigDecimal latitude;

    private BigDecimal longitude;
}

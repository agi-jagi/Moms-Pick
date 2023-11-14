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
public class DayCareCenterInfoResponse {

    private Long id;

    private String address;

    private BigDecimal latitude;

    private BigDecimal longitude;

    private String establish;

    private String DayCareCenterName;

    private String hpAddress;
}

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
public class LactationRoomResponse {

    private Long id;

    private String facilityName;

    private String address;

    private String buildingName;

    private BigDecimal latitude;

    private BigDecimal longitude;
}

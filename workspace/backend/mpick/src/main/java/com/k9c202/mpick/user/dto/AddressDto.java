package com.k9c202.mpick.user.dto;

import lombok.Builder;
import lombok.Data;

import javax.persistence.Column;
import java.math.BigDecimal;

@Data
public class AddressDto {

    // mysql은 언더바, java는 camelCase
    private Long addressId;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String addressName;
    private String addressString;
    private Boolean isSet;

    @Builder
    private AddressDto(Long addressId, BigDecimal latitude, BigDecimal longitude, String addressName, String addressString, Boolean isSet) {
        this.addressId = addressId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.addressName = addressName;
        this.addressString = addressString;
        this.isSet = isSet;
    }
}

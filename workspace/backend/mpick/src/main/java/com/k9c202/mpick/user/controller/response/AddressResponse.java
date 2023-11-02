package com.k9c202.mpick.user.controller.response;

import com.k9c202.mpick.user.entity.Address;
import com.k9c202.mpick.user.entity.User;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class AddressResponse {
    private Long addressId;

    private BigDecimal latitude;

    private BigDecimal longitude;

    private String addressName;

    private String addressString;

    private Boolean isSet;

    @Builder
    private AddressResponse(Long addressId, BigDecimal latitude, BigDecimal longitude, String addressName, String addressString, Boolean isSet) {
        this.addressId = addressId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.addressName = addressName;
        this.addressString = addressString;
        this.isSet = isSet;
    }

    public static AddressResponse of(Address address) {
        return AddressResponse.builder()
                .addressId(address.getId())
                .latitude(address.getLatitude())
                .longitude(address.getLongitude())
                .addressName(address.getAddressName())
                .addressString(address.getAddressString())
                .isSet(address.getIsSet())
                .build();
    }
}

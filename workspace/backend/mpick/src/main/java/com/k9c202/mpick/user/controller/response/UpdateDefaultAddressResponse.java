package com.k9c202.mpick.user.controller.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class UpdateDefaultAddressResponse {
    private Long addressId;

    private BigDecimal latitude;

    private BigDecimal longitude;

    private String addressName;

    private String addressString;

    private Boolean isSet; // 기본 주소 설정 여부

    public UpdateDefaultAddressResponse flipped() {
        return UpdateDefaultAddressResponse.builder()
                .addressId(getAddressId())
                .latitude(getLatitude())
                .longitude(getLongitude())
                .addressName(getAddressName())
                .addressString(getAddressString())
                // isSet값 true <-> false 전환
                .isSet(!getIsSet())
                .build();
    }

}

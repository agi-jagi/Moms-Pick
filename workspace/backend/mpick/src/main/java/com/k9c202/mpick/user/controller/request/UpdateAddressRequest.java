package com.k9c202.mpick.user.controller.request;

import com.k9c202.mpick.user.dto.AddressDto;
import com.k9c202.mpick.user.dto.UserDto;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Data
public class UpdateAddressRequest {

    @NotEmpty
    // decimal(19,16) 나중에 추가
    private BigDecimal latitude;

    @NotEmpty
    private BigDecimal longitude;

    @NotEmpty
    @Size(max = 20)
    private String addressName;

    @NotEmpty
    @Size(max = 120)
    private String addressString;

    @NotEmpty
    private Boolean isSet;

    public AddressDto toAddressDto() {
        return AddressDto.builder()
                .latitude(this.latitude)
                .longitude(this.longitude)
                .addressName(this.addressName)
                .addressString(this.addressString)
                .isSet(this.isSet)
                .build();
    }
}

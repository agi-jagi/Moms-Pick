package com.k9c202.mpick.user.controller.request;

import com.k9c202.mpick.user.dto.AddressDto;
import com.k9c202.mpick.user.dto.UserDto;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Data
public class AddAddressRequest {

    // TODO: 2023-11-13 예외 메세지 작성
    @NotEmpty
    // decimal(19,16) 나중에 추가
    private BigDecimal latitude;

    // TODO: 2023-11-13 String은 반드시 NotBlank 사용
    //    @NotNull // null
    //    @NotEmpty // null, ""
    //    @NotBlank //null, "", " "
    @NotEmpty
    private BigDecimal longitude;

    @NotEmpty
    @Size(max = 20)
    private String addressName;

    @NotEmpty
    @Size(max = 120)
    private String addressString;

    @NotEmpty   // String
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

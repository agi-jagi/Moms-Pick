package com.k9c202.mpick.user.controller.request;

import com.k9c202.mpick.user.dto.AddressDto;
import com.k9c202.mpick.user.dto.UserDto;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

// TODO: 2023-11-09 request 입력값 형식 체크하는 코드 전반적으로 추가하기
//      유효성 검증 실패 시 MethodArgumentNotValidException
@Data
public class AddAddressRequest {

    // TODO: 2023-11-13 예외 메세지 작성 (message = "입력값이 없습니다.") ✔
    @NotEmpty
    private BigDecimal latitude;

    // TODO: 2023-11-13 String은 반드시 NotBlank 사용
    //    @NotNull // null
    //    @NotEmpty // null, ""
    //    @NotBlank //null, "", " "
    @NotEmpty
    private BigDecimal longitude;

//    @NotEmpty
    @NotBlank
    @Size(max = 20)
    private String addressName;

//    @NotEmpty
    @NotBlank
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

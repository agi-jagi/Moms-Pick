package com.k9c202.mpick.info.controller.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.validation.constraints.NotEmpty;
import java.math.BigDecimal;

@Data
@SuperBuilder
@NoArgsConstructor
public class LactationRoomInfoRequest {

    @NotEmpty
    private BigDecimal latitude;

    @NotEmpty
    private BigDecimal longitude;
}

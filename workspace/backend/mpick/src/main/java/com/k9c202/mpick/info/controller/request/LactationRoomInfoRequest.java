package com.k9c202.mpick.info.controller.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@SuperBuilder
@NoArgsConstructor
public class LactationRoomInfoRequest {

    @NotNull
    private BigDecimal latitude;

    @NotNull
    private BigDecimal longitude;
}

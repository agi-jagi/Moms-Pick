package com.k9c202.mpick.trade.controller.component;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class ImageSaveForm {

    private String uploadFileName;

    private String saveFileName;

    private Integer sequence;
}

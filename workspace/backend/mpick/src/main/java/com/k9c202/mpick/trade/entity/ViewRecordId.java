package com.k9c202.mpick.trade.entity;

import lombok.Data;

import javax.persistence.Embeddable;
import javax.persistence.Column;
import java.io.Serializable;
import java.util.UUID;

@Data
@Embeddable
public class ViewRecordId implements Serializable {

    @Column
    private UUID userId;

    @Column
    private Long tradeId;
}

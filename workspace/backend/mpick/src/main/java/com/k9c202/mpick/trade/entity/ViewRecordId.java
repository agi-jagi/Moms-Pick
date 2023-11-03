package com.k9c202.mpick.trade.entity;

import com.k9c202.mpick.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Fetch;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Data
@Embeddable
@SuperBuilder
@AllArgsConstructor
public class ViewRecordId implements Serializable {

    public ViewRecordId() {}

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trade_id")
    private Trade trade;
}

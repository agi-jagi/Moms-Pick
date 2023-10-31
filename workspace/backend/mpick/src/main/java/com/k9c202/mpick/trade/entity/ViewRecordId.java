package com.k9c202.mpick.trade.entity;

import com.k9c202.mpick.user.entity.User;
import lombok.Data;

import javax.persistence.Embeddable;
import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;
import java.util.UUID;

@Data
@Embeddable
public class ViewRecordId implements Serializable {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "trade_id")
    private Trade trade;
}

package com.k9c202.mpick.user.entity;

import com.k9c202.mpick.trade.entity.Trade;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Wish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    @Column(name="wish_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // 
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="trade_id")
    private Trade trade;

}

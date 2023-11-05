package com.k9c202.mpick.chatting.entity;

import com.k9c202.mpick.trade.entity.Trade;
import com.k9c202.mpick.user.entity.User;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="chat_room_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trade_id")
    private Trade trade;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private Integer buyerUnreadCount;

    private Integer sellerUnreadCount;

}
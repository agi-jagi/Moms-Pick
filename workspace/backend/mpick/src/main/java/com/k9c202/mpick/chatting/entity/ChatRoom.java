package com.k9c202.mpick.chatting.entity;

import com.k9c202.mpick.trade.entity.Trade;
import com.k9c202.mpick.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "last_chat_message_id")
    @Setter
    private ChatMessage lastChatMessage;

    @Builder
    private ChatRoom(Long id, Trade trade, User user, Integer buyerUnreadCount, Integer sellerUnreadCount, ChatMessage lastChatMessage) {
        this.id = id;
        this.trade = trade;
        this.user = user;
        this.buyerUnreadCount = buyerUnreadCount;
        this.sellerUnreadCount = sellerUnreadCount;
        this.lastChatMessage = lastChatMessage;
    }

    public void increaseBuyerUnreadCount(){
        buyerUnreadCount+=1;
    }
    public void increaseSellerUnreadCount(){
        sellerUnreadCount+=1;
    }
    public void resetBuyerUnreadCount(){
        buyerUnreadCount=0;
    }
    public void resetSellerUnreadCount(){
        sellerUnreadCount=0;
    }
}
package com.k9c202.mpick.global.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.UUID;
import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Getter
@SuperBuilder
@NoArgsConstructor
@Table(name = "trade")
@Entity
public class TradeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger tradeId;

    @Column
    private UUID sellerId;

    @Column
    private BigInteger categoryId;

    @Column
    private int addressId;

    @Column
    private String title;

    @Column
    private int price;

    @Column
    private String explain;

    @Column(name = "count", insertable = false)
    private int wishCount;

    @Column(insertable = false)
    private int viewCount;

    @Column
    private int tradeState;

    @CreationTimestamp
    @Column(name = "created_date", insertable = false)
    private Timestamp trade_create_date;

    @UpdateTimestamp
    @Column(name = "update_date", insertable = false)
    private Timestamp trade_update_date;

    public void increaseViewCount() { this.viewCount++; }

    public void increaseWishCount() { this.wishCount++; }

    public void decreaseWishCount() { this.wishCount--; }

    public void updateTrade(BigInteger categoryId, int addressId, String title, int price, String explain, int tradeState) {
        this.categoryId = categoryId;
        this.addressId = addressId;
        this.title = title;
        this.price = price;
        this.explain = explain;
        this.tradeState = tradeState;
    }
}

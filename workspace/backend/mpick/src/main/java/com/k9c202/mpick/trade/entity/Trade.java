package com.k9c202.mpick.trade.entity;

import com.k9c202.mpick.user.entity.Address;
import com.k9c202.mpick.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.sql.Timestamp;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Getter
@SuperBuilder
@NoArgsConstructor
@Entity
@Table(name = "trade")
public class Trade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trade_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id")
    private Address address;

    @Column
    private String title;

    @Column
    private Integer price;

    @Column
    private String tradeExplain;

    @Column
    private Long wishCount;

    @Column
    private Long viewCount;

    @Column
    @Enumerated(EnumType.ORDINAL)
    private TradeStatus tradeStatus;

    @CreationTimestamp
    @Column(name = "created_date")
    private Timestamp tradeCreateDate;

    @UpdateTimestamp
    @Column(name = "update_date")
    private Timestamp tradeUpdateDate;

    public void increaseViewCount() { this.viewCount++; }

    public void increaseWishCount() { this.wishCount++; }

    public void decreaseWishCount() { this.wishCount--; }

    public void updateTrade(Category category, Address address, String title, Integer price, String tradeExplain, TradeStatus tradeStatus) {
        this.category = category;
        this.address = address;
        this.title = title;
        this.price = price;
        this.tradeExplain = tradeExplain;
        this.tradeStatus = tradeStatus;
    }
}

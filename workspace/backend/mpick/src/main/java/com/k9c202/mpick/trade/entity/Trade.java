package com.k9c202.mpick.trade.entity;

import com.k9c202.mpick.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.UUID;
import java.sql.Timestamp;

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

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "address_id")
    private Integer addressId;

    @Column
    private String title;

    @Column
    private Integer price;

    @Column
    private String tradeExplain;

    @Column(name = "count", insertable = false)
    private Integer wishCount;

    @Column(insertable = false)
    private Integer viewCount;

    @Enumerated(EnumType.ORDINAL)
    private TradeStatus tradeStatus;

    @CreationTimestamp
    @Column(name = "created_date", insertable = false)
    private Timestamp tradeCreateDate;

    @UpdateTimestamp
    @Column(name = "update_date", insertable = false)
    private Timestamp tradeUpdateDate;

    public void increaseViewCount() { this.viewCount++; }

    public void increaseWishCount() { this.wishCount++; }

    public void decreaseWishCount() { this.wishCount--; }

    public void updateTrade(Category category, Integer addressId, String title, Integer price, String tradeExplain, TradeStatus tradeStatus) {
        this.category = category;
        this.addressId = addressId;
        this.title = title;
        this.price = price;
        this.tradeExplain = tradeExplain;
        this.tradeStatus = tradeStatus;
    }
}

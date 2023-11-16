package com.k9c202.mpick.user.entity;

import com.k9c202.mpick.trade.entity.Trade;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter
@NoArgsConstructor
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="rating_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewee", nullable = false)
    private User reviewee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="reviewer")
    private User reviewer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="trade_id", nullable = false)
    private Trade trade;

    @Column(precision = 2, scale = 1, nullable = false)
    private BigDecimal rate;

    @Builder
    private Rating(User reviewer, Trade trade, BigDecimal rate) {
        this.reviewer = reviewer;
        this.trade = trade;
        this.rate = rate;
    }

    public void editRate(BigDecimal rate) {
        this.rate = rate;
    }


}

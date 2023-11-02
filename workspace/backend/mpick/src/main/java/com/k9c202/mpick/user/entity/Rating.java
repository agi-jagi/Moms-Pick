package com.k9c202.mpick.user.entity;

import com.k9c202.mpick.trade.entity.Trade;
import lombok.Getter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="rating_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="reviewer", nullable = false)
    private User reviewer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="trade_id", nullable = false)
    private Trade trade;

    @Column(precision = 2, scale = 1, nullable = false)
    private BigDecimal rate;

}

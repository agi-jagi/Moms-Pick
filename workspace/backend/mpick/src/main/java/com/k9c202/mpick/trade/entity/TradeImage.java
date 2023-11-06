package com.k9c202.mpick.trade.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@SuperBuilder
@NoArgsConstructor
@Entity
@Table(name = "trade_image")
public class TradeImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trade_image_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trade_id")
    private Trade trade;

    @Column
    private String saveFileName;

    @Column
    @CreationTimestamp
    private Timestamp createdDate;

    @Column
    @UpdateTimestamp
    private Timestamp updateDate;

    @Column
    private Integer sequence;
}

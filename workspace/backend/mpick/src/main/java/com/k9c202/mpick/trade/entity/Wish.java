package com.k9c202.mpick.trade.entity;

import com.k9c202.mpick.trade.entity.Trade;
import com.k9c202.mpick.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Wish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    @Column(name="wish_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // Lazy : 지연로딩, 실제로 user를 사용하는 시점에 user를 조회하는 쿼리 적용
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="trade_id")
    private Trade trade;

    @Column
    @CreationTimestamp
    private Timestamp wishCreateDate;
}

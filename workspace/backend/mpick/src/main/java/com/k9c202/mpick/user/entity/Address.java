package com.k9c202.mpick.user.entity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter
@NoArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="address_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // TODO: 2023-11-13 BigDecimal -> Double로 수정 
    @Column(precision = 19, scale = 16, nullable = false)
    private BigDecimal latitude;

    @Column(precision = 19, scale = 16, nullable = false)
    private BigDecimal longitude;

    @Column(length = 20, nullable = false)
    private String addressName;

    @Column(length = 120, nullable = false)
    private String addressString;

    @Column(nullable = false)
    private Boolean isSet;

    @Builder
    private Address(Long id, User user, BigDecimal latitude, BigDecimal longitude, String addressName, String addressString, Boolean isSet) {
        this.id = id;
        this.user = user;
        this.latitude = latitude;
        this.longitude = longitude;
        this.addressName = addressName;
        this.addressString = addressString;
        this.isSet = isSet;
    }
}

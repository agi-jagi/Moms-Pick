package com.k9c202.mpick.global.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.math.BigInteger;

@Getter
@NoArgsConstructor
@SuperBuilder
@Table(name = "category")
@Entity
public class CategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger categoryId;

    @Column(nullable = true)
    private BigInteger categoryId2;

    @Column
    private String categoryName;
}

package com.k9c202.mpick.trade.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long id;

    @Column(name = "category_id2")
    private Long categoryId2;

    @Column(nullable = false)
    private String categoryName;

    @Column(nullable = false)
    private String uploadFileName;

    @Column(nullable = false)
    private String saveFileName;
}

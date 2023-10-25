package com.k9c202.mpick.global.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Getter
@NoArgsConstructor
@SuperBuilder
@Table(name = "banner_image")
@Entity
public class BannerImageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bannerImageId;

    @Column(name = "type")
    private String bannerType;

    @Column(name = "url", nullable = true)
    private String bannerUrl;

    @Column
    private String uploadFileName;

    @Column
    private String saveFileName;

    @Column(name = "created_date")
    @CreationTimestamp
    private Timestamp bannerCreateDate;

    @Column(name = "update_date")
    @UpdateTimestamp
    private Timestamp bannerUpdateDate;

    @Column(name = "sequence")
    private Integer bannerSequence;
}

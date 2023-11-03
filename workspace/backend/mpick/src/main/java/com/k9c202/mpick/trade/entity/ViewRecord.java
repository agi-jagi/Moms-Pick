package com.k9c202.mpick.trade.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Table;
import javax.persistence.Entity;
import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Getter
@SuperBuilder
@Entity
@Table(name = "view_record")
@NoArgsConstructor
@AllArgsConstructor
public class ViewRecord {

    @EmbeddedId
    private ViewRecordId viewRecordId;

    @CreationTimestamp
    @Column(name = "created_date")
    private Timestamp viewCreatedDate;

    @UpdateTimestamp
    @Column(name = "recent_date")
    private Timestamp viewRecentDate;
}

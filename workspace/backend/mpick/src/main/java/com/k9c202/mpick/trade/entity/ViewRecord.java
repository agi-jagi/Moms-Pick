package com.k9c202.mpick.trade.entity;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Table;
import javax.persistence.Entity;
import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
@Getter
@SuperBuilder
@Table(name = "view_record")
@Entity
public class ViewRecord {

    @EmbeddedId
    private ViewRecordId viewRecordId;

    @CreationTimestamp
    @Column(name = "created_date")
    private Timestamp viewCreatedDate;
}

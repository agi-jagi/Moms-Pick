package com.k9c202.mpick.chatting.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="chat_message_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;

    private Boolean toSeller;

    @Column(length = 500)
    private String message;

    // TODO: 2023-11-07 CreateDate, UpdatedDate 파일 따로 분리 
    @CreatedDate
    private LocalDateTime createdDate;

    private Boolean hideForSeller;

    private Boolean hideForBuyer;

    @Builder
    private ChatMessage(Long id, ChatRoom chatRoom, Boolean toSeller, String message, LocalDateTime createdDate, Boolean hideForSeller, Boolean hideForBuyer) {
        this.id = id;
        this.chatRoom = chatRoom;
        this.toSeller = toSeller;
        this.message = message;
        this.createdDate = createdDate;
        this.hideForSeller = hideForSeller;
        this.hideForBuyer = hideForBuyer;
    }
}
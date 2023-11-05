package com.k9c202.mpick.chatting.entity;

import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="chat_message_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;

    // 메세지 방향
    private Boolean toSeller;

    @Column(length = 500)
    private String message;

    @CreatedDate
    private LocalDateTime created_date;

    // 채팅방에서 나만 안보이게 메세지 삭제
    private Boolean hideForSeller;

    private Boolean hideForBuyer;
}
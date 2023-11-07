package com.k9c202.mpick.chatting.repository;

import com.k9c202.mpick.chatting.controller.response.ChatMessageResponse;
import com.k9c202.mpick.chatting.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    // 특정 채팅방의 ChatMessage List
    List<ChatMessage> findAllByChatRoomId(Long chatRoomId);
}
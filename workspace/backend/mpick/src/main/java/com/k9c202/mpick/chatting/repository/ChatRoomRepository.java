package com.k9c202.mpick.chatting.repository;

import com.k9c202.mpick.chatting.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    // 거래pk, 유저아이디 (특정 거래 & 특정 유저)
    // chatroom.trade.id와 chatroom.user.loginid를 매개변수로 받아서 해당하는 엔티티 반환
    Optional<ChatRoom> findByTradeIdAndUserLoginId(Long tradeId, String loginId);
}
package com.k9c202.mpick.chatting.repository;

import com.k9c202.mpick.chatting.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    // 거래pk, 유저아이디 (특정 거래 & 특정 유저)
    // chatroom.trade.id와 chatroom.user.loginid를 매개변수로 받아서 해당하는 엔티티 반환
    Optional<ChatRoom> findByTradeIdAndUserLoginId(Long tradeId, String loginId);

    // TODO: 2023-11-13 JPQL or querydsl로 findByIdWithUser 커스텀
    // JPQL
    // SQL : select * from chat_room join on chat_room.user_id = user.id where chat_room_id = ?
    @Query("select cr from ChatRoom cr join fetch cr.user u where cr.id = :chatRoomId")
    Optional<ChatRoom> findByIdWithUser(@Param("chatRoomId") Long chatRoomId);
}
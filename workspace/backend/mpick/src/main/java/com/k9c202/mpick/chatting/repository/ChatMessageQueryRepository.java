package com.k9c202.mpick.chatting.repository;

import com.k9c202.mpick.chatting.entity.ChatMessage;
import com.k9c202.mpick.chatting.entity.ChatRoom;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static com.k9c202.mpick.chatting.entity.QChatMessage.chatMessage;
import static com.k9c202.mpick.chatting.entity.QChatRoom.chatRoom;
import static com.k9c202.mpick.trade.entity.QTrade.trade;

// 채팅메세지에서 거래id에 접근하려면,
// 채팅 메세지 -> 채팅방 -> 거래
// n+1문제 때문에 fetch join으로 미리 정보 불러오기
@Slf4j
@Repository
public class ChatMessageQueryRepository {
    private final JPAQueryFactory queryFactory;

    public ChatMessageQueryRepository(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    public List<ChatMessage> findAllByChatRoomId(Long chatRoomId){
        List<ChatMessage> result = queryFactory
                .select(chatMessage)
                .from(chatMessage)
                .innerJoin(chatMessage.chatRoom, chatRoom).fetchJoin()
                .innerJoin(chatRoom.trade, trade).fetchJoin()
                .where(chatMessage.chatRoom.id.eq(chatRoomId))
                .fetch();
        return result;
    }

}
package com.k9c202.mpick.chatting.repository;


import com.k9c202.mpick.chatting.controller.response.ChatRoomResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static com.k9c202.mpick.chatting.entity.QChatRoom.chatRoom;
import static com.k9c202.mpick.user.entity.QUser.user;

@Slf4j
@Repository
public class ChatRoomQueryRepository {
    private final JPAQueryFactory queryFactory;

    public ChatRoomQueryRepository(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    public List<ChatRoomResponse> findAllByLoginId(String loginId) {
        List<ChatRoomResponse> result = queryFactory
                .select(Projections.fields(ChatRoomResponse.class,chatRoom))
                .from(chatRoom)
                .join(chatRoom.user, user)
                .fetch();

        return result;
    }
}
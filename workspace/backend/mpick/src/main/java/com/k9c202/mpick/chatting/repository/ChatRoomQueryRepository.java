package com.k9c202.mpick.chatting.repository;

import com.k9c202.mpick.chatting.controller.response.ChatRoomResponse;
import com.k9c202.mpick.chatting.dto.ChatRoomDto;
import com.k9c202.mpick.chatting.entity.ChatRoom;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static com.k9c202.mpick.chatting.entity.QChatRoom.chatRoom;
import static com.k9c202.mpick.trade.entity.QTrade.trade;
import static com.k9c202.mpick.trade.entity.QTradeImage.tradeImage;
import static com.k9c202.mpick.user.entity.QUser.user;

@Slf4j
@Repository
public class ChatRoomQueryRepository {
    private final JPAQueryFactory queryFactory;

    public ChatRoomQueryRepository(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    // TODO: 2023-11-07 fetch join이 없을 때 결과 확인하기
    // 로그인 ID로 채팅방 리스트 반환하는 함수 정의 (특정 사용자의 채팅방 목록 불러오기)
    // 반환 타입 ChatRoom(.select(chatRoom))
    // fetchJoin으로 채팅방마다 불러와야 하는 정보들을 한번에 가져오기
    // 리포지토리를 사용하지 않는 이유? n+1 문제
    public List<ChatRoom> findAllByLoginId(String loginId) {
        List<ChatRoom> result = queryFactory
                // JPA는 컬럼 대신 Entity 사용 가능(객체)
                // select에 있는 것이 타입이 됨
                .select(chatRoom)
                .from(chatRoom)
                // join할 테이블
                .innerJoin(chatRoom.user).fetchJoin()
                // as (trade.user도 필요하기 때문에 trade를 먼저 fetchjoin후 trade.user fetchjoin)
                // fetchjoin을 할 경우 chatroom.trade.user로 사용 시 에러 발생
                .innerJoin(chatRoom.trade,trade).fetchJoin()
                .innerJoin(trade.user).fetchJoin()
                // 채팅방에서 메세지가 없는 경우를 상정해서 innerjoin이 아닌 leftjoin 사용
                .leftJoin(chatRoom.lastChatMessage).fetchJoin()
                // 특정 사용자가 구매자일 수도 있고 판매자일 수도 있음
                // chatRoom.user.loginId : 구매자
                // trade.user.loginId : 판매자 (chatroom.trade.user.loginId를 사용하면 join문이 하나 더 나감)
                .where(chatRoom.user.loginId.eq(loginId)
                        .or(trade.user.loginId.eq(loginId)))
                .fetch();

        return result;
    }

    // 로그인 아이디에 해당하는 채팅방 리스트 반환하는 함수
    // 반환 타입은 Long (select(chatRoom.id))
    public List<Long> findAllChatRoomIdByLoginId(String loginId) {
        List<Long> result = queryFactory
                .select(chatRoom.id)
                .from(chatRoom)
                // join문을 명시해주지 않으면 cross join이 사용되기 때문에 아래와 같이 명시해줌 (innerjoin부분 없어도 작동은 됨)
                .innerJoin(chatRoom.user)
                .innerJoin(chatRoom.trade.user)
                .where(chatRoom.user.loginId.eq(loginId)
                        .or(chatRoom.trade.user.loginId.eq(loginId)))
                .fetch();

        return result;
    }
}
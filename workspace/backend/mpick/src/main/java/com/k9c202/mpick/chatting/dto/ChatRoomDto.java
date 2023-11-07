package com.k9c202.mpick.chatting.dto;

        import com.k9c202.mpick.chatting.controller.response.ChatRoomResponse;
        import com.k9c202.mpick.chatting.entity.ChatRoom;
        import lombok.Builder;
        import lombok.Data;
        import lombok.NoArgsConstructor;

        import java.time.LocalDateTime;

// querydsl에서 내보내기 쉬운 형태의 dto로 먼저 변환 후 chat room response dto 사용
// chat room response dto는 판매자인 경우와 구매자인 경우가 나눠져 있음
// chat room dto는 판매자와 구매자의 정보가 모두 담겨있음
// 발신자, 수신자 구분 쉽게 작성
@Data
@NoArgsConstructor
public class ChatRoomDto {
    private Long chatRoomId;
    private String sellerLoginId;
    private String sellerNickname;
    private String sellerProfileImage;
    private String buyerLoginId;
    private String buyerNickname;
    private String buyerProfileImage;
    private Long tradeId;
    private String tradeTitle;
    private String tradeImage;
    private String lastMessage;
    private LocalDateTime lastDateTime;
    private Integer sellerUnreadCount;
    private Integer buyerUnreadCount;

    @Builder
    private ChatRoomDto(Long chatRoomId, String sellerLoginId, String sellerNickname, String sellerProfileImage, String buyerLoginId, String buyerNickname, String buyerProfileImage, Long tradeId, String tradeTitle, String tradeImage, String lastMessage, LocalDateTime lastDateTime, Integer sellerUnreadCount, Integer buyerUnreadCount) {
        this.chatRoomId = chatRoomId;
        this.sellerLoginId = sellerLoginId;
        this.sellerNickname = sellerNickname;
        this.sellerProfileImage = sellerProfileImage;
        this.buyerLoginId = buyerLoginId;
        this.buyerNickname = buyerNickname;
        this.buyerProfileImage = buyerProfileImage;
        this.tradeId = tradeId;
        this.tradeTitle = tradeTitle;
        this.tradeImage = tradeImage;
        this.lastMessage = lastMessage;
        this.lastDateTime = lastDateTime;
        this.sellerUnreadCount = sellerUnreadCount;
        this.buyerUnreadCount = buyerUnreadCount;
    }
}

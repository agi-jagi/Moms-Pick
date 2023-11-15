package com.k9c202.mpick.trade.controller.request;

import com.k9c202.mpick.trade.entity.Category;
import com.k9c202.mpick.trade.entity.TradeStatus;
import com.k9c202.mpick.user.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
public class TradeAddRequest {

    @NotEmpty(message = "대분류 카테고리는 필수 항목입니다.")
    private String mainCategory;

    private String subCategory;

    @NotEmpty(message = "판매글 제목은 필수 항목입니다.")
    private String title;

    @NotNull(message = "가격은 필수 항목입니다.")
    private Integer price;

    private String tradeExplain;

    @NotEmpty(message = "사용 월령은 필수 항목입니다.")
    private List<Integer> babyMonthIds;
}

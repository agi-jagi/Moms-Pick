package com.k9c202.mpick.trade.controller.request;

import com.k9c202.mpick.trade.entity.Category;
import com.k9c202.mpick.trade.entity.TradeStatus;
import com.k9c202.mpick.user.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotEmpty;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
public class TradeAddRequest {

    @NotEmpty
    private Long categoryId;

    @NotEmpty
    private String title;

    @NotEmpty
    private Integer price;

    private String tradeExplain;

    @NotEmpty
    private List<Integer> startMonths;

}

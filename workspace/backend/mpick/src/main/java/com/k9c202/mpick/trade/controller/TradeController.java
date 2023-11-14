package com.k9c202.mpick.trade.controller;

import com.k9c202.mpick.global.function.CommonFunction;
import com.k9c202.mpick.global.response.CommonResponse;
import com.k9c202.mpick.trade.controller.component.TradeAddCategoryForm;
import com.k9c202.mpick.trade.controller.request.*;
import com.k9c202.mpick.trade.controller.response.TradeDetailResponse;
import com.k9c202.mpick.trade.controller.response.TradeSearchResponse;
import com.k9c202.mpick.trade.entity.Trade;
import com.k9c202.mpick.trade.service.TradeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AbstractPageRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.awt.print.Pageable;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/trades")
public class TradeController {

//    final private int size = 9;
    private final TradeService tradeService;

    @Operation(summary = "판매글 검색 및 필터링(미완성)", description = "판매글 검색 및 필터링(미완성)")
    @PostMapping
    public CommonResponse<List<TradeSearchResponse>> search(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Integer page,
            @RequestBody TradeSearchRequest request) {

        if (page == null) {
            page = 0;
        }

        List<TradeSearchResponse> result = tradeService.tradeFilter(request, page, keyword);

        return CommonResponse.OK(result);
    }

    @Operation(summary = "판매글 작성", description = "판매글 작성")
    @PostMapping(value = "/item", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public CommonResponse<Long> tradeAdd(
            @RequestPart(value = "data") TradeAddRequest request,
            @RequestPart(value = "files") List<MultipartFile> multipartFiles,
            Authentication authentication) throws IOException {

        Long result = tradeService.tradeAdd(request, multipartFiles, authentication.getName());

        return CommonResponse.OK(result);
    }

    @Operation(summary = "판매글 상세 조회", description = "판매글 상세 조회")
    @GetMapping(value = "/item/{tradeId}")
    public CommonResponse<TradeDetailResponse> tradeDetail(@PathVariable Long tradeId, Authentication authentication) {

        tradeService.increaseViewCount(tradeId, authentication.getName());

        return CommonResponse.OK(tradeService.tradeDetail(tradeId, authentication.getName()));
    }

    @Operation(summary = "판매글 작성 페이지 카테고리 조회", description = "판매글 작성 페이지에 필요한 카테고리 목록 조회")
    @GetMapping(value = "/item/category")
    public CommonResponse<TradeAddCategoryForm> tradeAddCategory(Authentication authentication) {

        return CommonResponse.OK(tradeService.getTradeAddCategoryForm());
    }

    @Operation(summary = "판매글 찜 기능", description = "판매글 찜 기능")
    @PostMapping(value = "/wish")
    public CommonResponse<String> tradeWish(
            @RequestBody WishRequest wishRequest,
            Authentication authentication) {

        String message = tradeService.tradeWish(wishRequest.getTradeId(), authentication.getName());

        return CommonResponse.OK(message);
    }

    @Operation(summary = "판매글 삭제 기능", description = "판매글 삭제 기능")
    @DeleteMapping(value = "/item/{tradeId}")
    public CommonResponse<?> tradeDelete(
            @PathVariable Long tradeId,
            Authentication authentication) {

        tradeService.deleteTrade(tradeId, authentication.getName());

        return CommonResponse.OK(true);
    }

    @Operation(summary = "판매 완료 기능", description = "판매 완료 기능")
    @PutMapping(value = "/item")
    public CommonResponse<String> tradeComplete(
            Authentication authentication,
            @RequestBody TradeCompleteRequest request) {



        return CommonResponse.OK("판매 완료 처리되었습니다.");
    }
}

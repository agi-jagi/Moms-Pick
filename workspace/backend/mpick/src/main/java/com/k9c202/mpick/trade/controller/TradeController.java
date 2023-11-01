package com.k9c202.mpick.trade.controller;

import com.k9c202.mpick.trade.controller.request.TradeAddRequest;
import com.k9c202.mpick.trade.controller.request.TradeQueryRequest;
import com.k9c202.mpick.trade.controller.request.TradeSearchRequest;
import com.k9c202.mpick.trade.controller.response.TradeDetailResponse;
import com.k9c202.mpick.trade.controller.response.TradeSearchResponse;
import com.k9c202.mpick.trade.service.TradeService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AbstractPageRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.awt.print.Pageable;
import java.util.ArrayList;
import java.util.List;


@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/trades")
public class TradeController {

//    final private int size = 9;

    @Autowired
    private final TradeService tradeService;

    @PostMapping
    public ResponseEntity<List<TradeSearchResponse>> search(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Integer page,
            @RequestBody TradeSearchRequest request) {

        if (page == null) {
            page = 0;
        }

        List<TradeSearchResponse> result = tradeService.tradeFilter(request, page, keyword);

        return ResponseEntity.ok(result);
    }

    @PostMapping(value = "/item", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Long> tradeAdd(
            @RequestPart(value = "data") TradeAddRequest request,
            @RequestPart(value = "files") List<MultipartFile> multipartFiles) {

        Long result = tradeService.tradeAdd(request, multipartFiles);

        return ResponseEntity.ok(result);
    }
}

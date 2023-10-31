package com.k9c202.mpick.trade.controller;

import com.k9c202.mpick.trade.controller.request.TradeAddRequest;
import com.k9c202.mpick.trade.controller.request.TradeQueryRequest;
import com.k9c202.mpick.trade.controller.request.TradeSearchRequest;
import com.k9c202.mpick.trade.controller.response.TradeDetailResponse;
import com.k9c202.mpick.trade.controller.response.TradeSearchResponse;
import com.k9c202.mpick.trade.service.TradeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AbstractPageRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/item")
    public ResponseEntity<Long> tradeAdd(
            @RequestBody TradeAddRequest request) {

        Long result = tradeService.tradeAdd(request);

        return ResponseEntity.ok(result);
    }

}

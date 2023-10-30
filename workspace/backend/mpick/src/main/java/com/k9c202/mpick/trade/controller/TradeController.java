package com.k9c202.mpick.trade.controller;

import com.k9c202.mpick.trade.controller.request.TradeQueryRequest;
import com.k9c202.mpick.trade.controller.request.TradeSearchRequest;
import com.k9c202.mpick.trade.controller.response.TradeDetailResponse;
import com.k9c202.mpick.trade.controller.response.TradeSearchResponse;
import com.k9c202.mpick.trade.service.TradeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
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

    private final TradeService tradeService;

    @GetMapping()
    public List<TradeSearchResponse> search(
            @RequestParam int page,
            @RequestParam(required = false) String keyword,
            @RequestBody @Valid TradeSearchRequest request) {

//        PageRequest pageable = PageRequest.of(page, size);

        List<TradeSearchResponse> result = new ArrayList<>();

        result = tradeService.tradeSearch(request);

        return result;
    }

//    @GetMapping("/item/{id}")
//    public TradeDetailResponse TradeDetail(
//            @PathVariable Long id) {
//
//    }

}

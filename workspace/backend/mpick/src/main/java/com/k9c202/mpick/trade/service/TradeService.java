package com.k9c202.mpick.trade.service;

import com.k9c202.mpick.trade.controller.request.TradeQueryRequest;
import com.k9c202.mpick.trade.controller.request.TradeSearchRequest;
import com.k9c202.mpick.trade.controller.response.TradeSearchResponse;
import com.k9c202.mpick.trade.entity.Trade;
import com.k9c202.mpick.trade.repository.TradeQueryRepository;
import com.k9c202.mpick.trade.repository.TradeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.awt.print.Pageable;
import java.util.ArrayList;
import java.util.List;

@Transactional
@RequiredArgsConstructor
@Service
public class TradeService {

    @Autowired
    private final TradeQueryRepository tradeQueryRepository;
    private final TradeRepository tradeRepository;
    public List<TradeSearchResponse> tradeFilter(TradeSearchRequest request, Integer page, String keyword) {

        TradeQueryRequest queryRequest = request.toQueryRequest(keyword);

        List<TradeSearchResponse> result = tradeQueryRepository.tradeFilterContainer(queryRequest, page);

        return result;
    }

}

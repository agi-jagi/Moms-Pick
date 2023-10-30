package com.k9c202.mpick.trade.service;

import com.k9c202.mpick.trade.controller.request.TradeSearchRequest;
import com.k9c202.mpick.trade.controller.response.TradeSearchResponse;
import com.k9c202.mpick.trade.entity.Trade;
import com.k9c202.mpick.trade.repository.TradeQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Transactional
@RequiredArgsConstructor
@Service
public class TradeService {

    private final TradeQueryRepository tradeQueryRepository;

    public List<TradeSearchResponse> tradeSearch(TradeSearchRequest request) {

        List<TradeSearchResponse> result = new ArrayList<>();

        return result;
    }

}

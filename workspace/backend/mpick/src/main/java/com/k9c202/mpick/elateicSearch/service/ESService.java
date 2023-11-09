package com.k9c202.mpick.elateicSearch.service;

import com.k9c202.mpick.elateicSearch.entity.ESTrade;
import com.k9c202.mpick.elateicSearch.dto.ESTradeDto;
import com.k9c202.mpick.elateicSearch.repository.ESRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ESService {

    private final ESRepository esRepository;

    public String save(ESTradeDto esTradeDto){

        esRepository.save(esTradeDto.toEntity());
        return "success";
    }

    public List<ESTrade> loadAll(){

        return esRepository.findAll();
    }
}

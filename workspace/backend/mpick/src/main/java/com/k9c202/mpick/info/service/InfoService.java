package com.k9c202.mpick.info.service;

import com.k9c202.mpick.info.controller.request.LactationRoomRequest;
import com.k9c202.mpick.info.controller.response.LactationRoomResponse;
import com.k9c202.mpick.info.repository.LactationRoomQueryRepository;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class InfoService {

    private final LactationRoomQueryRepository lactationRoomQueryRepository;

    public List<LactationRoomResponse> lactationList(LactationRoomRequest request) {
        return lactationRoomQueryRepository.findLactationByLocation(request.getLatitude(), request.getLongitude());
    }
}

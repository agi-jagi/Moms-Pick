package com.k9c202.mpick.info.service;

import com.k9c202.mpick.info.controller.request.KindergartenInfoRequest;
import com.k9c202.mpick.info.controller.request.LactationRoomInfoRequest;
import com.k9c202.mpick.info.controller.response.KindergartenInfoResponse;
import com.k9c202.mpick.info.controller.response.LactationRoomInfoResponse;
import com.k9c202.mpick.info.repository.KindergartenQueryRepository;
import com.k9c202.mpick.info.repository.LactationRoomQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class InfoService {

    private final LactationRoomQueryRepository lactationRoomQueryRepository;

    private final KindergartenQueryRepository kindergartenQueryRepository;

    public List<LactationRoomInfoResponse> lactationList(LactationRoomInfoRequest request) {
        return lactationRoomQueryRepository.findLactationByLocation(request.getLatitude(), request.getLongitude());
    }

    public List<KindergartenInfoResponse> kinderList(KindergartenInfoRequest request) {

        return kindergartenQueryRepository.findKindergartenByLocation(request.getLatitude(), request.getLongitude());
    }
}

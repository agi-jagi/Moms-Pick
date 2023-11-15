package com.k9c202.mpick.info.service;

import com.k9c202.mpick.info.controller.component.BabyMealDetailDto;
import com.k9c202.mpick.info.controller.component.BabyMealInfoDto;
import com.k9c202.mpick.info.controller.component.PageCountDto;
import com.k9c202.mpick.info.controller.request.BabyMealInfoRequest;
import com.k9c202.mpick.info.controller.request.DayCareCenterInfoRequest;
import com.k9c202.mpick.info.controller.request.KindergartenInfoRequest;
import com.k9c202.mpick.info.controller.request.LactationRoomInfoRequest;
import com.k9c202.mpick.info.controller.response.*;
import com.k9c202.mpick.info.repository.BabyMealQueryRepository;
import com.k9c202.mpick.info.repository.DayCareCenterQueryRepository;
import com.k9c202.mpick.info.repository.KindergartenQueryRepository;
import com.k9c202.mpick.info.repository.LactationRoomQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class InfoService {

    private final LactationRoomQueryRepository lactationRoomQueryRepository;

    private final KindergartenQueryRepository kindergartenQueryRepository;

    private final DayCareCenterQueryRepository dayCareCenterQueryRepository;

    private final BabyMealQueryRepository babyMealQueryRepository;

    public List<LactationRoomInfoResponse> lactationList(BigDecimal latitude, BigDecimal longitude) {
        return lactationRoomQueryRepository.findLactationByLocation(latitude, longitude);
    }

    public List<KindergartenInfoResponse> kinderList(KindergartenInfoRequest request) {

        return kindergartenQueryRepository.findKindergartenByLocation(request.getLatitude(), request.getLongitude());
    }

    public List<DayCareCenterInfoResponse> dayCareList(DayCareCenterInfoRequest request) {

        return dayCareCenterQueryRepository.findDayCareCenterByLocation(request.getLatitude(), request.getLongitude());
    }

    public BabyMealInfoListResponse babyMealList(BabyMealInfoRequest request) {

        PageCountDto pageCount = babyMealQueryRepository.babyMealMaxPage(request.getSubMealCategory());

        List<BabyMealInfoDto> babyMealInfoDtos = babyMealQueryRepository.findBabyMealBySubCategory(request.getSubMealCategory(), request.getPage());

        BabyMealInfoListResponse result = BabyMealInfoListResponse.builder()
                .maxCount(pageCount.getMaxCount())
                .maxPage(pageCount.getMaxPage())
                .babyMealInfoDtoList(babyMealInfoDtos)
                .build();
        return result;
    }

    public BabyMealDetailInfoResponse babyMealDetail(Long id) {

        BabyMealDetailDto babyMealDetailDto =  babyMealQueryRepository.findOneById(id);

        return babyMealDetailDto.toBabyMealDeatailInfoResponse();
    }

}

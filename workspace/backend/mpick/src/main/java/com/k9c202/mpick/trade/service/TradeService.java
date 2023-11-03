package com.k9c202.mpick.trade.service;

import com.amazonaws.services.kms.model.NotFoundException;
import com.k9c202.mpick.global.function.CommonFunction;
import com.k9c202.mpick.trade.controller.component.ImageSaveForm;
import com.k9c202.mpick.trade.controller.request.TradeAddRequest;
import com.k9c202.mpick.trade.controller.request.TradeQueryRequest;
import com.k9c202.mpick.trade.controller.request.TradeSearchRequest;
import com.k9c202.mpick.trade.controller.response.TradeDetailResponse;
import com.k9c202.mpick.trade.controller.response.TradeSearchResponse;
import com.k9c202.mpick.trade.entity.*;
import com.k9c202.mpick.trade.repository.*;
import com.k9c202.mpick.trade.util.FileStoreUtil;
import com.k9c202.mpick.user.entity.User;
import com.k9c202.mpick.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class TradeService {

    private final TradeQueryRepository tradeQueryRepository;

    private final TradeRepository tradeRepository;

    private final UserRepository userRepository;

    private final CategoryQueryRepository categoryQueryRepository;

    private final TradeImageRepository tradeImageRepository;

    private final TradeMonthRepository tradeMonthRepository;

    private final BabyMonthRepository babyMonthRepository;

    private final S3Service s3Service;

    private final CommonFunction commonFunction;

    private final TradeImageQueryRepository tradeImageQueryRepository;

    private final WishQueryRepository wishQueryRepository;

    private final ViewRecordRepository viewRecordRepository;

    private final ViewRecordQueryRepository viewRecordQueryRepository;

    public List<TradeSearchResponse> tradeFilter(TradeSearchRequest request, Integer page, String keyword) {

        TradeQueryRequest queryRequest = request.toQueryRequest(keyword);

        List<TradeSearchResponse> result = tradeQueryRepository.tradeFilterContainer(queryRequest, page);

        return result;
    }


    // 주소 로직 추가해야함
    public Long tradeAdd(TradeAddRequest request, List<MultipartFile> multipartFiles, String loginId) throws IOException {

        Category category = categoryQueryRepository.findOne(request.getCategoryId());

        Trade trade = Trade.builder()
                .category(category)
                .price(request.getPrice())
                .user(commonFunction.loadUser(loginId))
                .title(request.getTitle())
                .tradeExplain(request.getTradeExplain())
                .tradeStatus(TradeStatus.ING)
                .addressId(request.getAddressId())
                .viewCount(0L)
                .wishCount(0L)
                .build();

        Long tradeId = tradeRepository.save(trade).getId();

        List<String> imageSaveUrls = new ArrayList<>();

        for (MultipartFile multipartFile : multipartFiles) {
            imageSaveUrls.add(
                    s3Service.upload(multipartFile, "static")
            );
        }

        Integer seq = 1;

        for (String imageSaveUrl : imageSaveUrls) {
            tradeImageRepository.save(
                    TradeImage.builder()
                            .trade(trade)
                            .saveFileName(imageSaveUrl)
                            .sequence(seq++)
                            .build()
            );
        }


        if (request.getStartMonths() != null) {
            for (Integer startMonth : request.getStartMonths()) {
                BabyMonth babyMonth = babyMonthRepository.findByStartMonth(startMonth);

                tradeMonthRepository.save(
                        TradeMonth.builder()
                                .trade(trade)
                                .babyMonth(babyMonth)
                                .build()
                );
            }
        }
        else {
            throw new IOException();
        }

        return tradeId;
    }

    public TradeDetailResponse tradeDetail(Long tradeId, String loginId, Long viewCount) {

        List<String> imageUrls = tradeImageQueryRepository.findTradeDetailImages(tradeId);

        Trade trade = tradeRepository.findById(tradeId).orElseThrow(() -> new NotFoundException("없는 판매글입니다."));

        User user = commonFunction.loadUser(loginId);
        //RatingRepository 추가되면 바꿀 것
        List<BigDecimal> userRatings = wishQueryRepository.findRatingByUserId(user.getId());

        BigDecimal userRating = BigDecimal.valueOf(0.0);


        if (userRatings.size() < 10) {
            userRating = BigDecimal.valueOf(-1.0);
        }
        else {
            for (BigDecimal rating : userRatings) {
                userRating.add(rating);
            }

            userRating.divide(new BigDecimal(userRatings.size()));
        }

        //주소 로직 추가 해야함
        return TradeDetailResponse.builder()
                .Address("탄지로")
                .nickname(commonFunction.loadUser(loginId).getNickname())
                .tradeStatus(trade.getTradeStatus())
                .price(trade.getPrice())
                .tradeExplain(trade.getTradeExplain())
                .tradeCreateDate(trade.getTradeCreateDate())
                .rating(userRating)
                .title(trade.getTitle())
                .viewCount(viewCount)
                .wishCount(trade.getWishCount())
                .tradeImages(imageUrls)
                .build();
    }

    public void addViewRecord(Long tradeId, String loginId) {

    }
    public Long increaseViewCount(Long tradeId, String loginId) {

        User user = commonFunction.loadUser(loginId);

        Trade trade = tradeRepository.findById(tradeId).orElseThrow(() -> new NotFoundException("없는 판매글입니다."));

        ViewRecordId viewRecordId = ViewRecordId.builder()
                .trade(trade)
                .user(user)
                .build();

        Long viewCount = viewRecordQueryRepository.getViewRecordCount(tradeId);

        if (!trade.getUser().equals(user)) {

            if (!viewRecordQueryRepository.existViewRecord(viewRecordId)) {
                viewRecordRepository.save(
                        ViewRecord.builder()
                                .viewRecordId(viewRecordId)
                                .build()
                );

            }
            else {
                return viewCount;
            }
        } else {
            return viewCount;
        }

        tradeQueryRepository.increaseViewCount(tradeId);

        return viewCount + 1;
    }

}

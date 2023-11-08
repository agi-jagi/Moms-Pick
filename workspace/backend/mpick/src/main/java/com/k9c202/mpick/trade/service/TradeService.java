package com.k9c202.mpick.trade.service;

import com.amazonaws.services.kms.model.NotFoundException;
import com.k9c202.mpick.global.function.CommonFunction;
import com.k9c202.mpick.trade.controller.component.ImageSaveForm;
import com.k9c202.mpick.trade.controller.component.MainCategoryDto;
import com.k9c202.mpick.trade.controller.component.TradeAddCategoryForm;
import com.k9c202.mpick.trade.controller.request.TradeAddRequest;
import com.k9c202.mpick.trade.controller.request.TradeQueryRequest;
import com.k9c202.mpick.trade.controller.request.TradeSearchRequest;
import com.k9c202.mpick.trade.controller.response.TradeDetailResponse;
import com.k9c202.mpick.trade.controller.response.TradeSearchResponse;
import com.k9c202.mpick.trade.entity.*;
import com.k9c202.mpick.trade.repository.*;
import com.k9c202.mpick.trade.util.FileStoreUtil;
import com.k9c202.mpick.user.entity.Address;
import com.k9c202.mpick.user.entity.User;
import com.k9c202.mpick.user.repository.AddressRepository;
import com.k9c202.mpick.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
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

    private final AddressRepository addressRepository;

    private final CategoryRepository categoryRepository;

    private final WishRepository wishRepository;

    private final TradeMonthQueryRepository tradeMonthQueryRepository;

    public List<TradeSearchResponse> tradeFilter(TradeSearchRequest request, Integer page, String keyword) {

        TradeQueryRequest queryRequest = request.toQueryRequest(keyword);

        List<TradeSearchResponse> result = tradeQueryRepository.tradeFilterContainer(queryRequest, page);

        return result;
    }


    // 주소 로직 추가해야함
    public Long tradeAdd(TradeAddRequest request, List<MultipartFile> multipartFiles, String loginId) throws IOException {

        Category category = categoryQueryRepository.findCategoryByMainCategoryNameAndSubCategoryName(request.getMainCategory(), request.getSubCategory());

        Address address = addressRepository.findByUserLoginIdAndIsSet(loginId, true)
                .orElseThrow(() -> new NotFoundException("찾을 수 없는 주소입니다."));

        List<String> imageSaveUrls = new ArrayList<>();


        for (MultipartFile multipartFile : multipartFiles) {
            imageSaveUrls.add(
                    s3Service.upload(multipartFile, "static")
            );
        }

        Trade trade = Trade.builder()
                .category(category)
                .price(request.getPrice())
                .user(commonFunction.loadUser(loginId))
                .title(request.getTitle())
                .tradeExplain(request.getTradeExplain())
                .tradeStatus(TradeStatus.판매중)
                .address(address)
                .viewCount(0L)
                .wishCount(0L)
                .thumbNailImage(imageSaveUrls.get(0))
                .build();

        Long tradeId = tradeRepository.save(trade).getId();

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


//        if (request.getStartMonths() != null) {
//            for (Integer startMonth : request.getStartMonths()) {
//                BabyMonth babyMonth = babyMonthRepository.findByStartMonth(startMonth)
//                        .orElseThrow(() -> new NotFoundException("해당 월령 카테고리는 존재하지 않습니다."));
//
//                tradeMonthRepository.save(
//                        TradeMonth.builder()
//                                .trade(trade)
//                                .babyMonth(babyMonth)
//                                .build()
//                );
//            }
//        }
//        else {
//            throw new IOException();
//        }

        for (Integer babyMonthId : request.getBabyMonthIds()) {
            BabyMonth babyMonth = babyMonthRepository.findById(babyMonthId).orElseThrow(() -> new NotFoundException("없는 월령입니다."));

            tradeMonthRepository.save(
                    TradeMonth.builder()
                            .trade(trade)
                            .babyMonth(babyMonth)
                            .build()
            );
        }

        return tradeId;
    }

    public TradeDetailResponse tradeDetail(Long tradeId, String loginId) {

        List<String> imageUrls = tradeImageQueryRepository.findTradeDetailImages(tradeId);

        Trade trade = tradeRepository.findById(tradeId).orElseThrow(() -> new NotFoundException("없는 판매글입니다."));

        User user = commonFunction.loadUser(loginId);

        List<BigDecimal> userRatings = wishQueryRepository.findRatingByUserId(user.getId());

        Long isExistWish = wishQueryRepository.existWish(user.getId(), tradeId);

        String subCategory = "";
        String mainCategory;

        if (trade.getCategory().getCategoryId2() == null) {
            mainCategory = trade.getCategory().getCategoryName();
        }
        else {
            subCategory = trade.getCategory().getCategoryName();

            mainCategory = categoryQueryRepository.findMainCategoryNameById(trade.getCategory().getCategoryId2());
        }

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

        String tradeBabyMonth;

        Integer startMonth = Integer.MAX_VALUE;

        Integer endMonth = Integer.MIN_VALUE;

        List<BabyMonth> babyMonthList = tradeMonthQueryRepository.findBabyMonthByTradeId(tradeId);

        for (BabyMonth babyMonth : babyMonthList) {
            Integer stMonth = babyMonth.getStartMonth();
            Integer edMonth = babyMonth.getEndMonth();

            if (stMonth < startMonth) {
                startMonth = stMonth;
            }

            if (edMonth > endMonth) {
                endMonth = edMonth;
            }
        }

        if (startMonth == -1) {
            tradeBabyMonth = "임산부";
        }
        else {
            tradeBabyMonth = startMonth.toString();

            if (endMonth == 37) {
                tradeBabyMonth += "개월 이상";
            }
            else {
                tradeBabyMonth += "~"+endMonth.toString() + " 개월";
            }
        }


        return TradeDetailResponse.builder()
                .Address(trade.getAddress().getAddressString())
                .nickname(commonFunction.loadUser(loginId).getNickname())
                .tradeStatus(trade.getTradeStatus())
                .price(trade.getPrice())
                .tradeExplain(trade.getTradeExplain())
                .tradeCreateDate(trade.getTradeCreateDate())
                .rating(userRating)
                .title(trade.getTitle())
                .viewCount(trade.getViewCount())
                .wishCount(trade.getWishCount())
                .tradeImages(imageUrls)
                .mainCategory(mainCategory)
                .subCategory(subCategory)
                .tradeBabyMonth(tradeBabyMonth)
                .isLiked(isExistWish.toString())
                .profile(user.getProfileImage())
                .build();
    }

    public void addViewRecord(Long tradeId, String loginId) {

    }
    public void increaseViewCount(Long tradeId, String loginId) {

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
                return;
            }
        } else {
            return;
        }

        trade.increaseViewCount();

        tradeRepository.save(trade);
//        tradeQueryRepository.increaseViewCount(tradeId);
    }

    public TradeAddCategoryForm getTradeAddCategoryForm() {

        List<MainCategoryDto> mainCategoryList = categoryQueryRepository.findMainCategoryNameAndId();

        TradeAddCategoryForm tradeAddCategoryForm = new TradeAddCategoryForm();

        for (MainCategoryDto mainCategory : mainCategoryList) {
            String newKey = mainCategory.getCategoryName();

            List<String> subCategoryNames = categoryQueryRepository.findSubCategoryNameByCategoryId(mainCategory.getCategoryId());

            tradeAddCategoryForm.putCategory(newKey, subCategoryNames);

        }

        return tradeAddCategoryForm;
    }

    public void tradeWish(Long tradeId, String loginId) {
        User user = userRepository.findOneByLoginId(loginId).orElseThrow(() -> new NotFoundException("없는 유저입니다."));

        Trade trade = tradeRepository.findById(tradeId).orElseThrow(() -> new NotFoundException("존재하지 않는 게시글입니다."));

        Wish wish = wishRepository.findByUserIdAndTradeId(user.getId(), trade.getId()).orElse(null);

        if (user.equals(trade.getUser())) {
            return;
        }

        if (wish == null) {

            wishRepository.save(
                    Wish.builder()
                            .trade(trade)
                            .user(user)
                            .build()
            );
            trade.increaseWishCount();

            tradeRepository.save(trade);
        } else {
            wishRepository.delete(wish);

            trade.decreaseWishCount();

            tradeRepository.save(trade);
        }
    }

    public void deleteTrade(Long tradeId, String loginId) {

        Trade trade = tradeRepository.findById(tradeId).orElseThrow(() -> new NotFoundException("없는 게시글 입니다."));

        User user = userRepository.findOneByLoginId(loginId).orElseThrow(() -> new NotFoundException("없는 유저입니다."));

        if (trade.getUser().equals(user)) {
            trade.tradeStatusDelete();
            tradeRepository.save(trade);
        }
    }
}

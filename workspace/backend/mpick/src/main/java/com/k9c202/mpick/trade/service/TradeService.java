package com.k9c202.mpick.trade.service;

import com.k9c202.mpick.trade.controller.component.ImageSaveForm;
import com.k9c202.mpick.trade.controller.request.TradeAddRequest;
import com.k9c202.mpick.trade.controller.request.TradeQueryRequest;
import com.k9c202.mpick.trade.controller.request.TradeSearchRequest;
import com.k9c202.mpick.trade.controller.response.TradeSearchResponse;
import com.k9c202.mpick.trade.entity.*;
import com.k9c202.mpick.trade.repository.*;
import com.k9c202.mpick.trade.util.FileStoreUtil;
import com.k9c202.mpick.user.entity.User;
import com.k9c202.mpick.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Transactional
@RequiredArgsConstructor
@Service
public class TradeService {

    @Autowired
    private final TradeQueryRepository tradeQueryRepository;

    @Autowired
    private final TradeRepository tradeRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final CategoryQueryRepository categoryQueryRepository;

    private final TradeImageRepository tradeImageRepository;

    private final TradeMonthRepository tradeMonthRepository;

    private final BabyMonthRepository babyMonthRepository;

    private final FileStoreUtil fileStoreUtil;

    public List<TradeSearchResponse> tradeFilter(TradeSearchRequest request, Integer page, String keyword) {

        TradeQueryRequest queryRequest = request.toQueryRequest(keyword);

        List<TradeSearchResponse> result = tradeQueryRepository.tradeFilterContainer(queryRequest, page);

        return result;
    }

    public Long tradeAdd(TradeAddRequest request, List<MultipartFile> multipartFiles) {

        Optional<User> userOptional = userRepository.findOneByLoginId(request.getLoginId());

        User user = userOptional.orElseThrow(() -> new NoSuchElementException("User not found"));

        Category category = categoryQueryRepository.findOne(request.getCategoryId());

        Trade trade = Trade.builder()
                .category(category)
                .price(request.getPrice())
                .user(user)
                .title(request.getTitle())
                .tradeExplain(request.getTradeExplain())
                .tradeStatus(TradeStatus.ING)
                .addressId(request.getAddressId())
                .viewCount(0)
                .wishCount(0)
                .build();

        Long tradeId = tradeRepository.save(trade).getId();

        List<ImageSaveForm> imageSaveForms = new ArrayList<>();

        imageSaveForms = fileStoreUtil.uploadFiles("tradeImg", multipartFiles);

        for (ImageSaveForm imageSaveForm : imageSaveForms) {
            tradeImageRepository.save(
                    TradeImage.builder()
                            .trade(trade)
                            .uploadFileName(imageSaveForm.getUploadFileName())
                            .saveFileName(imageSaveForm.getSaveFileName())
                            .sequence(imageSaveForm.getSequence())
                            .build()
            );
        }

        for (Integer startMonth : request.getStartMonths()) {
            BabyMonth babyMonth = babyMonthRepository.findByStartMonth(startMonth);

            tradeMonthRepository.save(
                    TradeMonth.builder()
                            .trade(trade)
                            .babyMonth(babyMonth)
                            .build()
            );
        }


        return tradeId;
    }

}

package com.k9c202.mpick.baby.service;

import com.amazonaws.services.kms.model.NotFoundException;
import com.k9c202.mpick.baby.dto.BabyDto;
import com.k9c202.mpick.baby.entity.Baby;
import com.k9c202.mpick.baby.repository.BabyDSLRepository;
import com.k9c202.mpick.baby.repository.BabyRepository;
import com.k9c202.mpick.global.function.CommonFunction;
import com.k9c202.mpick.global.response.CommonResponse;
import com.k9c202.mpick.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BabyServiceImpl implements BabyService{

    private final BabyRepository babyRepository;
    private final CommonFunction commonFunction;
    private final BabyDSLRepository babyDSLRepository;
    @Override
    public String add(BabyDto babyDto, String userName) {

        User user = commonFunction.loadUser(userName);
        Optional<Integer> count = babyRepository.countByUserIdAndStatus(user.getId(),"exist");
        System.out.println(count.get());
        if(count.get()<5){
            Baby baby = babyDto.toEntity(user);

            baby.setStatus("exist");
            babyRepository.save(baby);

            return "success";
        }else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"아이 5명 초과");
        }
    }

    @Override
    public String delete(Long babyId, String userName) {

        Optional<Baby> baby = babyRepository.findById(babyId);
        if(baby.isPresent() && baby.get().getUser().getLoginId().equals(userName)){
            baby.get().setStatus("delete");
            babyRepository.save(baby.get());
            return "success";
        }else{
            return "fail";
        }

    }

    @Override
    public String modify(BabyDto babyDto, String userName) {
        Baby baby = babyRepository.findById(babyDto.getBabyId())
                .orElseThrow(() -> new NotFoundException("실패했습니다."));

        if (!baby.getUser().getLoginId().equals(userName)){
            return "유효하지 않은 접근";
        }
        baby.setBabyBirth(babyDto.getBabyBirth());
        baby.setBabyName(babyDto.getBabyName());
        baby.setBabyGender(babyDto.getBabyGender());
        baby.setBabyOrder(babyDto.getBabyOrder());
        babyRepository.save(baby);
        return "success";
    }

    @Override
    public List<BabyDto> loadBaby(String userName) {

        List<BabyDto> result = new ArrayList<>();
        List<Baby> baby = babyDSLRepository
                .loadBaby(commonFunction.loadUser(userName).getId());

        for(int i=0;i<baby.size();i++){
            result.add(baby.get(i).toBabyDto());
        }

        return result;
    }


}

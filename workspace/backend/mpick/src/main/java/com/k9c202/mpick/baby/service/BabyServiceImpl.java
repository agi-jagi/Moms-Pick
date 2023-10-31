package com.k9c202.mpick.baby.service;

import com.k9c202.mpick.baby.dto.BabyDto;
import com.k9c202.mpick.baby.dto.request.BabyRequestDto;
import com.k9c202.mpick.baby.entity.Baby;
import com.k9c202.mpick.baby.repository.BabyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class BabyServiceImpl implements BabyService{

    private final BabyRepository babyRepository;
    @Override
    public String add(BabyDto babyDto) {
        Baby baby = babyDto.toEntity();
        babyRepository.save(baby);
        return "success";
    }

    @Override
    public BabyDto delete(int babyId) {
        return null;
    }

    @Override
    public BabyDto modify(BabyRequestDto babyRequestDto) {
        return null;
    }
}

package com.k9c202.mpick.baby.service;

import com.k9c202.mpick.baby.dto.BabyDto;
import com.k9c202.mpick.baby.dto.request.BabyRequestDto;
import com.k9c202.mpick.baby.entity.Baby;

import java.util.List;
import java.util.Optional;

public interface BabyService {
    String add(BabyDto babyDto, String userName);
    String delete(Long babyId, String userName);
    String modify(BabyDto babyDto, String userName);

    List<BabyDto> loadBaby(String userName);

}

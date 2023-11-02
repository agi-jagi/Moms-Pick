package com.k9c202.mpick.baby.service;

import com.k9c202.mpick.baby.dto.BabyDto;
import com.k9c202.mpick.baby.dto.request.BabyRequestDto;

import java.util.Optional;

public interface BabyService {
    String add(BabyDto babyDto, String userName);
    BabyDto delete(int babyId);
    BabyDto modify(BabyRequestDto babyRequestDto);
}

package com.k9c202.mpick.baby.service;

import com.k9c202.mpick.baby.dto.BabyDto;
import com.k9c202.mpick.baby.dto.request.BabyRequestDto;
import com.k9c202.mpick.baby.entity.Baby;
import com.k9c202.mpick.baby.repository.BabyRepository;
import com.k9c202.mpick.global.function.CommonFunction;
import com.k9c202.mpick.user.entity.User;
import com.k9c202.mpick.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BabyServiceImpl implements BabyService{

    private final BabyRepository babyRepository;
    private final CommonFunction commonFunction;
    private final RedisTemplate<String, Object> redisTemplate;
    @Override
    public String add(BabyDto babyDto, String userName) {

        Baby baby = babyDto.toEntity(commonFunction.loadUser(userName));
        
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

    @Override
    public String test() {
        System.out.println("2222");
        ValueOperations<String, Object> values = redisTemplate.opsForValue();
        System.out.println("3333");
        values.set("testKey", "test");
        System.out.println("4444");
        return (String) values.get("testKey");
    }
}

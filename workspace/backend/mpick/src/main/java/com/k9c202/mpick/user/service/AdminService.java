package com.k9c202.mpick.user.service;

import com.k9c202.mpick.user.controller.request.UpdateStatusRequest;
import com.k9c202.mpick.user.entity.User;
import com.k9c202.mpick.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;

    public void changeStatus(UpdateStatusRequest updateStatusRequest) {
        User user = userRepository.findOneByLoginId(updateStatusRequest.getLoginId()).orElseThrow();
        user.editStatus(updateStatusRequest.getUserStatus());
    }
}

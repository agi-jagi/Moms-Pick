package com.k9c202.mpick.global.function;

import com.k9c202.mpick.user.entity.User;
import com.k9c202.mpick.user.repository.UserRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.NoSuchElementException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class CommonFunction {

    private final UserRepository userRepository;
    public User loadUser(String loginId){
        Optional<User> userOptional = userRepository.findOneByLoginId(loginId);
        return userOptional.orElseThrow(() -> new NoSuchElementException("User not found"));
    }
}

package com.k9c202.mpick.babyTest;

import com.k9c202.mpick.baby.entity.Baby;
import com.k9c202.mpick.baby.repository.BabyDSLRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class BabyTest {

   @Autowired
    BabyDSLRepository babyDSLRepository;

    //dsl 테스트를 위한 목록 불러오기
    @Test
    void loadBabyList(){
        System.out.println("11");
        List<Baby> result = babyDSLRepository.loadBaby();
        System.out.println("22");
        System.out.println(result);
        //assertEquals(null,result);

    }
}

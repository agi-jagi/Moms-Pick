package com.k9c202.mpick.esTest;

import com.k9c202.mpick.elateicSearch.entity.ESTrade;
import com.k9c202.mpick.elateicSearch.repository.ESRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.awt.*;

@SpringBootTest
public class ESTest {
    private final ESRepository esRepository;

    @Autowired
    public ESTest(ESRepository esRepository) {
        this.esRepository = esRepository;
    }
    @Test
    void esTest(){
        ESTrade esTrade = ESTrade.builder()
                .id(1L)
                .title("무역 상품 제목")
                .img("image_url.jpg")
                .price("10000")
                .mainCategory("전자제품")
                .subCategory("휴대폰")
                .location(new Point(37, 127)) // X, Y 좌표 예시
                .build();

        System.out.println(esRepository.save(esTrade));
    }
}

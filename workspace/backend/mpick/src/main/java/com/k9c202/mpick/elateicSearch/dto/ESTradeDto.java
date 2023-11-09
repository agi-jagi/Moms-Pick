package com.k9c202.mpick.elateicSearch.dto;

import com.k9c202.mpick.elateicSearch.entity.ESTrade;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.elasticsearch.common.geo.GeoPoint;


@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class ESTradeDto {

        private Long id;

        private String title;

        private String img;

        private String price;

        private String mainCategory;

        private String subCategory;

        private String tradeMonth;

        private String status;

        private GeoPoint location;

        public ESTrade toEntity(){
            return ESTrade.builder()
                    .id(id)
                    .title(title)
                    .img(img)
                    .price(price)
                    .mainCategory(mainCategory)
                    .subCategory(subCategory)
                    .tradeMonth(tradeMonth)
                    .status(status)
                    .location(location) // X, Y 좌표 예시
                    .build();
        }

}

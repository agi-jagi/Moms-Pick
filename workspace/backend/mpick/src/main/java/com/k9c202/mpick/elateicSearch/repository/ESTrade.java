package com.k9c202.mpick.elateicSearch.repository;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.Setting;

import javax.persistence.Id;

@Document(indexName = "trade")
@Setting(settingPath = "../esJson/trade-setting.json")
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Data
public class ESTrade {

    @Id
    @Field(type = FieldType.Keyword)
    private Long id;

    @Field(type = FieldType.Text)
    private String title;

    @Field(type = FieldType.Keyword)
    private String img;

    @Field(type = FieldType.Keyword)
    private String price;

    @Field(type = FieldType.Keyword)
    private String latitude  ;

    @Field(type = FieldType.Keyword)
    private String longitude;


    /*
    이미지
    가격
    판매자 닉네임
    대분류

    */

}

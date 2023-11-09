package com.k9c202.mpick.elateicSearch.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.elasticsearch.common.geo.GeoPoint;
import org.springframework.data.elasticsearch.annotations.*;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

import javax.persistence.Id;
import java.awt.*;

@Document(indexName = "mpick")
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Setting(settingPath = "elastic/trade-setting.json")
@Mapping(mappingPath = "elastic/trade-mapping.json")
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

    @Field(type = FieldType.Text)
    private String mainCategory;

    @Field(type = FieldType.Text)
    private String subCategory;

    @Field(type = FieldType.Keyword)
    private String tradeMonth;

    @Field(type = FieldType.Keyword)
    private String status;

    private GeoPoint location;



}

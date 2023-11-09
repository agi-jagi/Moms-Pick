package com.k9c202.mpick.elateicSearch.repository;

import com.k9c202.mpick.elateicSearch.entity.ESTrade;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.client.ElasticsearchClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.List;


public interface ESRepository extends ElasticsearchRepository<ESTrade,Long>{

    List<ESTrade> findAll();

}

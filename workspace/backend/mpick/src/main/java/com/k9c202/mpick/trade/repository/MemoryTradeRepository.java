package com.k9c202.mpick.trade.repository;

import com.k9c202.mpick.trade.entity.Trade;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public class MemoryTradeRepository implements TradeRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public void save(Trade trade) {
        em.persist(trade);
    }

    @Override
    public Trade findOne(UUID id) {
        return em.find(Trade.class, id);
    }

    @Override
    public List<Trade> findAll() {
        return em.createQuery("select t from Trade t", Trade.class)
                .getResultList();
    }


    @Override
    public List<Trade> findByTitle(String title) {
        return em.createQuery("select t from Trade t where t.title = :title", Trade.class)
                .setParameter("title", title)
                .getResultList();
    }
}

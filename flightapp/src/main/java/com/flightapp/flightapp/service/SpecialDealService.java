package com.flightapp.flightapp.service;

import com.flightapp.flightapp.model.SpecialDeal;
import com.flightapp.flightapp.repository.SpecialDealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SpecialDealService {

    @Autowired
    private SpecialDealRepository repo;

    public List<SpecialDeal> getActiveDeals() {
        return repo.findByExpiryTimeAfter(LocalDateTime.now());
    }

    public SpecialDeal createDeal(SpecialDeal deal) {
        return repo.save(deal);
    }

    public SpecialDeal updateDeal(Long id, SpecialDeal newDeal) {
        SpecialDeal deal = repo.findById(id).orElseThrow();

        deal.setDepartureCity(newDeal.getDepartureCity());
        deal.setArrivalCity(newDeal.getArrivalCity());
        deal.setPrice(newDeal.getPrice());
        deal.setExpiryTime(newDeal.getExpiryTime());

        return repo.save(deal);
    }

    public void deleteDeal(Long id) {
        repo.deleteById(id);
    }
}
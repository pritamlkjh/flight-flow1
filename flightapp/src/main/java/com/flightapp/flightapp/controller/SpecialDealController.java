package com.flightapp.flightapp.controller;

import com.flightapp.flightapp.model.SpecialDeal;
import com.flightapp.flightapp.service.SpecialDealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/deals")
@CrossOrigin
public class SpecialDealController {

    @Autowired
    private SpecialDealService service;

    @GetMapping
    public List<SpecialDeal> getDeals() {
        return service.getActiveDeals();
    }

    @PostMapping
    public SpecialDeal create(@RequestBody SpecialDeal deal) {
        return service.createDeal(deal);
    }

    @PutMapping("/{id}")
    public SpecialDeal update(@PathVariable Long id, @RequestBody SpecialDeal deal) {
        return service.updateDeal(id, deal);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteDeal(id);
    }
}
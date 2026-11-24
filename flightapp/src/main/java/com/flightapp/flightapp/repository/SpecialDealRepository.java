package com.flightapp.flightapp.repository;

import com.flightapp.flightapp.model.SpecialDeal;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface SpecialDealRepository extends JpaRepository<SpecialDeal, Long> {
    List<SpecialDeal> findByExpiryTimeAfter(LocalDateTime now);
}
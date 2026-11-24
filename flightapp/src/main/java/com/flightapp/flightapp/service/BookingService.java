package com.flightapp.flightapp.service;

import com.flightapp.flightapp.model.Booking;
import com.flightapp.flightapp.model.SpecialDeal;
import com.flightapp.flightapp.repository.BookingRepository;
import com.flightapp.flightapp.repository.SpecialDealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepo;

    @Autowired
    private SpecialDealRepository dealRepo;

    public Booking bookFlight(Long dealId, String phoneNumber) {

        SpecialDeal deal = dealRepo.findById(dealId).orElseThrow();

        if (deal.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Deal expired!");
        }

        Booking booking = new Booking();
        booking.setDeal(deal);
        booking.setPhoneNumber(phoneNumber);
        booking.setBookingTime(LocalDateTime.now());

        return bookingRepo.save(booking);
    }

    public List<Booking> getBookingsByPhone(String phone) {
        return bookingRepo.findByPhoneNumberOrderByBookingTimeDesc(phone);
    }
}
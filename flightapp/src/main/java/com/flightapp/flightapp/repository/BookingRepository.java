package com.flightapp.flightapp.repository;

import com.flightapp.flightapp.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByPhoneNumberOrderByBookingTimeDesc(String phoneNumber);
}
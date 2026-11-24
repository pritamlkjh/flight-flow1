package com.flightapp.flightapp.controller;

import com.flightapp.flightapp.model.Booking;
import com.flightapp.flightapp.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booking")
@CrossOrigin
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/{dealId}")
    public Booking book(@PathVariable Long dealId,
                        @RequestParam String phone) {
        return bookingService.bookFlight(dealId, phone);
    }

    @GetMapping("/phone/{phone}")
    public List<Booking> getBookings(@PathVariable String phone) {
        return bookingService.getBookingsByPhone(phone);
    }

    @GetMapping
    public List<Booking> getBookingsByPhone(@RequestParam String phone) {
        return bookingService.getBookingsByPhone(phone);
    }
}
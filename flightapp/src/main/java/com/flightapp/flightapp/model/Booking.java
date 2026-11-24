package com.flightapp.flightapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String phoneNumber;
    private LocalDateTime bookingTime;

    @ManyToOne
    @JoinColumn(name = "deal_id")
    private SpecialDeal deal;

    // Getters and Setters
    public Long getId() { return id; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public LocalDateTime getBookingTime() { return bookingTime; }
    public void setBookingTime(LocalDateTime bookingTime) { this.bookingTime = bookingTime; }

    public SpecialDeal getDeal() { return deal; }
    public void setDeal(SpecialDeal deal) { this.deal = deal; }
}
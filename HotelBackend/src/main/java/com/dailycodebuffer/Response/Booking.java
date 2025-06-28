package com.dailycodebuffer.Response;

import com.dailycodebuffer.Model.BookingSeat;
import com.dailycodebuffer.Model.Seat;
import com.dailycodebuffer.Model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Booking {
    @Id
    @GeneratedValue
    private Long id;

    private String bookingReference;
    private LocalDateTime bookedAt;
    private String phoneNumber;
    private String emailId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "flight_id")
    @JsonIgnore
    private Flight flight;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Seat> seats = new ArrayList<>();
}

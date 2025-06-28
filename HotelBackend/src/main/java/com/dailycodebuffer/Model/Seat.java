package com.dailycodebuffer.Model;

import com.dailycodebuffer.Response.Booking;
import com.dailycodebuffer.Response.Flight;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class Seat {
    @Id
    @GeneratedValue
    private Long id;

    private String seatNumber;
    private String seatClass;
    private String seatType;
    private Long   seatPrice;
    private String seatStatus;
    private Boolean extraLegroom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id")
    @JsonBackReference
    private Booking booking;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "row_id")
    @JsonBackReference
    private Row row;

    @Override
    public String toString() {
        return "Seat{" +
                "seatNumber='" + seatNumber + '\'' +
                ", seatType='" + seatType + '\'' +
                ", seatClass='" + seatClass + '\'' +
                ", seatPrice=" + seatPrice +
                ", seatStatus='" + seatStatus + '\'' +
                ", extraLegroom=" + extraLegroom +
                ", bookingId=" + (booking != null ? booking.getId() : "null") +
                ", rowId=" + (row != null ? row.getId() : "null") +
                '}';
    }
}


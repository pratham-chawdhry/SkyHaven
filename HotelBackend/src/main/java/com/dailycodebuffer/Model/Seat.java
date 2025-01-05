package com.dailycodebuffer.Model;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Seat {
    private String seatType;
    private Long seatPrice;
    private String seatStatus;
    private String seatClass;
    private String seatNumber;
    private String food;
    private Boolean extraLegroom;
}

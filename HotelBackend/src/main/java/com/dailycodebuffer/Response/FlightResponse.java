package com.dailycodebuffer.Response;

import com.dailycodebuffer.Request.Flight;
import jakarta.persistence.Entity;
import lombok.Data;

import java.util.List;

@Data
public class FlightResponse {
    private List<Flight> flights;
}

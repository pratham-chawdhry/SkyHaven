package com.dailycodebuffer.Request;

import com.dailycodebuffer.Model.Airline;
import com.dailycodebuffer.Model.Row;
import com.dailycodebuffer.Response.FlightCabin;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class FlightRequest{
    @Id
    @GeneratedValue
    private Long id;

    private String terminalArrival;
    private String airportArrival;
    private String terminalDeparture;
    private String airportDeparture;

    private LocalDateTime arrivalTime;
    private LocalDateTime departureTime;
    private String flightNumber;
    private String aircraftModel;

    private List<FlightCabinRequest> flightCabins = new ArrayList<>();
}

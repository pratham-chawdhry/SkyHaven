package com.dailycodebuffer.Response;

import com.dailycodebuffer.Model.Airline;
import com.dailycodebuffer.Request.Airport;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FlightSummaryResponse {
    private Long id;

    private Integer firstClassPrice;
    private Integer businessClassPrice;
    private Integer economyClassPrice;
    private Integer premiumEconomyClassPrice;

    private String flightNumber;
    private String aircraftModel;

    private LocalDateTime arrivalTime;
    private LocalDateTime departureTime;

    private Terminal terminalArrival;
    private Airport airportArrival;
    private Terminal terminalDeparture;
    private Airport airportDeparture;

    private String airlineName;
}

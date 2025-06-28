package com.dailycodebuffer.Repository;

import com.dailycodebuffer.Request.Airport;
import com.dailycodebuffer.Response.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FlightRepo extends JpaRepository<Flight, Long> {
    List<Flight> findByAirportArrivalAndAirportDeparture(Airport airportArrival, Airport airportDeparture);

    List<Flight> findByAirportArrivalAndAirportDepartureAndArrivalTimeBetween(Airport airportArrival, Airport airportDeparture, LocalDateTime startOfDay, LocalDateTime endOfDay);
}
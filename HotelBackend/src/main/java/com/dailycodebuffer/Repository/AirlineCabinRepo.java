package com.dailycodebuffer.Repository;

import com.dailycodebuffer.Model.Airline;
import com.dailycodebuffer.Response.AirlineCabin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AirlineCabinRepo extends JpaRepository<AirlineCabin, Long> {
    public AirlineCabin findByAirlineAndId(Airline airline, Long cabinId);

    public AirlineCabin[] findByAirline(Airline airline);
}

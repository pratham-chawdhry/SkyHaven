package com.dailycodebuffer.Repository;

import com.dailycodebuffer.Request.Airport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AirportRepo extends JpaRepository<Airport,Long> {
    public Airport findByIataCode(String iataCode);
}

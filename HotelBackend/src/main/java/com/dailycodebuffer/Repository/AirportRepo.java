package com.dailycodebuffer.Repository;

import com.dailycodebuffer.Request.Airport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AirportRepo extends JpaRepository<Airport,Long> {
    public Optional<Airport> findByIataCode(String iataCode);
}

package com.dailycodebuffer.Repository;

import com.dailycodebuffer.Model.Airline;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AirlineRepo extends JpaRepository<Airline, Long> {
    public Airline findByAirlineCode(String airlineCode);
}

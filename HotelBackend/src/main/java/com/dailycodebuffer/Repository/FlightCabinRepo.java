package com.dailycodebuffer.Repository;

import com.dailycodebuffer.Response.FlightCabin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlightCabinRepo extends JpaRepository<FlightCabin, Long> {
}

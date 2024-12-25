package com.dailycodebuffer.Repository;

import com.dailycodebuffer.Model.Row;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlightRowRepo extends JpaRepository<Row, Long> {
    List<Row> findByFlightId(Long flightId);
}

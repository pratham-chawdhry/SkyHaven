package com.dailycodebuffer.Repository;

import com.dailycodebuffer.Model.Row;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlightRowRepo extends JpaRepository<Row, Long> {
    List<Row> findByFlightId(Long flightId);
}

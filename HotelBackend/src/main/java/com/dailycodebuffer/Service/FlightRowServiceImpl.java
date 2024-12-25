package com.dailycodebuffer.Service;

import com.dailycodebuffer.Model.Row;
import com.dailycodebuffer.Repository.FlightRowRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FlightRowServiceImpl implements FlightRowService {

    @Autowired
    private FlightRowRepo flightRowRepo;

    public List<Row> getRowsByFlightId(Long flightId) {
        List<Row> flight_rows = new ArrayList<>();
        flightRowRepo.findByFlightId(flightId).forEach(flight_rows::add);
        return flight_rows;
    }
}

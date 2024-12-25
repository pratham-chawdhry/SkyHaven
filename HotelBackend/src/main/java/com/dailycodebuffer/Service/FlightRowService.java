package com.dailycodebuffer.Service;

import com.dailycodebuffer.Model.Row;

import java.util.List;

public interface FlightRowService {
    public List<Row> getRowsByFlightId(Long flightId);
}

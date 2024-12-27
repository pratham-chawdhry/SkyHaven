package com.dailycodebuffer.Service;

import com.dailycodebuffer.Request.Airport;

public interface AirportService {
    public Airport getAirportByIata(String iataCode);
}

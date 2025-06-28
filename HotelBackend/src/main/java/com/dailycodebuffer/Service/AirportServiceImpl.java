package com.dailycodebuffer.Service;

import com.dailycodebuffer.Repository.AirportRepo;
import com.dailycodebuffer.Request.Airport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AirportServiceImpl implements AirportService {

    @Autowired
    private AirportRepo airportRepo;

    public Airport getAirportByIata(String iataCode) {
        return airportRepo.findByIataCode(iataCode)
                .orElse(null);
    }
}

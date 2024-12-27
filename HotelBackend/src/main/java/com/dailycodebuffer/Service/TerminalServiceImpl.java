package com.dailycodebuffer.Service;

import com.dailycodebuffer.Repository.TerminalRepo;
import com.dailycodebuffer.Request.Airport;
import com.dailycodebuffer.Request.TerminalRequest;
import com.dailycodebuffer.Response.Terminal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TerminalServiceImpl implements TerminalService {

    @Autowired
    private TerminalRepo terminalRepository;

    @Autowired
    private AirportService airportService;

    public Terminal getTerminalByIataCodeAndTerminalName(String iataCode, String terminalName){
//        System.out.println("Iata Code: " + iataCode);
//        System.out.println("Terminal Name: " + terminalName);

        Airport airport = airportService.getAirportByIata(iataCode);

        return terminalRepository.findByAirportAndTerminalName(airport, terminalName);
    }
}

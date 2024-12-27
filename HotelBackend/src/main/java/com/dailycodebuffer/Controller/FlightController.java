package com.dailycodebuffer.Controller;

import com.dailycodebuffer.Model.Airline;
import com.dailycodebuffer.Model.Row;
import com.dailycodebuffer.Model.Seat;
import com.dailycodebuffer.Repository.AircraftModelRepo;
import com.dailycodebuffer.Request.*;
import com.dailycodebuffer.Response.Flight;
import com.dailycodebuffer.Model.User;
import com.dailycodebuffer.Repository.FlightRepo;
import com.dailycodebuffer.Response.DefaultResponse;
import com.dailycodebuffer.Response.FlightCabin;
import com.dailycodebuffer.Response.Terminal;
import com.dailycodebuffer.Service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class FlightController {

    @Autowired
    private UserService userService;

    @Autowired
    private FlightRepo flightRepository;

    @Autowired
    private AircraftModelService aircraftModelService;

    @Autowired
    private AircraftModelRepo aircraftModelRepo;

    @Autowired
    private FlightRowService flightRowService;

    @Autowired
    private AirportService airportService;

    @Autowired
    private TerminalService terminalService;

    private DefaultResponse messageMaker(String message, HttpStatus status, int statusCode) {
        DefaultResponse response = new DefaultResponse();
        response.setMessage(message);
        response.setStatus(String.valueOf(status));
        response.setStatusCode(statusCode);
        return response;
    }

    private List<Row> flightSeats(List<Long> seats, Flight flight) {
        List<Row> rows = new ArrayList<>();

        for (int i = 0; i < seats.size(); i++) {
            Row row = new Row();
            row.setFlight(flight);
            row.setSeatRowNumber((long) i + 1);

            List<Seat> seatsList = new ArrayList<>();

            for (int j = 0; j < seats.get(i); j++) {
                Seat seat = new Seat();
                seat.setSeatNumber(row.getSeatRowNumber() + String.valueOf((char) (j + 65)));
                seat.setSeatStatus("AVAILABLE");
                seat.setSeatType("ECONOMY");
                seat.setSeatPrice(100L);
                seat.setSeatClass("AISLE");
                seat.setFood("NONE");

                seatsList.add(seat);
            }

            row.setSeats(seatsList);
            rows.add(row);
        }

        return rows;
    }

    @PostMapping("/addflight")
    public ResponseEntity<?> addFlight(@RequestHeader("Authorization") String jwt, @RequestBody FlightRequest flightRequest) {
        try {
            User user = userService.FindUserByJwt(jwt);

            if (user.getRole().toString().equals("ROLE_AIRLINE")) {
                Flight flight = new Flight();
                flight.setFlightNumber(flightRequest.getFlightNumber());
                flight.setArrivalTime(flightRequest.getArrivalTime());
                flight.setDepartureTime(flightRequest.getDepartureTime());
                flight.setFlightNumber(flightRequest.getFlightNumber());
                flight.setAircraftModel(flightRequest.getAircraftModel());


                Airline airline = user.getAirline();
                AircraftModel aircraftModel = aircraftModelService.getAircraftModelByName(flight.getAircraftModel());
                if (aircraftModel == null) {
                    DefaultResponse response = messageMaker("Aircraft model not found", HttpStatus.BAD_REQUEST, 400);
                    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
                }

                List<FlightCabin> flightCabins = new ArrayList<>();

                for (FlightCabinRequest flightCabinRequest : flightRequest.getFlightCabins()) {
                    FlightCabin flightCabin = getFlightCabin(flightCabinRequest, airline);

                    flightCabins.add(flightCabin);
                }

                flight.setFlightCabins(flightCabins);

                Airport airportArrival = airportService.getAirportByIata(flightRequest.getAirportArrival());

                if (airportArrival == null) {
                    DefaultResponse response = messageMaker("Airport arrival not found", HttpStatus.BAD_REQUEST, 400);
                    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
                }

                Airport airportDeparture = airportService.getAirportByIata(flightRequest.getAirportDeparture());

                if (airportDeparture == null) {
                    DefaultResponse response = messageMaker("Airport departure not found", HttpStatus.BAD_REQUEST, 400);
                    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
                }

                Terminal terminalArrival = terminalService.getTerminalByIataCodeAndTerminalName(flightRequest.getAirportArrival(), flightRequest.getTerminalArrival());

                if (terminalArrival == null) {
                    DefaultResponse response = messageMaker("Terminal arrival not found", HttpStatus.BAD_REQUEST, 400);
                    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
                }
                Terminal terminalDeparture = terminalService.getTerminalByIataCodeAndTerminalName(flightRequest.getAirportDeparture(), flightRequest.getTerminalArrival());

                if (terminalDeparture == null) {
                    DefaultResponse response = messageMaker("Terminal departure not found", HttpStatus.BAD_REQUEST, 400);
                    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
                }

                List<Row> rows = flightSeats(aircraftModel.getSeats(), flight);

                flight.setTerminalArrival(terminalArrival);
                flight.setTerminalDeparture(terminalDeparture);
                flight.setAirportArrival(airportArrival);
                flight.setAirportDeparture(airportDeparture);
                flight.setAirline(airline);

                flight.setRows(rows);
                flightRepository.save(flight);

                DefaultResponse response = messageMaker("Flight added", HttpStatus.OK, 200);
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
            else {
                DefaultResponse response = messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401);
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }
        }
        catch(Exception e) {
            DefaultResponse response = messageMaker(e.getMessage(), HttpStatus.BAD_REQUEST, 400);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/addflights")
    public ResponseEntity<?> addFlights(@RequestHeader("Authorization") String jwt, @RequestBody FlightRequest[] flightsRequest) {
        try {
            User user = userService.FindUserByJwt(jwt);

            if (user.getRole().toString().equals("ROLE_AIRLINE")) {
                Airline airline = user.getAirline();
                for (FlightRequest flightRequest : flightsRequest) {
                    Flight flight = new Flight();
                    flight.setFlightNumber(flightRequest.getFlightNumber());
                    flight.setArrivalTime(flightRequest.getArrivalTime());
                    flight.setDepartureTime(flightRequest.getDepartureTime());
                    flight.setFlightNumber(flightRequest.getFlightNumber());
                    flight.setAircraftModel(flightRequest.getAircraftModel());

                    List<FlightCabin> flightCabins = new ArrayList<>();

                    for (FlightCabinRequest flightCabinRequest : flightRequest.getFlightCabins()) {
                        FlightCabin flightCabin = getFlightCabin(flightCabinRequest, airline);

                        flightCabins.add(flightCabin);
                    }

                    flight.setFlightCabins(flightCabins);

                    AircraftModel aircraftModel = aircraftModelService.getAircraftModelByName(flight.getAircraftModel());
                    if (aircraftModel == null) {
                        DefaultResponse response = messageMaker("Aircraft model not found for" + String.valueOf(flight.getFlightNumber()), HttpStatus.BAD_REQUEST, 400);
                        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
                    }

                    Airport airportArrival = airportService.getAirportByIata(flightRequest.getAirportArrival());

                    if (airportArrival == null) {
                        DefaultResponse response = messageMaker("Airport arrival not found for" + String.valueOf(flight.getFlightNumber()), HttpStatus.BAD_REQUEST, 400);
                        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
                    }

                    Airport airportDeparture = airportService.getAirportByIata(flightRequest.getAirportDeparture());

                    if (airportDeparture == null) {
                        DefaultResponse response = messageMaker("Airport departure not found" + String.valueOf(flight.getFlightNumber()), HttpStatus.BAD_REQUEST, 400);
                        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
                    }

                    Terminal terminalArrival = terminalService.getTerminalByIataCodeAndTerminalName(flightRequest.getAirportArrival(), flightRequest.getTerminalArrival());
                    Terminal terminalDeparture = terminalService.getTerminalByIataCodeAndTerminalName(flightRequest.getAirportDeparture(), flightRequest.getTerminalArrival());

                    List<Row> rows = flightSeats(aircraftModel.getSeats(), flight);

                    flight.setTerminalDeparture(terminalDeparture);
                    flight.setTerminalArrival(terminalArrival);
                    flight.setAirportArrival(airportArrival);
                    flight.setAirportDeparture(airportDeparture);
                    flight.setAirline(airline);

                    flight.setRows(rows);
                    flightRepository.save(flight);
                }

                DefaultResponse response = messageMaker("Flights added", HttpStatus.OK, 200);
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
            else {
                DefaultResponse response = messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401);
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }
        }
        catch(Exception e) {
            DefaultResponse response = messageMaker(e.getMessage(), HttpStatus.BAD_REQUEST, 400);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    private static FlightCabin getFlightCabin(FlightCabinRequest flightCabinRequest, Airline airline) {
        FlightCabin flightCabin = new FlightCabin();

        flightCabin.setCabinCode(flightCabinRequest.getCabinCode());
        flightCabin.setCabinName(flightCabinRequest.getCabinName());
        flightCabin.setDisabled(flightCabin.getDisabled());
        flightCabin.setStartRow(flightCabin.getStartRow());
        flightCabin.setEndRow(flightCabin.getEndRow());
        flightCabin.setAirline(airline);
        return flightCabin;
    }

    @GetMapping("/getflights")
    public ResponseEntity<?> getFlights(@RequestHeader("Authorization") String jwt) {
        try {
            User user = userService.FindUserByJwt(jwt);

            if (user.getRole().toString().equals("ROLE_AIRLINE")) {
                Airline airline = user.getAirline();

                List<Flight> flights = airline.getFlights();
//                Flights flightResponse = new Flights();
//                flightResponse.setFlights(flights);

                return new ResponseEntity<>(flights, HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(flightRepository.findAll(), HttpStatus.OK);
            }
        }
        catch(Exception e) {
            DefaultResponse response = messageMaker(e.getMessage(), HttpStatus.BAD_REQUEST, 400);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getflight/{id}")
    public ResponseEntity<?> getFlight(@RequestHeader("Authorization") String jwt , @PathVariable Long id) {
        try {
            User user = userService.FindUserByJwt(jwt);

            if (user.getRole().toString().equals("ROLE_AIRLINE")) {
                Optional<Flight> flight = flightRepository.findById(id);

                if (flight.isEmpty()) {
                    DefaultResponse response = messageMaker("Flight not found", HttpStatus.BAD_REQUEST, 400);
                    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
                }
                else{
                    List<Row> rows = new ArrayList<>();
                    rows = flightRowService.getRowsByFlightId(flight.get().getId());
                    flight.get().setRows(rows);

                    return new ResponseEntity<>(flight, HttpStatus.OK);
                }
            }
            else {
                DefaultResponse response = messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401);
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }
        }
        catch(Exception e) {
            DefaultResponse response = messageMaker(e.getMessage(), HttpStatus.BAD_REQUEST, 400);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/updateflight")
    public ResponseEntity<?> updateFlight(@RequestHeader("Authorization") String jwt, @RequestBody Flight flight) {
        try{
            User user = userService.FindUserByJwt(jwt);

            if (user.getRole().toString().equals("ROLE_AIRLINE")){
                Optional<Flight> flight1 = flightRepository.findById(flight.getId());

                if (flight1.isEmpty()){
                    DefaultResponse response = messageMaker("Flight not found", HttpStatus.BAD_REQUEST, 400);
                    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
                }
                else{
                    flightRepository.delete(flight1.get());

                    AircraftModel aircraftModel = aircraftModelService.getAircraftModelByName(flight.getAircraftModel());
                    if (aircraftModel == null) {
                        DefaultResponse response = messageMaker("Aircraft model not found", HttpStatus.BAD_REQUEST, 400);
                        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
                    }

                    List<Row> rows = flightSeats(aircraftModel.getSeats(), flight);
                    flight.setRows(rows);
                    flightRepository.save(flight);
                    DefaultResponse response = messageMaker("Flight updated", HttpStatus.OK, 200);
                    return new ResponseEntity<>(response, HttpStatus.OK);
                }
            }
            else{
                DefaultResponse response = messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401);
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }
        }
        catch(Exception e) {
            DefaultResponse response = messageMaker(e.getMessage(), HttpStatus.BAD_REQUEST, 400);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}

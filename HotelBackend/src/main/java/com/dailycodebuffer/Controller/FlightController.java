package com.dailycodebuffer.Controller;

import com.dailycodebuffer.Model.Airline;
import com.dailycodebuffer.Model.Row;
import com.dailycodebuffer.Model.Seat;
import com.dailycodebuffer.Repository.AircraftModelRepo;
import com.dailycodebuffer.Request.AircraftModel;
import com.dailycodebuffer.Request.Flight;
import com.dailycodebuffer.Model.User;
import com.dailycodebuffer.Repository.FlightRepo;
import com.dailycodebuffer.Request.Flights;
import com.dailycodebuffer.Response.DefaultResponse;
import com.dailycodebuffer.Response.FlightResponse;
import com.dailycodebuffer.Service.AircraftModelService;
import com.dailycodebuffer.Service.FlightRowService;
import com.dailycodebuffer.Service.UserService;
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
    public ResponseEntity<?> addFlight(@RequestHeader("Authorization") String jwt, @RequestBody Flight flight) {
        try {
            User user = userService.FindUserByJwt(jwt);

            if (user.getRole().toString().equals("ROLE_AIRLINE")) {
                Airline airline = user.getAirline();
                AircraftModel aircraftModel = aircraftModelService.getAircraftModelByName(flight.getAircraftModel());
                if (aircraftModel == null) {
                    DefaultResponse response = messageMaker("Aircraft model not found", HttpStatus.BAD_REQUEST, 400);
                    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
                }

                List<Row> rows = flightSeats(aircraftModel.getSeats(), flight);
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
    public ResponseEntity<?> addFlights(@RequestHeader("Authorization") String jwt, @RequestBody Flights flights) {
        try {
            User user = userService.FindUserByJwt(jwt);

            if (user.getRole().toString().equals("ROLE_AIRLINE")) {
                Airline airline = user.getAirline();
                for (Flight flight : flights.getFlights()) {
                    AircraftModel aircraftModel = aircraftModelService.getAircraftModelByName(flight.getAircraftModel());

                    List<Row> rows = flightSeats(aircraftModel.getSeats(), flight);
                    flight.setRows(rows);
                    flight.setAirline(airline);
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

    @GetMapping("/getflights")
    public ResponseEntity<?> getFlights(@RequestHeader("Authorization") String jwt) {
        try {
            User user = userService.FindUserByJwt(jwt);

            if (user.getRole().toString().equals("ROLE_AIRLINE")) {
                Airline airline = user.getAirline();

                List<Flight> flights = airline.getFlights();
                FlightResponse flightResponse = new FlightResponse();
                flightResponse.setFlights(flights);

                return new ResponseEntity<>(flightResponse, HttpStatus.OK);
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

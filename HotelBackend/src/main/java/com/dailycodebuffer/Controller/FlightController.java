package com.dailycodebuffer.Controller;

import com.dailycodebuffer.Model.*;
import com.dailycodebuffer.Repository.AircraftModelRepo;
import com.dailycodebuffer.Repository.CabinClassListRepo;
import com.dailycodebuffer.Request.*;
import com.dailycodebuffer.Response.*;
import com.dailycodebuffer.Repository.FlightRepo;
import com.dailycodebuffer.Service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.*;
import java.util.ArrayList;
import java.util.Arrays;
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

    @Autowired
    private CabinClassListRepo cabinClassListRepo;

    private DefaultResponse messageMaker(String message, HttpStatus status, int statusCode) {
        DefaultResponse response = new DefaultResponse();
        response.setMessage(message);
        response.setStatus(String.valueOf(status));
        response.setStatusCode(statusCode);
        return response;
    }

    private List<Row> flightSeats(Flight flight) {
        List<Row> rows = new ArrayList<>();

        long aisles = flight.getCabinClassList().getAisles();

        for (CabinClass cabinClass : flight.getCabinClassList().getCabinClasses()){
            if (cabinClass.getDisabled()){
                continue;
            }
            else{
                for (Seating seating : cabinClass.getSeating()){
                    for (int i = seating.getStartRow(); i <= seating.getEndRow(); i++){
                        Row row = new Row();
                        List<Seat> seats = new ArrayList<>();
                        char seatLetter = 'A';

                        row.setSeatRowNumber((long) i);
                        row.setFlight(flight);

                        for (int j = 0; j <= aisles; j++){
                            for (int k = 0; k < seating.getSeatSeating()[j]; k++){
                                Seat seat = new Seat();
                                seat.setSeatNumber(i + String.valueOf(seatLetter));
                                seatLetter += 1;

                                if ((j == 0 && k == 0) || (j == aisles && k == seating.getSeatSeating()[j] - 1)){
                                    seat.setSeatType("window");
                                    seat.setSeatPrice(seating.getWindowPrice());
                                }
                                else if ((j != 0 && k == 0) || (j != aisles && k == seating.getSeatSeating()[j] - 1)){
                                    seat.setSeatType("aisle");
                                    seat.setSeatPrice(seating.getAislePrice());
                                }
                                else{
                                    seat.setSeatType("middle");
                                    seat.setSeatPrice(seating.getMiddlePrice());
                                }

                                seat.setSeatClass(cabinClass.getCabinName());
                                seat.setSeatStatus("Unoccupied");
                                seat.setExtraLegroom(seating.getExtraLegroom());
                                seats.add(seat);
                                seat.setRow(row);
                            }
                        }
                        row.setSeats(seats);
//                        System.out.println(row);
                        rows.add(row);
                    }
                }
            }
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
                flight.setBusinessClassPrice(flightRequest.getBusinessClassPrice());
                flight.setEconomyClassPrice(flightRequest.getEconomyClassPrice());
                flight.setPremiumEconomyClassPrice(flightRequest.getPremiumEconomyClassPrice());
                flight.setFirstClassPrice(flightRequest.getFirstClassPrice());

                CabinClassList cabinClassList = cabinClassListRepo.findById(flightRequest.getCabinClassListId());
                flight.setCabinClassList(cabinClassList);

                List<Row> rows = flightSeats(flight);
                flight.setRows(rows);

                Airline airline = user.getAirline();
//                AircraftModel aircraftModel = aircraftModelService.getAircraftModelByName(flight.getAircraftModel());
//                if (aircraftModel == null) {
//                    DefaultResponse response = messageMaker("Aircraft model not found", HttpStatus.BAD_REQUEST, 400);
//                    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//                }

                List<FlightCabin> flightCabins = new ArrayList<>();

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

//                if (terminalArrival == null) {
//                    DefaultResponse response = messageMaker("Terminal arrival not found", HttpStatus.BAD_REQUEST, 400);
//                    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//                }
                Terminal terminalDeparture = terminalService.getTerminalByIataCodeAndTerminalName(flightRequest.getAirportDeparture(), flightRequest.getTerminalArrival());

//                if (terminalDeparture == null) {
//                    DefaultResponse response = messageMaker("Terminal departure not found", HttpStatus.BAD_REQUEST, 400);
//                    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//                }

//                List<Row> rows = flightSeats(aircraftModel.getSeats(), flight);

                flight.setTerminalArrival(terminalArrival);
                flight.setTerminalDeparture(terminalDeparture);
                flight.setAirportArrival(airportArrival);
                flight.setAirportDeparture(airportDeparture);
                flight.setAirline(airline);

                for (FlightCabinRequest flightCabinRequest : flightRequest.getFlightCabins()) {
                    FlightCabin flightCabin = getFlightCabin(flightCabinRequest, airline, flight);
                    flightCabin.setFlight(flight);
                    flightCabins.add(flightCabin);
                }

                flight.setFlightCabins(flightCabins);
                System.out.println(flight);
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

            if (!"ROLE_AIRLINE".equals(user.getRole().toString())) {
                DefaultResponse response = messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401);
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }

            Airline airline = user.getAirline();

            for (FlightRequest flightRequest : flightsRequest) {
                Flight flight = new Flight();
                flight.setFlightNumber(flightRequest.getFlightNumber());
                flight.setArrivalTime(flightRequest.getArrivalTime());
                flight.setDepartureTime(flightRequest.getDepartureTime());
                flight.setFlightNumber(flightRequest.getFlightNumber());
                flight.setAircraftModel(flightRequest.getAircraftModel());
                flight.setBusinessClassPrice(flightRequest.getBusinessClassPrice());
                flight.setEconomyClassPrice(flightRequest.getEconomyClassPrice());
                flight.setPremiumEconomyClassPrice(flightRequest.getPremiumEconomyClassPrice());
                flight.setFirstClassPrice(flightRequest.getFirstClassPrice());

                CabinClassList cabinClassList = cabinClassListRepo.findById(flightRequest.getCabinClassListId());
                flight.setCabinClassList(cabinClassList);

                List<Row> rows = flightSeats(flight);
                flight.setRows(rows);

//                AircraftModel aircraftModel = aircraftModelService.getAircraftModelByName(flight.getAircraftModel());
//                if (aircraftModel == null) {
//                    DefaultResponse response = messageMaker("Aircraft model not found", HttpStatus.BAD_REQUEST, 400);
//                    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//                }

                List<FlightCabin> flightCabins = new ArrayList<>();

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

//                if (terminalArrival == null) {
//                    DefaultResponse response = messageMaker("Terminal arrival not found", HttpStatus.BAD_REQUEST, 400);
//                    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//                }
                Terminal terminalDeparture = terminalService.getTerminalByIataCodeAndTerminalName(flightRequest.getAirportDeparture(), flightRequest.getTerminalArrival());

//                if (terminalDeparture == null) {
//                    DefaultResponse response = messageMaker("Terminal departure not found", HttpStatus.BAD_REQUEST, 400);
//                    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//                }

//                List<Row> rows = flightSeats(aircraftModel.getSeats(), flight);

                flight.setTerminalArrival(terminalArrival);
                flight.setTerminalDeparture(terminalDeparture);
                flight.setAirportArrival(airportArrival);
                flight.setAirportDeparture(airportDeparture);
                flight.setAirline(airline);

                for (FlightCabinRequest flightCabinRequest : flightRequest.getFlightCabins()) {
                    FlightCabin flightCabin = getFlightCabin(flightCabinRequest, airline, flight);
                    flightCabin.setFlight(flight);
                    flightCabins.add(flightCabin);
                }

                flight.setFlightCabins(flightCabins);
                flightRepository.save(flight);
            }

            DefaultResponse response = messageMaker("Flights added", HttpStatus.OK, 200);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace(); // Log the error for debugging
            DefaultResponse response = messageMaker(e.getMessage(), HttpStatus.BAD_REQUEST, 400);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    private static FlightCabin getFlightCabin(FlightCabinRequest flightCabinRequest, Airline airline, Flight flight) {
        FlightCabin flightCabin = new FlightCabin();

        flightCabin.setCabinCode(flightCabinRequest.getCabinCode());
        flightCabin.setCabinName(flightCabinRequest.getCabinName());
        flightCabin.setDisabled(flightCabinRequest.getDisabled());
        flightCabin.setStartRow(flightCabinRequest.getStartRow());
        flightCabin.setEndRow(flightCabinRequest.getEndRow());
        flightCabin.setAirline(airline);
        flightCabin.setFlight(flight);
        flightCabin.setPrice(flightCabinRequest.getPrice());
        return flightCabin;
    }


    @GetMapping("/getflights")
    public ResponseEntity<?> getFlights(@RequestHeader("Authorization") String jwt) {
        try {
            User user = userService.FindUserByJwt(jwt);
            List<Flight> flights;

            if (user.getRole().toString().equals("ROLE_AIRLINE")) {
                Airline airline = user.getAirline();
                flights = airline.getFlights();  // already filtered by airline
            } else {
                flights = flightRepository.findAll();  // all flights
            }

            // 🔁 Convert to DTOs
            List<FlightSummaryResponse> responseList = flights.stream()
                    .map(this::mapToFlightSummary)
                    .toList();

            return new ResponseEntity<>(responseList, HttpStatus.OK);
        } catch (Exception e) {
            DefaultResponse response = messageMaker(e.getMessage(), HttpStatus.BAD_REQUEST, 400);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    private FlightSummaryResponse mapToFlightSummary(Flight flight) {
        FlightSummaryResponse dto = new FlightSummaryResponse();
        dto.setId(flight.getId());
        dto.setFlightNumber(flight.getFlightNumber());
        dto.setAircraftModel(flight.getAircraftModel());
        dto.setArrivalTime(flight.getArrivalTime());
        dto.setDepartureTime(flight.getDepartureTime());

        dto.setFirstClassPrice(flight.getFirstClassPrice());
        dto.setBusinessClassPrice(flight.getBusinessClassPrice());
        dto.setEconomyClassPrice(flight.getEconomyClassPrice());
        dto.setPremiumEconomyClassPrice(flight.getPremiumEconomyClassPrice());

        dto.setTerminalArrival(flight.getTerminalArrival());
        dto.setTerminalDeparture(flight.getTerminalDeparture());
        dto.setAirportArrival(flight.getAirportArrival());
        dto.setAirportDeparture(flight.getAirportDeparture());

        dto.setAirlineName(flight.getAirline().getAirlineName());
        return dto;
    }

    @GetMapping("/getflight/{id}")
    public ResponseEntity<?> getFlight(@RequestHeader("Authorization") String jwt , @PathVariable Long id) {
        try {
            User user = userService.FindUserByJwt(jwt);

            if (user.getRole().toString().equals("ROLE_AIRLINE") || user.getRole().toString().equals("ROLE_ADMIN")) {
                Optional<Flight> flight = flightRepository.findById(id);

                if (flight.isEmpty()) {
                    DefaultResponse response = messageMaker("Flight not found", HttpStatus.BAD_REQUEST, 400);
                    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
                }
                else{
                    if (flight.get().getAirline().getId() != user.getAirline().getId() && user.getRole().toString().equals("ROLE_AIRLINE")) {
                        DefaultResponse response = messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401);
                        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
                    }

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

    @GetMapping("/filter/flight/{arrival}/{departure}/{date}")
    public ResponseEntity<?> getFlightByArrivalAndDeparture(
            @RequestHeader("Authorization") String jwt,
            @PathVariable String arrival,
            @PathVariable String departure,
            @PathVariable String date) {
        try {
            User user = userService.FindUserByJwt(jwt);

            if (!user.getRole().toString().equals("ROLE_AIRLINE") && !user.getRole().toString().equals("ROLE_ADMIN")) {
                return new ResponseEntity<>(messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401), HttpStatus.UNAUTHORIZED);
            }

            Airport airportArrival = airportService.getAirportByIata(arrival);
            if (airportArrival == null) {
                return new ResponseEntity<>(messageMaker("Airport arrival not found", HttpStatus.BAD_REQUEST, 400), HttpStatus.BAD_REQUEST);
            }

            Airport airportDeparture = airportService.getAirportByIata(departure);
            if (airportDeparture == null) {
                return new ResponseEntity<>(messageMaker("Airport departure not found", HttpStatus.BAD_REQUEST, 400), HttpStatus.BAD_REQUEST);
            }

            List<Flight> flights;

            if (date == null || date.isEmpty()) {
                flights = flightRepository.findByAirportArrivalAndAirportDeparture(airportArrival, airportDeparture);
            } else {
                try {
                    long timestamp = Long.parseLong(date);

                    LocalDate localDate = Instant.ofEpochSecond(timestamp)  // <- Corrected
                            .atZone(ZoneId.systemDefault())
                            .toLocalDate();

                    LocalDateTime startOfDay = localDate.atStartOfDay();
                    LocalDateTime endOfDay = localDate.atTime(LocalTime.MAX);

                    System.out.println(startOfDay); // now will be correct
                    System.out.println(endOfDay);

                    flights = flightRepository.findByAirportArrivalAndAirportDepartureAndArrivalTimeBetween(
                            airportArrival, airportDeparture, startOfDay, endOfDay);
                } catch (NumberFormatException ex) {
                    return new ResponseEntity<>(messageMaker("Invalid timestamp", HttpStatus.BAD_REQUEST, 400), HttpStatus.BAD_REQUEST);
                }
            }

            List<FlightSummaryResponse> responseList = flights.stream()
                    .map(this::mapToFlightSummary)
                    .toList();

            if (flights.isEmpty()) {
                return new ResponseEntity<>(messageMaker("No flights found", HttpStatus.NOT_FOUND, 404), HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(responseList, HttpStatus.OK);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(messageMaker(e.getMessage(), HttpStatus.BAD_REQUEST, 400), HttpStatus.BAD_REQUEST);
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

//                    List<Row> rows = flightSeats(aircraftModel.getSeats(), flight);
                    flight.setRows(null);
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

    @DeleteMapping("/deleteflight/{id}")
    public ResponseEntity<?> deleteFlight(@RequestHeader("Authorization") String jwt , @PathVariable Long id){
        try {
            User user = userService.FindUserByJwt(jwt);

            if (user.getRole().toString().equals("ROLE_AIRLINE") || user.getRole().toString().equals("ROLE_ADMIN")) {
                Optional<Flight> flight = flightRepository.findById(id);

                if (flight.isEmpty()) {
                    DefaultResponse response = messageMaker("Flight not found", HttpStatus.BAD_REQUEST, 400);
                }
                else{
                    flightRepository.deleteById(id);
                }

                if (user.getRole().toString().equals("ROLE_AIRLINE")) {
                    Airline airline = user.getAirline();

                    List<Flight> flights = airline.getFlights();
                    for (Flight flight1 : flights) {
                        List<Row> rows = new ArrayList<>();
                        flight1.setRows(rows);
                    }

                    return new ResponseEntity<>(flights, HttpStatus.OK);
                }
                else{
                    return new ResponseEntity<>(flightRepository.findAll(), HttpStatus.OK);
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
}

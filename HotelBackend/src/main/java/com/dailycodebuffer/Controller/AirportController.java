package com.dailycodebuffer.Controller;

import com.dailycodebuffer.Model.User;
import com.dailycodebuffer.Repository.AirportRepo;
import com.dailycodebuffer.Request.Airport;
import com.dailycodebuffer.Response.DefaultResponse;
import com.dailycodebuffer.Service.AirportService;
import com.dailycodebuffer.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AirportController {

    @Autowired
    private AirportRepo airportRepo;

    @Autowired
    private AirportService airportService;

    @Autowired
    private UserService userService;

    private DefaultResponse messageMaker(String message, HttpStatus status, int statusCode) {
        DefaultResponse response = new DefaultResponse();
        response.setMessage(message);
        response.setStatus(String.valueOf(status));
        response.setStatusCode(statusCode);
        return response;
    }

    @PostMapping("/addairport")
    public ResponseEntity<?> addAirport(@RequestHeader("Authorization") String jwt, @RequestBody Airport airport) {
        try{
            User user = userService.FindUserByJwt(jwt);

            if(user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401));
            }
            else{
                if (user.getRole().toString().equals("ROLE_USER")){
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401));
                }
                else{
                    airportRepo.save(airport);
                    return ResponseEntity.status(HttpStatus.CREATED).body(messageMaker("Airport added successfully", HttpStatus.CREATED, 201));
                }
            }
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageMaker("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR, 500));
        }
    }

    @PostMapping("/addairports")
    public ResponseEntity<?> addAirports(@RequestHeader("Authorization") String jwt, @RequestBody Airport[] airports) {
        try{
            User user = userService.FindUserByJwt(jwt);

            if(user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401));
            }
            else{
                if (user.getRole().toString().equals("ROLE_USER")){
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401));
                }
                else{
                    for (Airport airport : airports) {
                        airportRepo.save(airport);
                    }
                    return ResponseEntity.status(HttpStatus.CREATED).body(messageMaker("Airports added successfully", HttpStatus.CREATED, 201));
                }
            }
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageMaker("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR, 500));
        }
    }

    @GetMapping("/getairport/{airportId}")
    public ResponseEntity<?> getAirports(@RequestHeader("Authorization") String jwt, @PathVariable String airportId) {
        try{
            User user = userService.FindUserByJwt(jwt);

            if(user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401));
            }
            else{
                Airport airport = airportRepo.findByIataCode(airportId);

                if (airport == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageMaker("Airport not found", HttpStatus.NOT_FOUND, 404));
                }
                else {
                    return ResponseEntity.status(HttpStatus.OK).body(airport);
                }
            }
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageMaker("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR, 500));
        }
    }

    @GetMapping("/getairports")
    public ResponseEntity<?> getAirports(@RequestHeader("Authorization") String jwt) {
        try{
            User user = userService.FindUserByJwt(jwt);

            if(user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401));
            }
            else{
                return ResponseEntity.status(HttpStatus.OK).body(airportRepo.findAll());
            }
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageMaker("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR, 500));
        }
    }

    @GetMapping("/getflightsbyairport/arrival/{airportId}")
    public ResponseEntity<?> getFlightsByAirport(@RequestHeader("Authorization") String jwt, @PathVariable String airportId) {
        try{
            User user = userService.FindUserByJwt(jwt);

            if(user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401));
            }
            else{
                Airport airport = airportRepo.findByIataCode(airportId);

                if (airport == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageMaker("Airport not found", HttpStatus.NOT_FOUND, 404));
                }
                else {
                    return ResponseEntity.status(HttpStatus.OK).body(airport.getFlightsArrival());
                }
            }
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageMaker("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR, 500));
        }
    }

    @GetMapping("/getflightsbyairport/departure/{airportId}")
    public ResponseEntity<?> getFlightsByAirportDeparture(@RequestHeader("Authorization") String jwt, @PathVariable String airportId) {
        try{
            User user = userService.FindUserByJwt(jwt);

            if(user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401));
            }
            else{
                Airport airport = airportRepo.findByIataCode(airportId);

                if (airport == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageMaker("Airport not found", HttpStatus.NOT_FOUND, 404));
                }
                else {
                    return ResponseEntity.status(HttpStatus.OK).body(airport.getFlightsDeparture());
                }
            }
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageMaker("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR, 500));
        }
    }

    @DeleteMapping("/deleteairport/{airportId}")
    public ResponseEntity<?> deleteAirport(@RequestHeader("Authorization") String jwt, @PathVariable String airportId) {
        try{
            User user = userService.FindUserByJwt(jwt);

            if(user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401));
            }
            else{
                if (user.getRole().toString().equals("ROLE_USER") || user.getRole().toString().equals("ROLE_AIRLINE")){
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401));
                }
                else{
                    Airport airport = airportRepo.findByIataCode(airportId);

                    if (airport == null) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageMaker("Airport not found", HttpStatus.NOT_FOUND, 404));
                    }
                    else {
                        airportRepo.delete(airport);
                        return ResponseEntity.status(HttpStatus.OK).body(airportRepo.findAll());
                    }
                }
            }
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageMaker("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR, 500));
        }
    }
}

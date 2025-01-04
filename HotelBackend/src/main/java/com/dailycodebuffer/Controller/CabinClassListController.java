package com.dailycodebuffer.Controller;

import com.dailycodebuffer.Model.*;
import com.dailycodebuffer.Repository.AircraftModelRepo;
import com.dailycodebuffer.Repository.CabinClassListRepo;
import com.dailycodebuffer.Repository.FlightRepo;
import com.dailycodebuffer.Response.DefaultResponse;
import com.dailycodebuffer.Service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@RestController
public class CabinClassListController {

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

    @PostMapping("/cabinclasslist/add")
    public ResponseEntity<?> addCabinClassList(@RequestHeader("Authorization") String jwt, @RequestBody CabinClassList cabinClassListRequest) {
        try{
            User user = userService.FindUserByJwt(jwt);

            if (user.getRole().toString().equals("ROLE_AIRLINE")){
                Airline airline = user.getAirline();

                cabinClassListRequest.setAirline(airline);

                for (CabinClass cabinClass : cabinClassListRequest.getCabinClasses()) {
                    for (Seating seating : cabinClass.getSeating()) {
                        seating.setCabinClass(cabinClass);
                    }

                    cabinClass.setCabinClassList(cabinClassListRequest);
                }

                cabinClassListRepo.save(cabinClassListRequest);

                return ResponseEntity.status(HttpStatus.CREATED).body(messageMaker("Cabin Class List added successfully", HttpStatus.CREATED, 201));
            }
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401));
            }
        }
        catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageMaker("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR, 500));
        }
    }

    @PostMapping("/cabinclasslists/add")
    public ResponseEntity<?> addCabinClassLists(@RequestHeader("Authorization") String jwt, @RequestBody CabinClassList[] cabinClassListRequests) {
        try {
            User user = userService.FindUserByJwt(jwt);

            if (user.getRole().toString().equals("ROLE_AIRLINE")) {
                Airline airline = user.getAirline();

                for (CabinClassList cabinClassListRequest : cabinClassListRequests) {
                    cabinClassListRequest.setAirline(airline);

                    for (CabinClass cabinClass : cabinClassListRequest.getCabinClasses()) {
                        for (Seating seating : cabinClass.getSeating()) {
                            seating.setCabinClass(cabinClass);
                        }
                        cabinClass.setCabinClassList(cabinClassListRequest);
                    }
                    cabinClassListRepo.save(cabinClassListRequest);
                }

                return ResponseEntity.status(HttpStatus.CREATED).body(messageMaker("Cabin Class Lists added successfully", HttpStatus.CREATED, 201));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageMaker("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR, 500));
        }
    }

    @GetMapping("/cabinclasslist/get/{id}")
    public ResponseEntity<?> getCabinClassList(@RequestHeader("Authorization") String jwt, @RequestParam Long id) {
        try {
            User user = userService.FindUserByJwt(jwt);

            if (user.getRole().toString().equals("ROLE_AIRLINE")) {
                Airline airline = user.getAirline();

                CabinClassList cabinClassList = cabinClassListRepo.findById(id).orElse(null);

                if (cabinClassList == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageMaker("Cabin Class List not found", HttpStatus.NOT_FOUND, 404));
                }

//                if (cabinClassList.getAirline().getId().equals(airline.getId())) {
//                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401));
//                }

                return ResponseEntity.status(HttpStatus.OK).body(cabinClassList);
            }
            else if(user.getRole().toString().equals("ROLE_ADMIN")){
                CabinClassList cabinClassList = cabinClassListRepo.findById(id).orElse(null);

                if (cabinClassList == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageMaker("Cabin Class List not found", HttpStatus.NOT_FOUND, 404));
                }

                return ResponseEntity.status(HttpStatus.OK).body(cabinClassList);
            }
            else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageMaker("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR, 500));
        }
    }

    @GetMapping("/cabinclasslists/get")
    public ResponseEntity<?> getCabinClassLists(@RequestHeader("Authorization") String jwt) {
        try {
            User user = userService.FindUserByJwt(jwt);

            if (user.getRole().toString().equals("ROLE_AIRLINE")) {
                Airline airline = user.getAirline();

                return ResponseEntity.status(HttpStatus.OK).body(cabinClassListRepo.findAll());
            }
            else if (user.getRole().toString().equals("ROLE_ADMIN")) {
                return ResponseEntity.status(HttpStatus.OK).body(cabinClassListRepo.findAll());
            }
            else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageMaker("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR, 500));
        }
    }
}

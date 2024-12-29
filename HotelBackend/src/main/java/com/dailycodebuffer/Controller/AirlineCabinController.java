package com.dailycodebuffer.Controller;

import com.dailycodebuffer.Model.Airline;
import com.dailycodebuffer.Model.User;
import com.dailycodebuffer.Repository.AirlineCabinRepo;
import com.dailycodebuffer.Repository.AirlineRepo;
import com.dailycodebuffer.Request.AirlineCabinRequest;
import com.dailycodebuffer.Response.AirlineCabin;
import com.dailycodebuffer.Response.DefaultResponse;
import com.dailycodebuffer.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AirlineCabinController {

    @Autowired
    private UserService userService;

    @Autowired
    private AirlineCabinRepo airlineCabinRepo;

    @Autowired
    private AirlineRepo airlineRepo;

    private DefaultResponse messageMaker(String message, HttpStatus status, int statusCode) {
        DefaultResponse response = new DefaultResponse();
        response.setMessage(message);
        response.setStatus(String.valueOf(status));
        response.setStatusCode(statusCode);
        return response;
    }

    @PostMapping("/airlinecabin/add")
    public ResponseEntity<?> addAirlineCabin(@RequestHeader("Authorization") String jwt, @RequestBody AirlineCabinRequest airlineCabinRequest) {
        try{
            User user = userService.FindUserByJwt(jwt);

            if (user.getRole().toString().equals("ROLE_AIRLINE")){
                Airline airline = user.getAirline();

                AirlineCabin airlineCabin = new AirlineCabin();
                airlineCabin.setCabinName(airlineCabinRequest.getCabinName());
                airlineCabin.setCabinCode(airlineCabinRequest.getCabinCode());

                airlineCabinRepo.save(airlineCabin);

                return ResponseEntity.status(HttpStatus.CREATED).body(messageMaker("Airline Cabin added successfully", HttpStatus.CREATED, 201));
            }
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401));
            }
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageMaker("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR, 500));
        }
    }

    @PostMapping("/airlinecabins/add")
    public ResponseEntity<?> addAirlineCabins(@RequestHeader("Authorization") String jwt, @RequestBody AirlineCabinRequest[] airlineCabinRequests) {
        try{
            User user = userService.FindUserByJwt(jwt);

            if (user.getRole().toString().equals("ROLE_AIRLINE")){
                String airlineCode = user.getAirline().getAirlineCode();

                System.out.println(airlineCode);

                Airline airline = user.getAirline();

                for (AirlineCabinRequest airlineCabinRequest : airlineCabinRequests){
                    AirlineCabin airlineCabin = new AirlineCabin();
                    airlineCabin.setCabinName(airlineCabinRequest.getCabinName());
                    airlineCabin.setCabinCode(airlineCabinRequest.getCabinCode());

                    System.out.println(airlineCabin);
                    airlineCabinRepo.save(airlineCabin);
                }

                return ResponseEntity.status(HttpStatus.CREATED).body(messageMaker("Airline Cabins added successfully", HttpStatus.CREATED, 201));
            }
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401));
            }
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageMaker("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR, 500));
        }
    }

    @GetMapping("/airlinecabins")
    public ResponseEntity<?> getAirlineCabins(@RequestHeader("Authorization") String jwt) {
        try{
            User user = userService.FindUserByJwt(jwt);

            if (user.getRole().toString().equals("ROLE_USER")){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401));
            }
            else{
                return ResponseEntity.status(HttpStatus.OK).body(airlineCabinRepo.findAll());
            }
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageMaker("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR, 500));
        }
    }
}

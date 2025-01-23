package com.dailycodebuffer.Controller;

import com.dailycodebuffer.Model.Airline;
import com.dailycodebuffer.Model.Airlines;
import com.dailycodebuffer.Model.User;
import com.dailycodebuffer.Repository.AirlineRepo;
import com.dailycodebuffer.Response.DefaultResponse;
import com.dailycodebuffer.Service.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AirlineController {

    @Autowired
    private UserService userService;

    @Autowired
    private AirlineRepo airlineRepo;

    private DefaultResponse messageMaker(String message, HttpStatus status, int statusCode) {
        DefaultResponse response = new DefaultResponse();
        response.setMessage(message);
        response.setStatus(String.valueOf(status));
        response.setStatusCode(statusCode);
        return response;
    }

    @PostMapping("/addAirline")
    public ResponseEntity<?> addAirline(@RequestHeader("Authorization") String jwt, @RequestBody Airline airline) {
        try{
            User user = userService.FindUserByJwt(jwt);

            if (user == null) {
                DefaultResponse response = messageMaker("User not Found", HttpStatus.UNAUTHORIZED, 401);
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }
            else if (user.getRole().toString().equals("ROLE_ADMIN")) {
                airlineRepo.save(airline);

                DefaultResponse response = messageMaker("Airline added successfully", HttpStatus.OK, 200);
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
            else {
                DefaultResponse response = messageMaker("Forbidden", HttpStatus.FORBIDDEN, 403);
                return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
            }
        }
        catch (Exception e) {
            DefaultResponse response = messageMaker("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR, 500);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getAirlines")
    public ResponseEntity<?> getAirlines(@RequestHeader("Authorization") String jwt) {
        try {
            User user = userService.FindUserByJwt(jwt);

            Airlines airlines = new Airlines();
            airlines.setAirlines(airlineRepo.findAll());

            return ResponseEntity.status(200).body(airlineRepo.findAll());
        }
        catch (Exception e) {
            DefaultResponse response = messageMaker("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR, 500);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deleteAirline/{id}")
    public ResponseEntity<?> deleteAirline(@RequestHeader("Authorization") String jwt, @PathVariable Long id) {
        try {
            User user = userService.FindUserByJwt(jwt);

            if (user == null) {
                DefaultResponse response = messageMaker("User not Found", HttpStatus.UNAUTHORIZED, 401);
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }
            else if (user.getRole().toString().equals("ROLE_ADMIN")) {
                airlineRepo.deleteById(id);
                return ResponseEntity.status(200).body(airlineRepo.findAll());
            }
            else {
                DefaultResponse response = messageMaker("Forbidden", HttpStatus.FORBIDDEN, 403);
                return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
            }
        }
        catch (Exception e) {
            DefaultResponse response = messageMaker("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR, 500);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

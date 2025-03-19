package com.dailycodebuffer.Controller;

import com.dailycodebuffer.Model.Airline;
import com.dailycodebuffer.Model.Airlines;
import com.dailycodebuffer.Model.Discount;
import com.dailycodebuffer.Model.User;
import com.dailycodebuffer.Repository.AirlineRepo;
import com.dailycodebuffer.Repository.DiscountRepo;
import com.dailycodebuffer.Response.DefaultResponse;
import com.dailycodebuffer.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class AirlineController {

    @Autowired
    private UserService userService;

    @Autowired
    private AirlineRepo airlineRepo;

    @Autowired
    private DiscountRepo discountRepo;

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
                if (airline.getDiscounts() != null) {
                    for (Discount discount : airline.getDiscounts()) {
                        discount.setAirline(airline);
                    }
                }

                Airline savedAirline = airlineRepo.save(airline);

                if (savedAirline.getDiscounts() != null) {
                    for (Discount discount : savedAirline.getDiscounts()) {
                        discount.setAirline(savedAirline);
                    }
                }

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

    @PutMapping("/updateAirline/{id}")
    public ResponseEntity<?> updateAirline(@RequestHeader("Authorization") String jwt, @PathVariable Long id, @RequestBody Airline airline) {
        try {
            User user = userService.FindUserByJwt(jwt);

            if (user == null) {
                return new ResponseEntity<>(messageMaker("User not Found", HttpStatus.UNAUTHORIZED, 401), HttpStatus.UNAUTHORIZED);
            }

            if (!user.getRole().toString().equals("ROLE_ADMIN")) {
                return new ResponseEntity<>(messageMaker("Forbidden", HttpStatus.FORBIDDEN, 403), HttpStatus.FORBIDDEN);
            }

            Optional<Airline> airlineOptional = airlineRepo.findById(id);
            if (airlineOptional.isEmpty()) {
                return new ResponseEntity<>(messageMaker("Airline not found", HttpStatus.NOT_FOUND, 404), HttpStatus.NOT_FOUND);
            }

            Airline existingAirline = airlineOptional.get();
            existingAirline.setAirlineName(airline.getAirlineName());
            existingAirline.setAirlineCode(airline.getAirlineCode());
            existingAirline.setDescription(airline.getDescription());
            existingAirline.setData(airline.getData());

            if (airline.getDiscounts() != null) {
                for (Discount discount : airline.getDiscounts()) {
                    discount.setAirline(existingAirline); // Ensure proper mapping
                }
                existingAirline.getDiscounts().clear(); // Remove existing ones
                existingAirline.getDiscounts().addAll(airline.getDiscounts());
            }

            airlineRepo.save(existingAirline);
            return ResponseEntity.ok(messageMaker("Airline updated successfully", HttpStatus.OK, 200));

        } catch (Exception e) {
            DefaultResponse response = messageMaker("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR, 500);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/getAirline/{id}")
    public ResponseEntity<?> getAirline(@RequestHeader("Authorization") String jwt, @PathVariable Long id) {
        try {
            User user = userService.FindUserByJwt(jwt);

            if (user == null) {
                DefaultResponse response = messageMaker("User not Found", HttpStatus.UNAUTHORIZED, 401);
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }
            else if (user.getRole().toString().equals("ROLE_ADMIN")) {
                Airline airline = airlineRepo.findById(id).get();
                return ResponseEntity.status(200).body(airline);
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

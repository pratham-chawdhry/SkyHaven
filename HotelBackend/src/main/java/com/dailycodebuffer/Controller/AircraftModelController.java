package com.dailycodebuffer.Controller;

import com.dailycodebuffer.Model.User;
import com.dailycodebuffer.Repository.AircraftModelRepo;
import com.dailycodebuffer.Request.AircraftModel;
import com.dailycodebuffer.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AircraftModelController {

    @Autowired
    private UserService userService;

    @Autowired
    private AircraftModelRepo aircraftModelRepository;

    @PostMapping("/add/aircraftmodel")
    public ResponseEntity<?> addAircraftModel(@RequestHeader("Authorization") String jwt, @RequestBody AircraftModel aircraftModel) {
        try {
            User user = userService.FindUserByJwt(jwt);

            if (user.getRole().toString().equals("ROLE_ADMIN")) {
                aircraftModelRepository.save(aircraftModel);
                return new ResponseEntity<>("Aircraft Model added", HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
            }
        }
        catch(Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get/aircraftmodels")
    public ResponseEntity<?> getAircraftModels(@RequestHeader("Authorization") String jwt) {
        try {
            User user = userService.FindUserByJwt(jwt);

            if (user.getRole().toString().equals("ROLE_ADMIN")) {
                List<AircraftModel> aircraftModels = aircraftModelRepository.findAll();
                return new ResponseEntity<>(aircraftModels, HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
            }
        }
        catch(Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}

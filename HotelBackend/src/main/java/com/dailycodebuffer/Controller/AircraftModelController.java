package com.dailycodebuffer.Controller;

import com.dailycodebuffer.Model.User;
import com.dailycodebuffer.Repository.AircraftModelRepo;
import com.dailycodebuffer.Request.AircraftModel;
import com.dailycodebuffer.Response.DefaultResponse;
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

    private DefaultResponse messageMaker(String message, HttpStatus status, int statusCode) {
        DefaultResponse response = new DefaultResponse();
        response.setMessage(message);
        response.setStatus(String.valueOf(status));
        response.setStatusCode(statusCode);
        return response;
    }

    @PostMapping("/add/aircraftmodel")
    public ResponseEntity<?> addAircraftModel(@RequestHeader("Authorization") String jwt, @RequestBody AircraftModel aircraftModel) {
        try {
            User user = userService.FindUserByJwt(jwt);

            if (user.getRole().toString().equals("ROLE_ADMIN")) {
                aircraftModelRepository.save(aircraftModel);

                DefaultResponse message = messageMaker("Aircraft Model added", HttpStatus.OK, 200);
                return new ResponseEntity<>(message, HttpStatus.OK);
            }
            else {
                DefaultResponse message = messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401);
                return new ResponseEntity<>(message, HttpStatus.UNAUTHORIZED);
            }
        }
        catch(Exception e) {
            DefaultResponse message = messageMaker(e.getMessage(), HttpStatus.BAD_REQUEST, 400);
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
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
                DefaultResponse message = messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401);
                return new ResponseEntity<>(message, HttpStatus.UNAUTHORIZED);
            }
        }
        catch(Exception e) {
            DefaultResponse message = messageMaker(e.getMessage(), HttpStatus.BAD_REQUEST, 400);
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
    }
}

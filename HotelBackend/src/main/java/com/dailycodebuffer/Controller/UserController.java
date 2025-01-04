package com.dailycodebuffer.Controller;

import com.dailycodebuffer.Model.USER_ROLE;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dailycodebuffer.Model.User;
import com.dailycodebuffer.Repository.UserRepo;
import com.dailycodebuffer.Service.UserService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepo userRepository;

    @GetMapping("/profile")
    public ResponseEntity<?> getUserByJwt(@RequestHeader("Authorization") String jwt) {
        try {
            User user = userService.FindUserByJwt(jwt);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/activate")
    public ResponseEntity<?> activateUser(@RequestHeader("Authorization") String jwt) {
        try {
            User user = userService.FindUserByJwt(jwt);
            user.setActive(true);
            User saved_user = userRepository.save(user);
            return new ResponseEntity<>(saved_user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/users")
    public ResponseEntity<?> getUsers(@RequestHeader("Authorization") String jwt) {
        try {
            User user = userService.FindUserByJwt(jwt);

            if (user.getRole().equals(USER_ROLE.ROLE_ADMIN)) {
                return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
            } else if (user.getRole().equals(USER_ROLE.ROLE_AIRLINE)) {
                return new ResponseEntity<>(userRepository.findByAirlineCode(user.getAirlineCode()), HttpStatus.UNAUTHORIZED);
            } else {
                return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
package com.dailycodebuffer.Controller;

import com.dailycodebuffer.Model.User;
import com.dailycodebuffer.Repository.TerminalRepo;
import com.dailycodebuffer.Request.Airport;
import com.dailycodebuffer.Request.TerminalRequest;
import com.dailycodebuffer.Response.Terminal;
import com.dailycodebuffer.Response.DefaultResponse;
import com.dailycodebuffer.Service.AirportService;
import com.dailycodebuffer.Service.TerminalService;
import com.dailycodebuffer.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class TerminalController {

    @Autowired
    private TerminalService terminalService;

    @Autowired
    private UserService userService;

    @Autowired
    private AirportService airportService;

    @Autowired
    private TerminalRepo terminalRepo;

    private DefaultResponse messageMaker(String message, HttpStatus status, int statusCode) {
        DefaultResponse response = new DefaultResponse();
        response.setMessage(message);
        response.setStatus(String.valueOf(status));
        response.setStatusCode(statusCode);
        return response;
    }

    @PostMapping("/addterminal")
    public ResponseEntity<?> addTerminal(@RequestHeader("Authorization") String jwt, @RequestBody TerminalRequest terminalRequest) {
        try{
            User user = userService.FindUserByJwt(jwt);

            if(user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401));
            }
            else{
                if (user.getRole().toString().equals("ROLE_ADMIN")){
                    Terminal terminal = new Terminal();

                    terminal.setTerminalName(terminalRequest.getTerminalName());

                    Airport airport = airportService.getAirportByIata(terminalRequest.getIataCode());
                    if (airport == null) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageMaker("Airport not found", HttpStatus.NOT_FOUND, 404));
                    }
                    terminal.setAirport(airport);
                    terminalRepo.save(terminal);

                    return ResponseEntity.status(HttpStatus.CREATED).body(messageMaker("Terminal added successfully", HttpStatus.CREATED, 201));
                }
                else{
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401));
                }
            }

        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageMaker(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, 500));
        }
    }

    @PostMapping("/addterminals")
    public ResponseEntity<?> addTerminals(@RequestHeader("Authorization") String jwt, @RequestBody TerminalRequest[] terminalRequests) {
        try{
            User user = userService.FindUserByJwt(jwt);

            System.out.println(user);

            if(user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401));
            }
            else{
                if (user.getRole().toString().equals("ROLE_ADMIN")){
                    for (TerminalRequest terminalRequest : terminalRequests) {
                        Terminal terminal = new Terminal();

                        terminal.setTerminalName(terminalRequest.getTerminalName());

                        Airport airport = airportService.getAirportByIata(terminalRequest.getIataCode());
                        if (airport == null) {
                            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageMaker("Airport not found", HttpStatus.NOT_FOUND, 404));
                        }
                        terminal.setAirport(airport);
                        terminalRepo.save(terminal);
                    }

                    return ResponseEntity.status(HttpStatus.CREATED).body(messageMaker("Terminals added successfully", HttpStatus.CREATED, 201));
                }
                else{
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401));
                }
            }

        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageMaker(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, 500));
        }
    }

    @GetMapping("/getterminal/{terminalId}/{airportId}")
    public ResponseEntity<?> getTerminal(@RequestHeader("Authorization") String jwt, @PathVariable String terminalId, @PathVariable String airportId) {
        try{
            User user = userService.FindUserByJwt(jwt);

            if(user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401));
            }
            else{
                Terminal terminal = terminalService.getTerminalByIataCodeAndTerminalName(terminalId, airportId);

                if (terminal == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageMaker("Terminal not found", HttpStatus.NOT_FOUND, 404));
                }

                return ResponseEntity.status(HttpStatus.OK).body(terminal);
            }
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageMaker(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, 500));
        }
    }

    @GetMapping("/getterminals")
    public ResponseEntity<?> getTerminals(@RequestHeader("Authorization") String jwt) {
        try{
            User user = userService.FindUserByJwt(jwt);

            if(user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(messageMaker("Unauthorized", HttpStatus.UNAUTHORIZED, 401));
            }
            else{
                return ResponseEntity.status(HttpStatus.OK).body(terminalRepo.findAll());
            }
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageMaker(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, 500));
        }
    }
}

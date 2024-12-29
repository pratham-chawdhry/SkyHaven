package com.dailycodebuffer.Controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.dailycodebuffer.Model.Airline;
import com.dailycodebuffer.Repository.AirlineRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dailycodebuffer.Config.JwtProvider;
import com.dailycodebuffer.Model.USER_ROLE;
import com.dailycodebuffer.Model.User;
import com.dailycodebuffer.Repository.UserRepo;
import com.dailycodebuffer.Request.LoginRequest;
import com.dailycodebuffer.Response.AuthResponse;
import com.dailycodebuffer.Service.CustomUserDetailService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepo userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private CustomUserDetailService customUserDetailService;

    @Autowired
    private AirlineRepo airlineRepo;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws Exception {
        System.out.println(user.getEmail());
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null) {
            throw new Exception("Email already exists");
        }

        User user2 = new User();
        user2.setEmail(user.getEmail());
        user2.setUsername(user.getUsername());
        user2.setRole(user.getRole());
        user2.setPassword(passwordEncoder.encode(user.getPassword()));
        user2.setActive(true);
        user2.setAirlineCode(user.getAirlineCode());

        if (user.getRole().equals(USER_ROLE.ROLE_AIRLINE)) {
            Airline airline = airlineRepo.findByAirlineCode(user.getAirlineCode());
            if (airline == null) {
                throw new Exception("Airline not found for code: " + user.getAirlineCode());
            }
            user2.setAirline(airline);

            // Ensure the relationship is updated
            List<User> users = airline.getUsers();
            if (users == null) {
                users = new ArrayList<>();
            }
            users.add(user2);
            airline.setUsers(users);
        }

        User savedUser = userRepository.save(user2);

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(savedUser.getRole().toString()));
        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                savedUser.getEmail(),
                savedUser.getPassword(),
                authorities
        );
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setToken(jwt);
        authResponse.setRole(user.getRole());
        authResponse.setMessage("Signup successful");

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse>loginUserHandler(@RequestBody LoginRequest req){
        String email = req.getEmail();
        String password = req.getPassword();
        try{
            Authentication authentication = authenticate(email, password);
            String jwt = jwtProvider.generateToken(authentication);
            AuthResponse authResponse = new AuthResponse();
            authResponse.setToken(jwt);
            // authResponse.setRole(.getRole());
            authResponse.setMessage("Login successful");
            Collection <? extends GrantedAuthority> authorities = authentication.getAuthorities();
            String role = authorities.isEmpty() ? null : authorities.iterator().next().getAuthority();
            authResponse.setRole(USER_ROLE.valueOf(role));
            return new ResponseEntity<>(authResponse, HttpStatus.OK);
        }
        catch (Exception e){
            throw new BadCredentialsException("Invalid username/password");
        }
    }

    private Authentication authenticate(String email, String password) throws Exception{
        UserDetails userDetails = customUserDetailService.loadUserByUsername(email);
        if (userDetails == null){
            throw new BadCredentialsException("Invalid username");
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())){
            throw new BadCredentialsException("Invalid password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
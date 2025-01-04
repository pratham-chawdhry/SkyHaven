package com.dailycodebuffer.Repository;

import com.dailycodebuffer.Model.Airline;
import org.springframework.data.jpa.repository.JpaRepository;

import com.dailycodebuffer.Model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByEmail(String email);

    public List<User> findByAirlineCode(String airlineCode);
}
package com.dailycodebuffer.Model;

import java.util.List;

import jakarta.annotation.Generated;
import jakarta.persistence.*;
import lombok.Data;
@Data
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String username;
    private String email;
    private String password;
    private boolean isActive;
    private USER_ROLE role;

    private String airlineCode;

    @ManyToOne
    @JoinColumn(name = "airline_id", nullable = true)
    private Airline airline;
}

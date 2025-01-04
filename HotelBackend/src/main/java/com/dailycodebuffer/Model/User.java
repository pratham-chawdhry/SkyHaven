package com.dailycodebuffer.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

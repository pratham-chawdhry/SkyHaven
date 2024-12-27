package com.dailycodebuffer.Model;

import com.dailycodebuffer.Response.Flight;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Airline {
    @Id
    @GeneratedValue
    private Long id;

    private String airlineName;

    @Column(unique = true)
    private String airlineCode;

    private byte[] data;

    @Column(length = 65535, columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "airline")
    @JsonIgnore
    private List<User> users;

    @OneToMany(mappedBy = "airline", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Flight> flights;
}

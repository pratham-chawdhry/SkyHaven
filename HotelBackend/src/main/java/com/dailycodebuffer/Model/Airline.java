package com.dailycodebuffer.Model;

import com.dailycodebuffer.Request.Flight;
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
    private List<User> users;

    @OneToMany(mappedBy = "airline", cascade = CascadeType.ALL)
    private List<Flight> flights;
}

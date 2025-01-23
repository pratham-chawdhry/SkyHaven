package com.dailycodebuffer.Model;

import com.dailycodebuffer.Response.Flight;
import com.dailycodebuffer.Response.FlightCabin;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@JsonIgnoreProperties({"flights", "flightCabins", "users"}) // Optional: ignore on serialization
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

    @OneToMany(mappedBy = "airline", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<User> users;

    @OneToMany(mappedBy = "airline", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Flight> flights;

    @OneToMany(mappedBy = "airline", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<FlightCabin> flightCabins;

    @OneToMany(mappedBy = "airline", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<CabinClassList> cabinClassLists;

    @OneToMany(mappedBy = "airline", cascade = CascadeType.ALL)
    private List<Discount> discounts;

    @Override
    public String toString() {
        return "Airline [id=" + id + ", airlineName=" + airlineName + ", airlineCode=" + airlineCode + "]";
    }
}

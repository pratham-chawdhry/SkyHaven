package com.dailycodebuffer.Model;

import com.dailycodebuffer.Model.Airline;
import com.dailycodebuffer.Response.Flight;
import com.dailycodebuffer.Response.FlightCabin;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class CabinClassList {
    @Id
    @GeneratedValue
    private Long id;

    private Long aisles;

    @ManyToOne
    @JoinColumn(name = "airline_id")
    private Airline airline;

//    @OneToMany(mappedBy = "cabinClassList", cascade = CascadeType.ALL)
//    @JsonIgnore
//    private List<FlightCabin> flightCabins = new ArrayList<>();

    @OneToMany(mappedBy = "cabinClassList", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Flight> flights = new ArrayList<>();

    @OneToMany(mappedBy = "cabinClassList", cascade = CascadeType.ALL)
    private List<CabinClass> cabinClasses = new ArrayList<>();

    public String toString() {
        return "CabinClassList [id=" + id + ", cabinClasses=" + cabinClasses + "]";
    }
}

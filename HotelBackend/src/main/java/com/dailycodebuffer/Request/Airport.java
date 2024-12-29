package com.dailycodebuffer.Request;

import com.dailycodebuffer.Response.Flight;
import com.dailycodebuffer.Response.Terminal;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Airport {
    @Id
    @GeneratedValue
    private Long airport_id;

    private String airportName;
    private String city;
    private String state;
    private String country;

    @Column(unique = true)
    private String iataCode;
    private String timezone;
    private String dst;

    @OneToMany(mappedBy = "airportArrival")
    @JsonIgnore
    private List<Flight> flightsArrival = new ArrayList<>();

    @OneToMany(mappedBy = "airportDeparture")
    @JsonIgnore
    private List<Flight> flightsDeparture = new ArrayList<>();

    @OneToMany(mappedBy = "airport")
    @JsonIgnore
    private List<Terminal> terminals = new ArrayList<>();

    @Override
    public String toString() {
        return "Airport [id=" + airport_id + ", airportName=" + airportName + ", city=" + city + ", state=" + state + ", country=" + country + ", iataCode" + iataCode + "timezone" + timezone + "dst" + dst + "]";
    }
}

package com.dailycodebuffer.Response;

import com.dailycodebuffer.Model.Airline;
import com.dailycodebuffer.Model.Row;
import com.dailycodebuffer.Request.Airport;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Data
@Entity
public class Flight{
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "terminalArrivalId", referencedColumnName = "terminalId", nullable = true)
    private Terminal terminalArrival;

    @ManyToOne
    @JoinColumn(name = "iataCodeArrival", referencedColumnName = "iataCode", nullable = false)
    private Airport airportArrival;

    @ManyToOne
    @JoinColumn(name = "terminalDepartureId", referencedColumnName = "terminalId", nullable = true)
    private Terminal terminalDeparture;

    @ManyToOne
    @JoinColumn(name = "iataCodeDeparture", referencedColumnName = "iataCode", nullable = false)
    private Airport airportDeparture;

    private LocalDateTime arrivalTime;
    private LocalDateTime departureTime;
    private String flightNumber;
    private String aircraftModel;

    @Setter
    @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Row> rows = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "airline_id", nullable = false)
    @JsonManagedReference
    private Airline airline;

    @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL)
    private List<FlightCabin> flightCabins = new ArrayList<>();

    @Override
    public String toString() {
        return "Flight [id=" + id +
                ", terminalArrival=" + terminalArrival +
                ", airportArrival=" + airportArrival +
                ", terminalDeparture=" + terminalDeparture +
                ", airportDeparture=" + airportDeparture +
                ", arrivalTime=" + arrivalTime +
                ", departureTime=" + departureTime +
                ", flightNumber=" + flightNumber +
                ", aircraftModel=" + aircraftModel +
                ", airline=" + airline + "]";
    }
}

package com.dailycodebuffer.Response;

import com.dailycodebuffer.Model.Airline;
import com.dailycodebuffer.Model.CabinClassList;
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

    private Integer firstClassPrice;
    private Integer businessClassPrice;
    private Integer economyClassPrice;
    private Integer premiumEconomyClassPrice;

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
    @JsonManagedReference
    private List<Row> rows = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "airline_id", nullable = false)
    private Airline airline;

    @ManyToOne
    @JoinColumn(name = "cabinClassList_id", nullable = false)
    private CabinClassList cabinClassList;

    @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL)
    private List<FlightCabin> flightCabins = new ArrayList<>();

    @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Booking> bookings;

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
                ", airline=" + airline +
                ", rows=" + rows +
                "]";
    }
}

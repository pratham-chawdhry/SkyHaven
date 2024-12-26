package com.dailycodebuffer.Request;

import com.dailycodebuffer.Model.Airline;
import com.dailycodebuffer.Model.Airlines;
import com.dailycodebuffer.Model.Row;
import com.dailycodebuffer.Model.Seat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Data
@Entity
public class Flight {
    @Id
    @GeneratedValue
    private Long id;
    private String iataArrival;
    private String iataDeparture;
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
    @JsonIgnore
    private Airline airline;
}

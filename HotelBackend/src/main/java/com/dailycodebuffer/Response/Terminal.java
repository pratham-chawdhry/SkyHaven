package com.dailycodebuffer.Response;

import com.dailycodebuffer.Request.Airport;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(
        name = "terminal",
        uniqueConstraints = @UniqueConstraint(columnNames = {"terminalName", "iataCode"})
)
public class Terminal {
    @Id
    @GeneratedValue
    private Long terminalId;
    private String terminalName;

    @ManyToOne
    @JoinColumn(name = "iataCode", nullable = false)
    @JsonBackReference("airport-terminals")
    private Airport airport;

    @OneToMany(mappedBy = "terminalArrival")
    @JsonIgnore
    private List<Flight> flightsArrival = new ArrayList<>();

    @OneToMany(mappedBy = "terminalDeparture")
    @JsonIgnore
    private List<Flight> flightsDeparture = new ArrayList<>();

    @Override
    public String toString() {
        return "Terminal [id=" + terminalId + ", terminalName=" + terminalName + "]";
    }
}
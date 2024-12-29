package com.dailycodebuffer.Response;

import com.dailycodebuffer.Model.Airline;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class FlightCabin {
    @Id
    @GeneratedValue
    private Long flightCabinId;

    private String cabinName;
    private String cabinCode;
    private String disabled;
    private Long startRow;
    private Long endRow;
    private Long price;

    @ManyToOne
    @JoinColumn(name = "airline_id", nullable = true)
    @JsonIgnore
    private Airline airline;

    @ManyToOne
    @JoinColumn(name = "flight_id", referencedColumnName = "id")
    @JsonIgnore
    private Flight flight;

    @Override
    public String toString() {
        return "FlightCabin [flightCabinId=" + flightCabinId +
                "cabinName=" + cabinName + ", cabinCode=" + cabinCode +
                "disabled=" + disabled + ", startRow=" + startRow +
                ", + endRow=" + endRow + ", airline=" + airline + ", flight=" + flight + "]";
    }
}

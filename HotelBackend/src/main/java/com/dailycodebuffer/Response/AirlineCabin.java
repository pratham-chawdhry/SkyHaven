package com.dailycodebuffer.Response;

import com.dailycodebuffer.Model.Airline;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class AirlineCabin {
    @Id
    @GeneratedValue
    private Long id;

    private String cabinName;
    private String cabinCode;

    @ManyToOne
    @JoinColumn(name = "airline_id", nullable = true)
    @JsonIgnore
    private Airline airline;
}

package com.dailycodebuffer.Request;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class AircraftModel {
    @Id
    @GeneratedValue
    private Long id;
    private String aircraftModelName;
//    private List<Long> seats;
}

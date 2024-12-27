package com.dailycodebuffer.Request;

import com.dailycodebuffer.Model.Airline;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class AirlineCabinRequest {
    private String cabinName;
    private String cabinCode;
    private Airline airline;
}

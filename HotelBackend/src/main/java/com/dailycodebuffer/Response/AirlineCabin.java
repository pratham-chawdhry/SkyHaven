package com.dailycodebuffer.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class AirlineCabin {
    @Id
    @GeneratedValue
    private Long id;

    private String cabinName;
    private String cabinCode;
}

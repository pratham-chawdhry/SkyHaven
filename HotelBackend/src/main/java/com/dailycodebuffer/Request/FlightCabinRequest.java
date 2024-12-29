package com.dailycodebuffer.Request;

import lombok.Data;

@Data
public class FlightCabinRequest {
    private String cabinName;
    private String cabinCode;
    private String disabled;
    private Long startRow;
    private Long endRow;
    private Long price;
}

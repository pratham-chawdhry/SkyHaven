package com.dailycodebuffer.Request;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
public class TerminalRequest {
    @Id
    @GeneratedValue
    private Long terminalId;
    private String terminalName;
    private String iataCode;
}

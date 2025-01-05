package com.dailycodebuffer.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Discount{
    @Id
    @GeneratedValue
    private Long id;

    private String discountName;
    private Integer discountPercentage;
    private Integer discountUpTo;

    @ManyToOne
    @JoinColumn(name = "airline_id", nullable = true)
    @JsonIgnore
    private Airline airline;
}

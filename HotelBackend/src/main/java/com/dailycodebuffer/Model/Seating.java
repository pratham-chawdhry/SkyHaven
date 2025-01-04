package com.dailycodebuffer.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Seating {
    @Id
    @GeneratedValue
    private Long id;

    private Integer numberOfRows;
    private Integer startRow;
    private Integer endRow;
    private Integer aislePrice;
    private Integer middlePrice;
    private Integer windowPrice;
    private Boolean extraLegroom;

    @ElementCollection
    private int[] seatSeating;

    @ManyToOne
    @JoinColumn(name = "cabin_class_id", nullable = true)
    @JsonBackReference
    private CabinClass cabinClass;

    public String toString() {
        return "Seating [id=" + id + ", numberOfRows=" + numberOfRows + ", startRow=" + startRow + ", endRow=" + endRow + ", aislePrice=" + aislePrice + ", middlePrice=" + middlePrice + ", windowPrice=" + windowPrice + ", extraLegroom=" + extraLegroom + ", seatSeating=" + seatSeating + ", cabinClass=" + cabinClass + "]";
    }
}

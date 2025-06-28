package com.dailycodebuffer.Model;

import com.dailycodebuffer.Response.Flight;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "flight_row")
public class Row {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "flight_id")
    @JsonBackReference
    private Flight flight;

    @Column(name = "seat_row_number")
    private Long seatRowNumber;

    @OneToMany(mappedBy = "row",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonManagedReference
    private List<Seat> seats = new ArrayList<>();

    public String toString() {
        return "Row [id=" + id + ", seatRowNumber=" + seatRowNumber + ", seats=" + seats + "]";
    }
}

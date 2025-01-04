package com.dailycodebuffer.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class CabinClass {
    @Id
    @GeneratedValue
    private Long id;

    private String cabinName;
    private String cabinCode;
    private Boolean disabled;

    @ManyToOne
    @JoinColumn(name = "cabin_class_list_id", nullable = true)
    @JsonIgnore
    private CabinClassList cabinClassList;

    @OneToMany(mappedBy = "cabinClass", cascade = CascadeType.ALL)
    private List<Seating> seating;

    public String toString() {
        return "CabinClass [id=" + id + ", cabinName=" + cabinName + ", cabinCode=" + cabinCode + "]";
    }
}

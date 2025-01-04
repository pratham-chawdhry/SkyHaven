package com.dailycodebuffer.Repository;

import com.dailycodebuffer.Model.Airline;
import com.dailycodebuffer.Model.CabinClassList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CabinClassListRepo extends JpaRepository<CabinClassList, Long> {
//    public CabinClassList findAllByAirline(Airline airline);
}

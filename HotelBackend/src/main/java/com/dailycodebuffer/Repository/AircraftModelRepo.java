package com.dailycodebuffer.Repository;

import com.dailycodebuffer.Request.AircraftModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AircraftModelRepo extends JpaRepository<AircraftModel, Long> {
    public AircraftModel findByAircraftModelName(String name);
}

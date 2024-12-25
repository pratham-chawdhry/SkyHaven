package com.dailycodebuffer.Service;

import com.dailycodebuffer.Repository.AircraftModelRepo;
import com.dailycodebuffer.Request.AircraftModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AircraftModelImpl implements AircraftModelService{

    @Autowired
    private AircraftModelRepo aircraftModelRepo;

    public AircraftModel getAircraftModelByName(String name){
        return aircraftModelRepo.findByAircraftModelName(name);
    }
}

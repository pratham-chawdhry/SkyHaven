package com.dailycodebuffer.Repository;

import com.dailycodebuffer.Response.Booking;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepo {
    public Booking findById(long id);
    public List<Booking> findByUserId(long userId);
}

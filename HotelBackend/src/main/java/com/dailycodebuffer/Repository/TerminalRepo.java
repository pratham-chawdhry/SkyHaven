package com.dailycodebuffer.Repository;

import com.dailycodebuffer.Request.Airport;
import com.dailycodebuffer.Response.Terminal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TerminalRepo extends JpaRepository<Terminal, Long> {
    public Terminal findByAirportAndTerminalName(Airport airport, String terminalName);
}

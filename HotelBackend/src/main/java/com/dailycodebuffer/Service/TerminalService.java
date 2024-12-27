package com.dailycodebuffer.Service;

import com.dailycodebuffer.Response.Terminal;

public interface TerminalService {
    public Terminal getTerminalByIataCodeAndTerminalName(String iataCode, String terminalName);
}

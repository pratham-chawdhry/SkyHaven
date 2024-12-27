package com.dailycodebuffer;

import it.ozimov.springboot.mail.configuration.EnableEmailTools;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableEmailTools
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}
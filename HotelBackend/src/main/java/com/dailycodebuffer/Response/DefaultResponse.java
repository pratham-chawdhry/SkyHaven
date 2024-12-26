package com.dailycodebuffer.Response;

import lombok.Data;

@Data
public class DefaultResponse {
    private String message;
    private String status;
    private Integer statusCode;
}

package com.dinesh.poc.pricecalculator.controller;

import com.dinesh.poc.pricecalculator.controller.error.ServiceError;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * ExceptionControllerAdvice
 */
@ControllerAdvice(basePackages = "com.dinesh.poc.pricecalculator.controller")
public class ExceptionControllerAdvice {

    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(Exception.class)
    public ServiceError onException(Exception e) {
        return new ServiceError("Request cannot be completed because of an error", e.getMessage());
    }

}

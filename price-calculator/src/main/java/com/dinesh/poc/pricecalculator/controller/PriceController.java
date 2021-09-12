package com.dinesh.poc.pricecalculator.controller;

import com.dinesh.poc.pricecalculator.model.PriceDetailDto;
import com.dinesh.poc.pricecalculator.service.PriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value = "/price/")
public class PriceController {

    @Autowired
    private PriceService priceService;

    @GetMapping("{productId}")
    public List<PriceDetailDto> getAllProductDetails(@PathVariable("productId") Long productId) throws Exception {
        return priceService.getPriceListForRange(productId);
    }

    @GetMapping("{productId}/{units}")
    public PriceDetailDto getAllProductPrice(@PathVariable("productId") Long productId, @PathVariable("units") Integer units) throws Exception {
        return priceService.getPriceForUnits(units, productId);
    }

}

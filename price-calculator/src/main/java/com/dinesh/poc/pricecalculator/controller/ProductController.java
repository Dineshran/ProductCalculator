package com.dinesh.poc.pricecalculator.controller;

import com.dinesh.poc.pricecalculator.model.ProductDtoWrapper;
import com.dinesh.poc.pricecalculator.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/product/")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("list")
    public ProductDtoWrapper getAllProductDetails() {

        return productService.getAllProductDetails();

    }

}

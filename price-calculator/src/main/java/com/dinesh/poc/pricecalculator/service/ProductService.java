package com.dinesh.poc.pricecalculator.service;

import com.dinesh.poc.pricecalculator.model.Product;
import com.dinesh.poc.pricecalculator.model.ProductDtoWrapper;

public interface ProductService {

    public ProductDtoWrapper getAllProductDetails();

    public Product findProduct(Long id) throws Exception;

}

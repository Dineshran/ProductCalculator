package com.dinesh.poc.pricecalculator.service;

import com.dinesh.poc.pricecalculator.model.Product;
import com.dinesh.poc.pricecalculator.model.ProductDto;
import com.dinesh.poc.pricecalculator.model.ProductDtoWrapper;
import com.dinesh.poc.pricecalculator.model.repo.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    @Cacheable("productlist")
    public ProductDtoWrapper getAllProductDetails() {

        ProductDtoWrapper products = new ProductDtoWrapper();
        List<ProductDto> productDtoList = productRepository.findAll().
                stream().map((product) -> modelMapper.map(product, ProductDto.class)).collect(Collectors.toList());
        products.getProductDtoList().addAll(productDtoList);
        return products;
    }

    @Override
    @Cacheable("product")
    public Product findProduct(Long id) throws Exception {
        return productRepository.findById(id).orElseThrow(
                () -> new Exception("Product Not Found")
        );
    }
}

package com.dinesh.poc.pricecalculator.data;

import com.dinesh.poc.pricecalculator.model.PriceDetailDto;
import com.dinesh.poc.pricecalculator.model.PriceDto;
import com.dinesh.poc.pricecalculator.model.Product;
import com.dinesh.poc.pricecalculator.model.ProductDto;
import com.dinesh.poc.pricecalculator.model.ProductDtoWrapper;
import com.dinesh.poc.pricecalculator.model.UnitDto;
import org.modelmapper.ModelMapper;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class ProductListDummy {

    public static List<Product> getProductList() {
        List<Product> products = new ArrayList<>();
        products.add(new Product(1L, "Penguin Ears", new BigDecimal( 175) , 20));
        products.add(new Product(2L, "Horseshoe", new BigDecimal( 825), 5));
        return products;
    }

    public static ProductDtoWrapper getProductListDto() {
        ModelMapper modelMapper = new ModelMapper();
        List<ProductDto> productDtos = new ArrayList<>();
        productDtos.add(modelMapper.map(new Product(1L, "Penguin Ears", new BigDecimal( 175) , 20), ProductDto.class));
        productDtos.add(modelMapper.map(new Product(2L, "Horseshoe", new BigDecimal( 825), 5), ProductDto.class));

        ProductDtoWrapper productDtoWrapper = new ProductDtoWrapper();
        productDtoWrapper.setProductDtoList(productDtos);
        return productDtoWrapper;
    }

    public static List<ProductDto> getProductListDtos() {
        ModelMapper modelMapper = new ModelMapper();
        List<ProductDto> productDtos = new ArrayList<>();
        productDtos.add(modelMapper.map(new Product(1L, "Penguin Ears", new BigDecimal( 175) , 20), ProductDto.class));
        productDtos.add(modelMapper.map(new Product(2L, "Horseshoe", new BigDecimal( 825), 5), ProductDto.class));
        return productDtos;
    }

    public static List<PriceDetailDto> getPriceDetailDto() {
        List<PriceDetailDto> priceDetailDtoList = new ArrayList<>();

        getProductList().forEach(product -> {
            PriceDetailDto priceDetailDto = new PriceDetailDto();
            priceDetailDto.setUnitDto(new UnitDto( 1, 10,
                    product.getNosPerCarton(), 20));
            priceDetailDto.setProductId(product.getId());
            priceDetailDto.setPriceDto(new PriceDto(new BigDecimal(10), new BigDecimal(20),
                    new BigDecimal(30), new BigDecimal(5)));
            priceDetailDtoList.add(priceDetailDto); });

        return priceDetailDtoList;

    }
}

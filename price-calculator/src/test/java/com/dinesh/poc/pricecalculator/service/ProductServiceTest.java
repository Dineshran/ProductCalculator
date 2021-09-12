package com.dinesh.poc.pricecalculator.service;

import com.dinesh.poc.pricecalculator.data.ProductListDummy;
import com.dinesh.poc.pricecalculator.model.Product;
import com.dinesh.poc.pricecalculator.model.ProductDtoWrapper;
import com.dinesh.poc.pricecalculator.model.repo.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService = spy(ProductServiceImpl.class);

    @Mock
    private ModelMapper modelMapper;

    private List<Product> products;

    private Optional<Product> product;


    @BeforeEach
    void setUp() {
        products = ProductListDummy.getProductList();
        product = products.stream().filter(m -> m.getId() == 1).findFirst();
    }

    @Test
    void findAllProducts() {
        when(productRepository.findAll()).thenReturn(products);
        when(modelMapper.map(any(), any())).thenReturn(ProductListDummy.getProductListDtos().get(0));
        ProductDtoWrapper products = productService.getAllProductDetails();
        assertNotNull(products);
        assertNotNull(products.getProductDtoList());
        assertEquals(2, products.getProductDtoList().size());
        assertEquals(20, products.getProductDtoList().get(0).getNosPerCarton());
    }

    @Test
    void getProduct() throws Exception {
        when(productRepository.findById(anyLong())).thenReturn(product);
        Product product = productService.findProduct(1L);
        assertNotNull(product);
    }

}
package com.dinesh.poc.pricecalculator.controller;

import com.dinesh.poc.pricecalculator.data.ProductListDummy;
import com.dinesh.poc.pricecalculator.model.repo.ProductRepository;
import com.dinesh.poc.pricecalculator.service.ProductService;
import com.dinesh.poc.pricecalculator.service.ProductServiceImpl;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(ProductController.class)
class ProductControllerTest {

    @Autowired
    private MockMvc mockController;

    @MockBean
    private ProductService productService;

    @Before
    public void setUp() throws Exception {

    }

    @Test
    void getAllProducts() throws Exception {
        when(productService.getAllProductDetails()).thenReturn(ProductListDummy.getProductListDto());
        mockController.perform(MockMvcRequestBuilders
                .get("/product/list"))
                .andDo(print())
                .andExpect(status().isOk());
    }

}
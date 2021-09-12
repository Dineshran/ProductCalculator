package com.dinesh.poc.pricecalculator.controller;

import com.dinesh.poc.pricecalculator.data.ProductListDummy;
import com.dinesh.poc.pricecalculator.model.repo.ProductRepository;
import com.dinesh.poc.pricecalculator.service.PriceService;
import com.dinesh.poc.pricecalculator.service.PriceServiceImpl;
import com.dinesh.poc.pricecalculator.service.ProductService;
import com.dinesh.poc.pricecalculator.service.ProductServiceImpl;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(PriceController.class)
class PriceControllerTest {

    @Autowired
    private MockMvc mockController;

    @MockBean
    private PriceService priceService;

    @Test
    void getProductPriceRange() throws Exception {
        when(priceService.getPriceListForRange(anyLong())).thenReturn(ProductListDummy.getPriceDetailDto());
        mockController.perform(MockMvcRequestBuilders
                        .get("/price/1"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void getProductPriceForUnits() throws Exception {
        when(priceService.getPriceForUnits(anyInt(), anyLong())).thenReturn(ProductListDummy.getPriceDetailDto().get(0));
        mockController.perform(MockMvcRequestBuilders
                        .get("/price/1/10"))
                .andDo(print())
                .andExpect(status().isOk());
    }

}
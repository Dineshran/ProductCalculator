package com.dinesh.poc.pricecalculator.service;

import com.dinesh.poc.pricecalculator.data.ProductListDummy;
import com.dinesh.poc.pricecalculator.model.PriceDetailDto;
import com.dinesh.poc.pricecalculator.model.Product;
import com.dinesh.poc.pricecalculator.model.repo.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.util.ReflectionTestUtils;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PriceServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private PriceService priceService = spy(PriceServiceImpl.class);

    private List<Product> products;

    private Optional<Product> product;


    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(priceService, "upToQuantity", 20);
        ReflectionTestUtils.setField(priceService, "manualCompansate", new BigDecimal(0.3));
        ReflectionTestUtils.setField(priceService, "discount", new BigDecimal(0.1));
        products = ProductListDummy.getProductList();
        product = products.stream().filter(m -> m.getId() == 1).findFirst();
    }

    @Test
    void getPriceForUnits() throws Exception {
        when(productRepository.findById(anyLong())).thenReturn(product);
        PriceDetailDto priceDto = priceService.getPriceForUnits( 10, 1L);
        assertNotNull(priceDto);
        assertNotNull(priceDto.getUnitDto());
        assertNotNull(priceDto.getPriceDto());
        assertEquals(10, priceDto.getUnitDto().getSingleUnits());
        assertEquals(new BigDecimal(175), priceDto.getPriceDto().getCartonCost());
    }

    @Test
    void getPriceForRange() throws Exception {
        when(productRepository.findById(anyLong())).thenReturn(product);
        List<PriceDetailDto> priceDtos = priceService.getPriceListForRange(1L);
        assertNotNull(priceDtos);
        assertEquals(20, priceDtos.size());
        assertEquals(1, priceDtos.get(0).getUnitDto().getSingleUnits());
    }

}
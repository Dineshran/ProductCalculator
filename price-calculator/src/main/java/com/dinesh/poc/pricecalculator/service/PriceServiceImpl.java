package com.dinesh.poc.pricecalculator.service;

import com.dinesh.poc.pricecalculator.model.PriceDetailDto;
import com.dinesh.poc.pricecalculator.model.PriceDto;
import com.dinesh.poc.pricecalculator.model.Product;
import com.dinesh.poc.pricecalculator.model.UnitDto;
import com.dinesh.poc.pricecalculator.model.repo.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
public class PriceServiceImpl implements PriceService {

    @Autowired
    private ProductRepository productRepository;

    @Value("${price.calculator.product.price.quantity}")
    private Integer upToQuantity;

    @Value("${price.calculator.laber.charge}")
    private BigDecimal manualCompansate;

    @Value("${price.calculator.carton.discount}")
    private BigDecimal discount;

    @Override
    @Cacheable("pricedata")
    public PriceDetailDto getPriceForUnits(Integer units, Long productId) throws Exception {
        Product product = productRepository.findById(productId).orElseThrow(
                () -> new Exception("Product not found - " + productId));

        UnitDto unitDetail = getUnitDetails(units, product.getNosPerCarton());

        PriceDto priceDto = applyPriceCalculation(unitDetail, product.getPrice());

        return new PriceDetailDto(product.getId() , unitDetail , priceDto);

    }

    @Override
    @Cacheable("pricelist")
    public List<PriceDetailDto> getPriceListForRange(Long productId) throws Exception {

        Product product = productRepository.findById(productId).orElseThrow(
                () -> new Exception("Product not found - " + productId));

        List<PriceDetailDto> priceList = new ArrayList<>();
        for (int i = 1; i <= upToQuantity; i++) {

            UnitDto unitDetail = getUnitDetails(i , product.getNosPerCarton());

            PriceDto priceDto = applyPriceCalculation(unitDetail, product.getPrice());

            priceList.add(new PriceDetailDto(product.getId() , unitDetail , priceDto));

        }
        return priceList;
    }


    private PriceDto applyPriceCalculation(UnitDto unitDetail, BigDecimal price) {
        BigDecimal totalPrice = null;
        BigDecimal originalPrice = null;

        int cartons = unitDetail.getCartons();
        int singleUnits = unitDetail.getSingleUnits();
        int nosInCarton = unitDetail.getUnitPerCarton();

        PriceDto priceDto = new PriceDto();

        if (cartons > 2) {

            priceDto.setCartonCost(calculateCartonDiscountPrice(price));
            priceDto.setPerUnitCost(calculateSingleUnitPrice(price, nosInCarton));

            totalPrice = calculateCartonDiscountPrice(price).
                    multiply(new BigDecimal(cartons)).
                    add((calculateSingleUnitPrice(price, nosInCarton).
                            multiply(new BigDecimal(singleUnits)))).setScale(2);

            originalPrice = price.multiply(new BigDecimal(cartons)).
                            add((calculateSingleUnitPrice(price, nosInCarton).
                                    multiply(new BigDecimal(singleUnits)))).setScale(2);

            priceDto.setTotalCost(totalPrice);
            priceDto.setDiscount(originalPrice.subtract(totalPrice));

        } else if (cartons == 0) {
            priceDto.setCartonCost(price);
            priceDto.setPerUnitCost(calculateSingleUnitPrice(price, nosInCarton));

            totalPrice = calculateSingleUnitPrice(price, nosInCarton).
                    multiply(new BigDecimal(singleUnits)).setScale(2);

            priceDto.setTotalCost(totalPrice);
        } else {
            priceDto.setCartonCost(price);
            priceDto.setPerUnitCost(calculateSingleUnitPrice(price, nosInCarton));

            totalPrice = price.multiply(new BigDecimal(cartons)).
                    add((calculateSingleUnitPrice(price, nosInCarton).
                            multiply(new BigDecimal(singleUnits)))).setScale(2);

            priceDto.setTotalCost(totalPrice);
        }

        return priceDto;
    }

    private BigDecimal calculateCartonDiscountPrice(BigDecimal price) {
        return price.subtract(price.multiply(discount));
    }

    private BigDecimal calculateSingleUnitPrice(BigDecimal price, Integer nosPerCarton) {
        BigDecimal additionalPrice = price.add(price.multiply(manualCompansate));
        return additionalPrice.divide(new BigDecimal(nosPerCarton)).setScale(2, RoundingMode.HALF_EVEN);
    }

    private UnitDto getUnitDetails(Integer totalQuantity, Integer nosPerCarton) {
        return new UnitDto(totalQuantity/nosPerCarton,
                totalQuantity%nosPerCarton, nosPerCarton , totalQuantity);
    }
}

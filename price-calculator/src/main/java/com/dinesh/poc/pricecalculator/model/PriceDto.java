package com.dinesh.poc.pricecalculator.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PriceDto {

    private BigDecimal perUnitCost = BigDecimal.ZERO;

    private BigDecimal cartonCost = BigDecimal.ZERO;

    private BigDecimal totalCost = BigDecimal.ZERO;

    private BigDecimal discount = BigDecimal.ZERO;

}

package com.dinesh.poc.pricecalculator.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UnitDto implements Serializable {

    private Integer cartons;
    private Integer singleUnits;
    private Integer unitPerCarton;
    private Integer totalQuantity;

}

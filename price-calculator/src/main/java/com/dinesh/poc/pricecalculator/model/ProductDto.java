package com.dinesh.poc.pricecalculator.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.math.BigDecimal;

@Data
public class ProductDto implements Serializable {

    private Long id;

    private String name;

    private BigDecimal price;

    private Integer nosPerCarton;
}

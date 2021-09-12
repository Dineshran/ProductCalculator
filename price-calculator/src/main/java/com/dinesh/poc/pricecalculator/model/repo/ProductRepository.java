package com.dinesh.poc.pricecalculator.model.repo;

import com.dinesh.poc.pricecalculator.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}

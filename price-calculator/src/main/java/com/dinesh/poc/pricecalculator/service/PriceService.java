package com.dinesh.poc.pricecalculator.service;

import com.dinesh.poc.pricecalculator.model.PriceDetailDto;
import javassist.NotFoundException;

import java.util.List;

public interface PriceService {

    PriceDetailDto getPriceForUnits(Integer units, Long productId) throws Exception;

    List<PriceDetailDto> getPriceListForRange(Long productId) throws Exception;

}

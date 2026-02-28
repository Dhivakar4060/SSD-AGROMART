package com.agromart.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/market-insights")
public class MarketInsightsController {

    @GetMapping("/prices")
    public List<Map<String, Object>> getMarketPrices() {
        List<Map<String, Object>> prices = new ArrayList<>();
        
        prices.add(createPriceMap("Wheat", 2200.0, 2150.0, "Quintal", "+2.5%"));
        prices.add(createPriceMap("Rice (Basmati)", 4500.0, 4600.0, "Quintal", "-1.2%"));
        prices.add(createPriceMap("Tomato", 35.0, 30.0, "Kg", "+16.6%"));
        prices.add(createPriceMap("Potato", 18.0, 20.0, "Kg", "-10.0%"));
        prices.add(createPriceMap("Onion", 25.0, 22.0, "Kg", "+13.6%"));
        
        return prices;
    }

    @GetMapping("/trends")
    public Map<String, Object> getMarketTrends() {
        Map<String, Object> trends = new HashMap<>();
        
        List<String> months = List.of("Oct", "Nov", "Dec", "Jan", "Feb");
        trends.put("labels", months);
        
        List<Map<String, Object>> datasets = new ArrayList<>();
        datasets.add(createDataset("Wheat", List.of(2000, 2100, 2050, 2150, 2200), "#198754"));
        datasets.add(createDataset("Rice", List.of(4200, 4300, 4400, 4550, 4500), "#ffc107"));
        
        trends.put("datasets", datasets);
        return trends;
    }

    private Map<String, Object> createPriceMap(String crop, double current, double previous, String unit, String change) {
        Map<String, Object> map = new HashMap<>();
        map.put("crop", crop);
        map.put("currentPrice", current);
        map.put("previousPrice", previous);
        map.put("unit", unit);
        map.put("change", change);
        map.put("status", current >= previous ? "UP" : "DOWN");
        return map;
    }

    private Map<String, Object> createDataset(String label, List<Integer> data, String color) {
        Map<String, Object> dataset = new HashMap<>();
        dataset.put("label", label);
        dataset.put("data", data);
        dataset.put("borderColor", color);
        dataset.put("backgroundColor", color + "1A"); // 10% opacity
        dataset.put("tension", 0.4);
        dataset.put("fill", true);
        return dataset;
    }
}

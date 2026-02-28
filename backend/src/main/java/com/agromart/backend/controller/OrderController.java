package com.agromart.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.agromart.backend.entity.Order;
import com.agromart.backend.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;
    public OrderController(OrderService orderService) {
    	this.orderService=orderService;
    }

    @PostMapping("/place/{customerId}")
    public ResponseEntity<Order> placeOrder(
            @PathVariable Long customerId,
            @RequestBody Map<String, Object> orderData
    ) {
        List<Map<String, Object>> items = (List<Map<String, Object>>) orderData.get("items");
        String address = (String) orderData.get("address");
        return ResponseEntity.ok(orderService.placeOrder(customerId, items, address));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Order>> getCustomerOrders(@PathVariable Long customerId) {
        return ResponseEntity.ok(orderService.getCustomerOrders(customerId));
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestParam Order.OrderStatus status
    ) {
        return ResponseEntity.ok(orderService.updateOrderStatus(orderId, status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }
}

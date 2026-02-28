package com.agromart.backend.service;

import com.agromart.backend.entity.Order;
import com.agromart.backend.entity.OrderItem;
import com.agromart.backend.entity.Product;
import com.agromart.backend.entity.User;
import com.agromart.backend.repository.OrderRepository;
import com.agromart.backend.repository.ProductRepository;
import com.agromart.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;
    @Mock
    private ProductRepository productRepository;
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private OrderService orderService;

    private User customer;
    private Product product;

    @BeforeEach
    void setUp() {
        customer = new User();
        customer.setId(1L);
        customer.setEmail("customer@test.com");

        product = new Product();
        product.setId(1L);
        product.setName("Tomatoes");
        product.setPrice(40.0);
        product.setStock(100);
    }

    @Test
    void placeOrder_Success() {
        // Arrange
        List<Map<String, Object>> items = new ArrayList<>();
        Map<String, Object> item = new HashMap<>();
        item.put("productId", 1L);
        item.put("quantity", 5);
        items.add(item);

        when(userRepository.findById(1L)).thenReturn(Optional.of(customer));
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(orderRepository.save(any(Order.class))).thenAnswer(i -> i.getArguments()[0]);

        // Act
        Order result = orderService.placeOrder(1L, items, "Test Address");

        // Assert
        assertNotNull(result);
        assertEquals(200.0, result.getTotalAmount());
        assertEquals(95, product.getStock());
        verify(orderRepository).save(any(Order.class));
    }

    @Test
    void placeOrder_InsufficientStock_ThrowsException() {
        // Arrange
        List<Map<String, Object>> items = new ArrayList<>();
        Map<String, Object> item = new HashMap<>();
        item.put("productId", 1L);
        item.put("quantity", 150);
        items.add(item);

        when(userRepository.findById(1L)).thenReturn(Optional.of(customer));
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        // Act & Assert
        assertThrows(RuntimeException.class, () -> 
            orderService.placeOrder(1L, items, "Test Address")
        );
        verify(orderRepository, never()).save(any(Order.class));
    }
}

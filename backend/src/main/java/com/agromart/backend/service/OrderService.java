package com.agromart.backend.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.agromart.backend.entity.Order;
import com.agromart.backend.entity.OrderItem;
import com.agromart.backend.entity.Product;
import com.agromart.backend.entity.User;
import com.agromart.backend.repository.OrderRepository;
import com.agromart.backend.repository.ProductRepository;
import com.agromart.backend.repository.UserRepository;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    
    

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository,
			UserRepository userRepository) {
		this.orderRepository = orderRepository;
		this.productRepository = productRepository;
		this.userRepository = userRepository;
	}

	@Transactional
    public Order placeOrder(Long customerId, List<Map<String, Object>> items, String shippingAddress) {
        User customer = userRepository.findById(customerId).orElseThrow();

        Order order = new Order();
        order.setCustomer(customer);
        order.setOrderDate(LocalDateTime.now());
        order.setShippingAddress(shippingAddress);

        List<OrderItem> orderItems = new ArrayList<>();
        double totalAmount = 0;

        for (Map<String, Object> itemData : items) {
            Long productId = Long.valueOf(itemData.get("productId").toString());
            Integer quantity = Integer.valueOf(itemData.get("quantity").toString());

            Product product = productRepository.findById(productId).orElseThrow();

            if (product.getStock() < quantity) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName());
            }

            // Update stock
            product.setStock(product.getStock() - quantity);
            productRepository.save(product);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(quantity);
            orderItem.setPrice(product.getPrice());

            orderItems.add(orderItem);
            totalAmount += product.getPrice() * quantity;
        }

        order.setItems(orderItems);
        order.setTotalAmount(totalAmount);

        Order savedOrder = orderRepository.save(order);

        

        return savedOrder;
    }

    public List<Order> getCustomerOrders(Long customerId) {
        User customer = userRepository.findById(customerId).orElseThrow();
        return orderRepository.findByCustomer(customer);
    }

    public Order updateOrderStatus(Long orderId, Order.OrderStatus status) {
        Order order = orderRepository.findById(orderId).orElseThrow();
        order.setStatus(status);
        return orderRepository.save(order);
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElseThrow();
    }
}

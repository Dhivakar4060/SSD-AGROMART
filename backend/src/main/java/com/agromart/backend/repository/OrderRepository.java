package com.agromart.backend.repository;

import com.agromart.backend.entity.Order;
import com.agromart.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomer(User customer);
}

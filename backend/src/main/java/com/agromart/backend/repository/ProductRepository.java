package com.agromart.backend.repository;

import com.agromart.backend.entity.Product;
import com.agromart.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByFarmer(User farmer);
    List<Product> findByCategory(String category);
    List<Product> findByStatus(String status);
}

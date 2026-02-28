package com.agromart.backend.repository;

import com.agromart.backend.entity.Product;
import com.agromart.backend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProduct(Product product);
}

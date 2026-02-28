package com.agromart.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.agromart.backend.entity.Product;
import com.agromart.backend.entity.Review;
import com.agromart.backend.entity.User;
import com.agromart.backend.repository.ProductRepository;
import com.agromart.backend.repository.ReviewRepository;
import com.agromart.backend.repository.UserRepository;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    public ReviewService(ReviewRepository reviewRepository, ProductRepository productRepository, UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public Review addReview(Long productId, Long userId, Integer rating, String comment) {
        Product product = productRepository.findById(productId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();

        Review review = new Review();
        review.setProduct(product);
        review.setUser(user);
        review.setRating(rating);
        review.setComment(comment);
        review.setDate(LocalDateTime.now());

        return reviewRepository.save(review);
    }

    public List<Review> getProductReviews(Long productId) {
        Product product = productRepository.findById(productId).orElseThrow();
        return reviewRepository.findByProduct(product);
    }

    public Double getAverageRating(Long productId) {
        List<Review> reviews = getProductReviews(productId);
        if (reviews.isEmpty()) return 0.0;
        
        return reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);
    }
}

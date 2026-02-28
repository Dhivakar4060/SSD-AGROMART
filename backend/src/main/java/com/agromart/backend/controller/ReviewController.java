package com.agromart.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agromart.backend.entity.Review;
import com.agromart.backend.service.ReviewService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;


@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    private final ReviewService reviewService;
    public  ReviewController (ReviewService reviewService) {
    	this.reviewService=reviewService;
    }

    @PostMapping("/add/{productId}/{userId}")
    public ResponseEntity<Review> addReview(
            @PathVariable Long productId,
            @PathVariable Long userId,
            @RequestBody Map<String, Object> reviewData
    ) {
        Integer rating = (Integer) reviewData.get("rating");
        String comment = (String) reviewData.get("comment");
        return ResponseEntity.ok(reviewService.addReview(productId, userId, rating, comment));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getProductReviews(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewService.getProductReviews(productId));
    }

    @GetMapping("/product/{productId}/average")
    public ResponseEntity<Double> getAverageRating(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewService.getAverageRating(productId));
    }
}

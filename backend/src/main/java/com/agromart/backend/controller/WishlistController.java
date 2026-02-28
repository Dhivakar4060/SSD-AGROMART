package com.agromart.backend.controller;

import com.agromart.backend.entity.WishlistItem;
import com.agromart.backend.service.WishlistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {
    private final WishlistService wishlistService;
    public WishlistController(WishlistService wishlistService) {
    	this.wishlistService=wishlistService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<WishlistItem>> getWishlist(@PathVariable Long userId) {
        return ResponseEntity.ok(wishlistService.getWishlist(userId));
    }

    @PostMapping("/{userId}/add/{productId}")
    public ResponseEntity<WishlistItem> addToWishlist(@PathVariable Long userId, @PathVariable Long productId) {
        return ResponseEntity.ok(wishlistService.addToWishlist(userId, productId));
    }

    @DeleteMapping("/{userId}/remove/{productId}")
    public ResponseEntity<Void> removeFromWishlist(@PathVariable Long userId, @PathVariable Long productId) {
        wishlistService.removeFromWishlist(userId, productId);
        return ResponseEntity.ok().build();
    }
}

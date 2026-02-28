package com.agromart.backend.service;

import com.agromart.backend.entity.Product;
import com.agromart.backend.entity.User;
import com.agromart.backend.entity.WishlistItem;
import com.agromart.backend.repository.ProductRepository;
import com.agromart.backend.repository.UserRepository;
import com.agromart.backend.repository.WishlistItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class WishlistService {
    private final WishlistItemRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    public WishlistService(WishlistItemRepository wishlistRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.wishlistRepository = wishlistRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    public List<WishlistItem> getWishlist(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return wishlistRepository.findByUser(user);
    }

    @Transactional
    public WishlistItem addToWishlist(Long userId, Long productId) {
        User user = userRepository.findById(userId).orElseThrow();
        Product product = productRepository.findById(productId).orElseThrow();

        if (wishlistRepository.findByUserAndProduct(user, product).isPresent()) {
            return null; // Already exists
        }

        WishlistItem item = new WishlistItem();
        user.setVerified(user.isVerified()); // Keep it just to avoid any lazy loading issue
        item.setUser(user);
        item.setProduct(product);
        item.setAddedDate(LocalDateTime.now());
        
        return wishlistRepository.save(item);
    }

    @Transactional
    public void removeFromWishlist(Long userId, Long productId) {
        User user = userRepository.findById(userId).orElseThrow();
        Product product = productRepository.findById(productId).orElseThrow();
        wishlistRepository.deleteByUserAndProduct(user, product);
    }
}

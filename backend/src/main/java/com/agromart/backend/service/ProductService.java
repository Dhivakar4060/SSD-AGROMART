package com.agromart.backend.service;

import com.agromart.backend.entity.Product;
import com.agromart.backend.entity.User;
import com.agromart.backend.repository.ProductRepository;
import com.agromart.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ProductService(ProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findByStatus("ACTIVE");
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public List<Product> getFarmerProducts(Long farmerId) {
        User farmer = userRepository.findById(farmerId)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));
        return productRepository.findByFarmer(farmer);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Product addProduct(Product product, Long farmerId) {
        User farmer = userRepository.findById(farmerId)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));
        product.setFarmer(farmer);
        product.setStatus("ACTIVE");
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(productDetails.getName());
        product.setPrice(productDetails.getPrice());
        product.setStock(productDetails.getStock());
        product.setCategory(productDetails.getCategory());
        product.setUnit(productDetails.getUnit());
        product.setDescription(productDetails.getDescription());
        if (productDetails.getImageUrl() != null) {
            product.setImageUrl(productDetails.getImageUrl());
        }
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setStatus("DELETED");
        productRepository.save(product);
    }
}

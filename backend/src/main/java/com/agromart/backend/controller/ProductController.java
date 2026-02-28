package com.agromart.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.agromart.backend.entity.Product;
import com.agromart.backend.service.FileStorageService;
import com.agromart.backend.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final FileStorageService fileStorageService;

    public ProductController(ProductService productService, FileStorageService fileStorageService) {
        this.productService = productService;
        this.fileStorageService = fileStorageService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(productService.getProductsByCategory(category));
    }

    @GetMapping("/farmer/{farmerId}")
    public ResponseEntity<List<Product>> getFarmerProducts(@PathVariable Long farmerId) {
        return ResponseEntity.ok(productService.getFarmerProducts(farmerId));
    }

    @PostMapping(value = "/farmer/{farmerId}", consumes = { "multipart/form-data" })
    public ResponseEntity<Product> addProduct(
            @RequestPart("product") Product product,
            @RequestPart(value = "image", required = false) MultipartFile image,
            @PathVariable Long farmerId) {

        if (image != null && !image.isEmpty()) {
            String fileName = fileStorageService.storeFile(image);
            product.setImageUrl("/uploads/" + fileName);
        }

        return ResponseEntity.ok(productService.addProduct(product, farmerId));
    }

    @PutMapping(value = "/{id}", consumes = { "multipart/form-data" })
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestPart("product") Product product,
            @RequestPart(value = "image", required = false) MultipartFile image) throws Exception {

        if (image != null && !image.isEmpty()) {
            String fileName = fileStorageService.storeFile(image);
            product.setImageUrl("/uploads/" + fileName);
        }

        return ResponseEntity.ok(productService.updateProduct(id, product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }
}

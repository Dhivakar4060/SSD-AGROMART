package com.agromart.backend.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "products")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Integer stock;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String unit;

    @Column(length = 1000)
    private String description;

    @ManyToOne
    @JoinColumn(name = "farmer_id", nullable = false)
    private User farmer;

    private String imageUrl;

    private String status = "ACTIVE";

    public Product() {}
   

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Integer getStock() {
		return stock;
	}

	public void setStock(Integer stock) {
		this.stock = stock;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public User getFarmer() {
		return farmer;
	}

	public void setFarmer(User farmer) {
		this.farmer = farmer;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
    
    
}

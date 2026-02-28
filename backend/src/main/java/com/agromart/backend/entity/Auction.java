package com.agromart.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "auctions")
public class Auction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String cropName;

    @Column(nullable = false)
    private String quantity;

    @Column(nullable = false)
    private Double basePrice;

    private Double currentBid;

    @Column(nullable = false)
    private LocalDateTime endTime;

    @ManyToOne
    @JoinColumn(name = "farmer_id", nullable = false)
    private User farmer;

    private String status = "ACTIVE"; // ACTIVE, COMPLETED, CANCELLED
    
    public Auction() {}
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }
    public String getQuantity() { return quantity; }
    public void setQuantity(String quantity) { this.quantity = quantity; }
    public Double getBasePrice() { return basePrice; }
    public void setBasePrice(Double basePrice) { this.basePrice = basePrice; }
    public Double getCurrentBid() { return currentBid; }
    public void setCurrentBid(Double currentBid) { this.currentBid = currentBid; }
    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    public User getFarmer() { return farmer; }
    public void setFarmer(User farmer) { this.farmer = farmer; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}

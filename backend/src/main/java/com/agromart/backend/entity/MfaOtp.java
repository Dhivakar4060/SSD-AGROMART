package com.agromart.backend.entity;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "mfa_otps")
public class MfaOtp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 6, nullable = false)
    private String otp;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private LocalDateTime expiryDate;

    private int attempts;

    public boolean isExpired() {
        return expiryDate.isBefore(LocalDateTime.now());
    }
    
    public MfaOtp() {}
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getOtp() { return otp; }
    public void setOtp(String otp) { this.otp = otp; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public LocalDateTime getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDateTime expiryDate) { this.expiryDate = expiryDate; }
    public int getAttempts() { return attempts; }
    public void setAttempts(int attempts) { this.attempts = attempts; }
}

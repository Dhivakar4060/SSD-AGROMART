package com.agromart.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.agromart.backend.entity.MfaOtp;
import com.agromart.backend.entity.User;

@Repository
public interface MfaOtpRepository extends JpaRepository<MfaOtp, Long> {

    Optional<MfaOtp> findByUser(User user);

    Optional<MfaOtp> findByUserIdAndOtp(Long userId, String otp);
}

package com.agromart.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.agromart.backend.dto.AuthenticationRequest;
import com.agromart.backend.dto.AuthenticationResponse;
import com.agromart.backend.dto.RegisterRequest;
import com.agromart.backend.entity.PasswordResetToken;
import com.agromart.backend.entity.User;
import com.agromart.backend.repository.PasswordResetTokenRepository;
import com.agromart.backend.repository.UserRepository;
import com.agromart.backend.security.JwtService;


@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    
    public AuthenticationService(UserRepository userRepository,
                                 PasswordResetTokenRepository tokenRepository,
                                 PasswordEncoder passwordEncoder,
                                 JwtService jwtService,
                                 AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Value("${app.frontend-url}")
    private String frontendUrl;


    // ================= REGISTER =================
    public AuthenticationResponse register(RegisterRequest request) {

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setPhone(request.getPhone());
        user.setLocation(request.getLocation());
        user.setVerified(true);
        user.setRating(0.0);

        userRepository.save(user);

        AuthenticationResponse response = new AuthenticationResponse();
        response.setEmail(user.getEmail());
        return response;
    }

    // ================= LOGIN STEP 1: SEND OTP =================
    public AuthenticationResponse authenticate(AuthenticationRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isVerified()) {
            throw new RuntimeException("Account not verified");
        }

        // Always generate JWT immediately (MFA disabled)
        return generateJwtResponse(user);
    }


    // ================= FORGOT PASSWORD =================
    public String forgotPassword(String email) {

        return userRepository.findByEmail(email).map(user -> {

            tokenRepository.findByUser(user)
                    .ifPresent(tokenRepository::delete);

            String token = UUID.randomUUID().toString();

            PasswordResetToken resetToken = new PasswordResetToken();
            resetToken.setToken(token);
            resetToken.setUser(user);
            resetToken.setExpiryDate(LocalDateTime.now().plusHours(24));

            tokenRepository.save(resetToken);

            String resetLink = frontendUrl + "/reset-password?token=" + token;

            return resetLink;
        }).orElse(null);
    }

    // ================= RESET PASSWORD =================
    @Transactional
    public void resetPassword(String token, String newPassword) {

        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (resetToken.isExpired()) {
            tokenRepository.delete(resetToken);
            throw new RuntimeException("Token expired");
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        tokenRepository.delete(resetToken);
    }

    // ================= HELPER: JWT =================
    private AuthenticationResponse generateJwtResponse(User user) {

        List<GrantedAuthority> authorities = List.of(
                new SimpleGrantedAuthority("ROLE_" + user.getRole().name())
        );

        String jwtToken = jwtService.generateToken(
                new org.springframework.security.core.userdetails.User(
                        user.getEmail(),
                        user.getPassword(),
                        authorities
                )
        );
        AuthenticationResponse.UserResponse userResp = new AuthenticationResponse.UserResponse(
                user.getId(), user.getName(), user.getEmail(), user.getRole().name()
        );
        AuthenticationResponse response = new AuthenticationResponse();
        response.setToken(jwtToken);
        response.setUser(userResp);
        return response;
    }
}

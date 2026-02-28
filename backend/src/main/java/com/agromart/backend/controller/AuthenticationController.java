package com.agromart.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.agromart.backend.dto.AuthenticationRequest;
import com.agromart.backend.dto.AuthenticationResponse;
import com.agromart.backend.dto.RegisterRequest;
import com.agromart.backend.service.AuthenticationService;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationService service;
    public AuthenticationController(AuthenticationService service) {
        this.service = service;
    }
    

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        String link = service.forgotPassword(email);
        return ResponseEntity.ok(link != null ? link : "");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        service.resetPassword(token, newPassword);
        return ResponseEntity.ok().build();
    }
}

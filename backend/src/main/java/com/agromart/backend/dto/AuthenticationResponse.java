package com.agromart.backend.dto;

public class AuthenticationResponse {
    private String token;
    private UserResponse user;
    private String email;

    public AuthenticationResponse() {}

    public AuthenticationResponse(String token, UserResponse user, String email) {
        this.token = token;
        this.user = user;
        this.email = email;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public UserResponse getUser() { return user; }
    public void setUser(UserResponse user) { this.user = user; }


    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public static class UserResponse {
        private Long id;
        private String name;
        private String email;
        private String role;

        public UserResponse() {}

        public UserResponse(Long id, String name, String email, String role) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.role = role;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
    }
}

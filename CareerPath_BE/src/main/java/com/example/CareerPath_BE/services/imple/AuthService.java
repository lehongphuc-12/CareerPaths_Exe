package com.example.CareerPath_BE.services.imple;

import com.example.CareerPath_BE.dtos.Auth.LoginRequest;
import com.example.CareerPath_BE.dtos.Auth.RegisterRequest;
import com.example.CareerPath_BE.dtos.Auth.AuthResponse;
import com.example.CareerPath_BE.services.IAuthService;

import org.springframework.stereotype.Service;

@Service
public class AuthService implements IAuthService {
    @Override
    public AuthResponse login(LoginRequest request) {
        return null;
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        return null;
    }
}

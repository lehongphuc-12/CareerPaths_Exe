package com.example.CareerPath_BE.controllers;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CareerPath_BE.config.JwtUtil;
import com.example.CareerPath_BE.dtos.ApiResponse;
import com.example.CareerPath_BE.dtos.User.UpdateProfileRequest;
import com.example.CareerPath_BE.dtos.User.UserDetailResponse;
import com.example.CareerPath_BE.services.imple.UserService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @GetMapping("/profile/{id}")
    public ResponseEntity<ApiResponse<UserDetailResponse>> getProfile(@PathVariable int id) {
        UserDetailResponse userDetailResponse = userService.getUserProfile(id);
        return ResponseEntity.ok(ApiResponse.<UserDetailResponse>builder()
                .code(200)
                .message("Get profile successfully")
                .data(userDetailResponse)
                .build());
    }

    @GetMapping("/profile/me")
    public ResponseEntity<ApiResponse<UserDetailResponse>> getMyProfile(@CookieValue("token") String token) {
        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body(ApiResponse.<UserDetailResponse>builder()
                    .code(401)
                    .message("Invalid token")
                    .build());
        }
        int id = jwtUtil.extractUserId(token).intValue();
        UserDetailResponse userDetailResponse = userService.getUserProfile(id);
        return ResponseEntity.ok(ApiResponse.<UserDetailResponse>builder()
                .code(200)
                .message("Get profile successfully")
                .data(userDetailResponse)
                .build());
    }

    @PutMapping(value = "/profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<UserDetailResponse>> updateProfile(
            @CookieValue("token") String token,
            @ModelAttribute UpdateProfileRequest request) {
        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body(ApiResponse.<UserDetailResponse>builder()
                    .code(401)
                    .message("Invalid token")
                    .build());
        }
        int id = jwtUtil.extractUserId(token).intValue();
        UserDetailResponse updatedProfile = userService.updateProfile(id, request);
        return ResponseEntity.ok(ApiResponse.<UserDetailResponse>builder()
                .code(200)
                .message("Update profile successfully")
                .data(updatedProfile)
                .build());
    }
}

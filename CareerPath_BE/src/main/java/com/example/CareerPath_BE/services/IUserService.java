package com.example.CareerPath_BE.services;

import com.example.CareerPath_BE.dtos.User.UpdateProfileRequest;
import com.example.CareerPath_BE.dtos.User.UserDetailResponse;

public interface IUserService {
    UserDetailResponse getUserProfile(int id);
    UserDetailResponse updateProfile(int id, UpdateProfileRequest request);
}

package com.example.CareerPath_BE.dtos.User;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProfileRequest {
    private String fullName;
    private String bio;
    private String gender;
    private String dateOfBirth;
    private String school;
    private Integer grade;
    private MultipartFile image;
    private String address;
}

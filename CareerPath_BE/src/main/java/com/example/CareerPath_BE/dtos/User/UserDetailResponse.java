package com.example.CareerPath_BE.dtos.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailResponse {
    private String fullName;
    private String email;
    private String bio;
    private String gender;
    private String dateOfBirth;
    private String school;
    private Integer grade;
    private String image;
    private String address;
}

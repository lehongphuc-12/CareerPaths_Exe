package com.example.CareerPath_BE.services.imple;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.CareerPath_BE.dtos.User.UpdateProfileRequest;
import com.example.CareerPath_BE.dtos.User.UserDetailResponse;
import com.example.CareerPath_BE.entities.Genders;
import com.example.CareerPath_BE.entities.UserProfiles;
import com.example.CareerPath_BE.entities.Users;
import com.example.CareerPath_BE.repositories.GendersRepository;
import com.example.CareerPath_BE.repositories.UserProfilesRepository;
import com.example.CareerPath_BE.repositories.UsersRepository;
import com.example.CareerPath_BE.services.IUserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService implements IUserService {

    private final UserProfilesRepository userProfilesRepository;
    private final UsersRepository usersRepository;
    private final GendersRepository gendersRepository;
    private final CloudinarySerivce cloudinarySerivce;

    @Override
    public UserDetailResponse getUserProfile(int id) {
        UserProfiles userProfiles = userProfilesRepository.findByUsersUserId(id);
        if (userProfiles == null) {
            throw new RuntimeException("User profile not found");
        }
        return mapToResponse(userProfiles);
    }

    @Override
    @Transactional
    public UserDetailResponse updateProfile(int id, UpdateProfileRequest request) {
        UserProfiles profile = userProfilesRepository.findByUsersUserId(id);
        if (profile == null) {
            throw new RuntimeException("User profile not found");
        }

        Users user = profile.getUsers();

        // Update Users info
        if (request.getFullName() != null) {
            user.setFullName(request.getFullName());
            usersRepository.save(user);
        }

        // Update Profiles info
        if (request.getBio() != null) profile.setBio(request.getBio());
        if (request.getSchool() != null) profile.setSchool(request.getSchool());
        if (request.getGrade() != null) profile.setGrade(request.getGrade());
        if (request.getAddress() != null) profile.setAddress(request.getAddress());

        if (request.getDateOfBirth() != null && !request.getDateOfBirth().isEmpty()) {
            try {
                Date dob = new SimpleDateFormat("yyyy-MM-dd").parse(request.getDateOfBirth());
                profile.setDateOfBirth(dob);
            } catch (Exception e) {
                // Ignore or log error
            }
        }

        if (request.getGender() != null) {
            Genders gender = gendersRepository.findByName(request.getGender());
            if (gender != null) {
                profile.setGenders(gender);
            }
        }

        if (request.getImage() != null && !request.getImage().isEmpty()) {
            String imageUrl = cloudinarySerivce.uploadFile(request.getImage(), "avatars");
            profile.setImage(imageUrl);
        }

        UserProfiles updatedProfile = userProfilesRepository.save(profile);
        return mapToResponse(updatedProfile);
    }

    private UserDetailResponse mapToResponse(UserProfiles userProfiles) {
        UserDetailResponse response = new UserDetailResponse();
        if (userProfiles.getUsers() != null) {
            response.setFullName(userProfiles.getUsers().getFullName());
            response.setEmail(userProfiles.getUsers().getEmail());
        }
        response.setBio(userProfiles.getBio());
        response.setGender(userProfiles.getGenders() != null ? userProfiles.getGenders().getName() : null);
        response.setDateOfBirth(
                userProfiles.getDateOfBirth() != null ? userProfiles.getDateOfBirth().toString() : null);
        response.setSchool(userProfiles.getSchool());
        response.setGrade(userProfiles.getGrade());
        response.setImage(userProfiles.getImage());
        response.setAddress(userProfiles.getAddress());
        return response;
    }
}

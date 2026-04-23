import { UserProfile, UpdateProfileRequest } from '../types/user';

const BASE_URL = '/api/users';

// Mock data for development
let mockProfile: UserProfile = {
  id: '1',
  fullName: 'Lê Hồng Phúc',
  email: 'phuc.lh@example.com',
  bio: 'Sinh viên FPT University, đam mê lập trình và phát triển bản thân.',
  gender: 'Male',
  dateOfBirth: '2003-04-23',
  school: 'FPT University',
  grade: 3,
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
  level: 5,
  xp: 450,
};

export const userApi = {
  getProfile: async (): Promise<UserProfile> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...mockProfile };
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<UserProfile> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    mockProfile = { ...mockProfile, ...data };
    return { ...mockProfile };
  },

  uploadAvatar: async (file: File): Promise<{ avatarUrl: string }> => {
    // Mock avatar upload
    await new Promise(resolve => setTimeout(resolve, 1000));
    const url = URL.createObjectURL(file);
    mockProfile.avatarUrl = url;
    return { avatarUrl: url };
  }
};

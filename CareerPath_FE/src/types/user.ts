export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  gender?: string;
  dateOfBirth?: string;
  school?: string;
  grade?: number;
  phone?: string;
  level?: number;
  xp?: number;
}

export interface UpdateProfileRequest {
  fullName?: string;
  bio?: string;
  gender?: string;
  dateOfBirth?: string;
  school?: string;
  grade?: number;
  phone?: string;
}

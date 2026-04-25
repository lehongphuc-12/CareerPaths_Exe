export interface UserProfile {
  id: number;
  fullName: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  gender?: string;
  dateOfBirth?: string;
  school?: string;
  grade?: number;
  address?: string;
  image?: string;
}
export interface UpdateProfileRequest {
  fullName?: string;
  bio?: string;
  gender?: string;
  dateOfBirth?: string;
  school?: string;
  grade?: number;
  address?: string;
  phone?: string;
  image?: File | string;
}

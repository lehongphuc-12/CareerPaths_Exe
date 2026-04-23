import { useState, useEffect } from 'react';
import { userApi } from '../api/userApi';
import { UserProfile, UpdateProfileRequest } from '../types/user';
import { useToastStore } from '../store/useToastStore';

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { addToast } = useToastStore();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await userApi.getProfile();
      setProfile(data);
    } catch (error) {
      addToast('Không thể tải thông tin hồ sơ', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async (data: UpdateProfileRequest) => {
    try {
      setUpdating(true);
      const updatedProfile = await userApi.updateProfile(data);
      setProfile(updatedProfile);
      addToast('Cập nhật hồ sơ thành công', 'success');
      return true;
    } catch (error) {
      addToast('Cập nhật hồ sơ thất bại', 'error');
      return false;
    } finally {
      setUpdating(false);
    }
  };

  const uploadAvatar = async (file: File) => {
    try {
      setUpdating(true);
      const { avatarUrl } = await userApi.uploadAvatar(file);
      if (profile) {
        setProfile({ ...profile, avatarUrl });
      }
      addToast('Cập nhật ảnh đại diện thành công', 'success');
    } catch (error) {
      addToast('Cập nhật ảnh đại diện thất bại', 'error');
    } finally {
      setUpdating(false);
    }
  };

  return {
    profile,
    loading,
    updating,
    updateProfile,
    uploadAvatar,
    refreshProfile: fetchProfile,
  };
};

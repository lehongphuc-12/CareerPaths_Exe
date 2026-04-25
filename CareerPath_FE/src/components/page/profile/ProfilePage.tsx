import React, { useState } from 'react';
import {
  Camera,
  Mail,
  User,
  School,
  Calendar,
  ChevronRight,
  Edit2,
  Save,
  X,
  Trophy,
  Target,
  MapPin,
} from 'lucide-react';
import { useProfile } from '../../../hooks/useProfile';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';
import { motion, AnimatePresence } from 'framer-motion';

const ProfilePage: React.FC = () => {
  const { profile, loading, updating, updateProfile, uploadAvatar } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);

  const handleStartEdit = () => {
    if (profile) {
      setEditData({
        fullName: profile.fullName,
        bio: profile.bio || '',
        school: profile.school || '',
        grade: profile.grade || 0,
        gender: profile.gender || '',
        dateOfBirth: profile.dateOfBirth || '',
        address: profile.address || '',
        image: profile.image || '',
      });
      setSelectedAvatar(null);
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    const dataToUpdate = { ...editData };

    if (selectedAvatar) {
      dataToUpdate.image = selectedAvatar;
    }

    const success = await updateProfile(dataToUpdate);
    if (success) {
      setIsEditing(false);
      setSelectedAvatar(null);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      if (!isEditing && profile) {
        setEditData({
          fullName: profile.fullName,
          bio: profile.bio || '',
          school: profile.school || '',
          grade: profile.grade || 0,
          gender: profile.gender || '',
          dateOfBirth: profile.dateOfBirth || '',
          address: profile.address || '',
          image: previewUrl,
        });
        setIsEditing(true);
      } else {
        setEditData((prev: any) => ({ ...prev, image: previewUrl }));
      }
      setSelectedAvatar(file);
    }
  };

  if (loading) return <Loading />;
  if (!profile) return null;

  return (
    <div className="min-h-screen bg-slate-50/50 pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <ProfileHeader
          profile={isEditing ? { ...profile, image: editData.image } : profile}
          isEditing={isEditing}
          onEdit={handleStartEdit}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
          updating={updating}
          onAvatarChange={handleAvatarChange}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Left Column: Stats & Goals */}
          <div className="space-y-6">
            <Card>
              <h3 className="card-title">
                <Target className="icon text-red-500" /> Mục tiêu nghề nghiệp
              </h3>
              <div className="space-y-3">
                {[].map((goal, idx) => (
                  <div key={idx} className="tag">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    {goal}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column: Profile Info */}
          <div className="lg:col-span-2">
            <Card>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">
                Thông tin cá nhân
              </h3>
              <AnimatePresence mode="wait">
                {!isEditing ? (
                  <motion.div
                    key="view"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <InfoItem icon={<User />} label="Họ và tên" value={profile.fullName} />
                    <InfoItem
                      icon={<Calendar />}
                      label="Ngày sinh"
                      value={profile.dateOfBirth || 'Chưa cập nhật'}
                    />
                    <InfoItem
                      icon={<User />}
                      label="Giới tính"
                      value={profile.gender || 'Chưa cập nhật'}
                    />
                    <InfoItem
                      icon={<School />}
                      label="Trường"
                      value={profile.school || 'Chưa cập nhật'}
                    />
                    <InfoItem
                      icon={<School />}
                      label="Khối/Lớp"
                      value={profile.grade ? `Khối ${profile.grade}` : 'Chưa cập nhật'}
                    />
                    <InfoItem
                      icon={<MapPin />}
                      label="Địa chỉ"
                      value={profile.address || 'Chưa cập nhật'}
                    />
                    <div className="md:col-span-2">
                      <InfoItem
                        icon={<ChevronRight />}
                        label="Giới thiệu bản thân"
                        value={profile.bio || 'Hãy viết gì đó về bản thân bạn...'}
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="edit"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <Input
                      label="Họ và tên"
                      value={editData.fullName}
                      onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                    />
                    <Input
                      label="Ngày sinh"
                      type="date"
                      value={editData.dateOfBirth}
                      onChange={(e) => setEditData({ ...editData, dateOfBirth: e.target.value })}
                    />
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                        Giới tính
                      </label>
                      <select
                        className="input"
                        value={editData.gender}
                        onChange={(e) => setEditData({ ...editData, gender: e.target.value })}
                      >
                        <option value="">Chọn giới tính</option>
                        <option value="Male">Nam</option>
                        <option value="Female">Nữ</option>
                        <option value="Other">Khác</option>
                      </select>
                    </div>
                    <Input
                      label="Trường"
                      value={editData.school}
                      onChange={(e) => setEditData({ ...editData, school: e.target.value })}
                    />
                    <Input
                      label="Khối/Lớp"
                      type="number"
                      value={editData.grade}
                      onChange={(e) =>
                        setEditData({ ...editData, grade: parseInt(e.target.value) })
                      }
                    />
                    <Input
                      label="Địa chỉ"
                      value={editData.address}
                      onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                    />
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                        Giới thiệu bản thân
                      </label>
                      <textarea
                        className="input min-h-[120px] resize-none"
                        placeholder="Hãy viết gì đó về bản thân bạn..."
                        value={editData.bio}
                        onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// ================= SUB-COMPONENTS =================

const ProfileHeader = ({
  profile,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  updating,
  onAvatarChange,
}: any) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl premium-shadow overflow-hidden">
      {/* Cover */}
      <div className="h-48 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6">
        {/* Avatar + Info */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 gap-4">
          <div className="flex items-end gap-5">
            {/* Avatar */}
            <div className="relative group">
              <div className="h-28 w-28 md:h-32 md:w-32 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-lg">
                <img
                  src={
                    profile.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'
                  }
                  className="h-full w-full object-cover"
                  alt="Avatar"
                />
              </div>

              {/* Upload overlay */}
              <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full cursor-pointer transition">
                <Camera className="w-6 h-6 text-white" />
                <input type="file" className="hidden" onChange={onAvatarChange} accept="image/*" />
              </label>

              {/* Online status */}
              <div className="absolute bottom-1 right-1 h-5 w-5 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
            </div>

            {/* Info */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                {profile.fullName}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4" />
                {profile.email}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div>
            {!isEditing ? (
              <Button onClick={onEdit}>
                <Edit2 className="w-4 h-4" /> Chỉnh sửa
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="secondary" onClick={onCancel}>
                  Hủy
                </Button>
                <Button onClick={onSave} isLoading={updating}>
                  <Save className="w-4 h-4" /> Lưu
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl premium-shadow border border-slate-100/50 dark:border-slate-800/50 backdrop-blur-md transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl">
    {children}
  </div>
);

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-start gap-4 p-4 rounded-2xl border border-transparent hover:border-slate-100 dark:hover:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all duration-200">
    <div className="icon-box">
      {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}
    </div>
    <div>
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </div>
  </div>
);

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-background-dark">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

export default ProfilePage;

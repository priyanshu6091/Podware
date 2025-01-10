import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileStats } from '../components/profile/ProfileStats';
import { ProfileDetails } from '../components/profile/ProfileDetails';

export function Profile() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  console.log('Profile User:', user);
  const handleEditProfile = () => {
    navigate('/settings');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading your profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">User data not available. Please sign in again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-8 space-y-8">
            <ProfileHeader user={user} onEdit={handleEditProfile} />
            <div className="border-t border-gray-100 pt-8">
              <ProfileStats />
            </div>
            <div className="border-t border-gray-100 pt-8">
              <ProfileDetails user={user} /> {/* Pass the user prop here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

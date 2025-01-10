import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import axios from 'axios';

interface User {
  fullname?: { firstname?: string; lastname?: string };
  metadata?: { location?: string; avatar_url?: string };
  role?: string;
}

interface ProfileSettingsProps {
  user: User | null; // Add the `user` prop here
  onSave: (data: { fullName: string; location: string }) => void;
}

export function ProfileSettings({ user, onSave }: ProfileSettingsProps) {
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFullName(
        `${user.fullname?.firstname || ''} ${user.fullname?.lastname || ''}`
      );
      setLocation(user.metadata?.location || '');
      setAvatarUrl(user.metadata?.avatar_url || '');
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const [firstname, lastname] = fullName.split(' ');
  
    console.log('Sending update payload:', { firstname, lastname, location, avatar_url: avatarUrl });
  
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      if (!token) {
        setError('User not authenticated');
        return;
      }
  
      const response = await axios.put(
        `http://localhost:5000/api/auth/update-profile`,
        { firstname, lastname, location, avatar_url: avatarUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log('Update response:', response.data);
  
      if (response.data.user) {
        onSave({ fullName, location });
        setError(null);
      }
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile.');
    }
  };
  
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img
            src={
              avatarUrl ||
              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fit=crop&w=150'
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <button className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full text-white hover:bg-purple-700">
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">Profile Picture</h3>
          <p className="text-sm text-gray-500">Update your profile picture</p>
        </div>
      </div>

      <form onSubmit={handleProfileUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

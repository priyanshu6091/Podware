import React from 'react';
import { Edit2 } from 'lucide-react';

interface ProfileHeaderProps {
  user: {
    email: string;
    fullname: {
      firstname: string;
      lastname: string;
    };
    metadata: {
      location: string;
      avatar_url: string;
    };
    role: string;
  } | null;
  onEdit: () => void;
}

export function ProfileHeader({ user, onEdit }: ProfileHeaderProps) {
  console.log('User:', user);
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <img
          src={user?.metadata?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fit=crop&w=150'}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
        />
        <button
          onClick={onEdit}
          className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors"
        >
          <Edit2 className="h-4 w-4" />
        </button>
      </div>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">
        {user?.fullname?.firstname || 'First Name Not Available'}{' '}
        {user?.fullname?.lastname || 'Last Name Not Available'}
      </h1>
      <p className="text-gray-500">{user?.email}</p>
      <p className="text-sm text-gray-400 italic">{user?.role || 'Role Not Available'}</p>
    </div>
  );
}

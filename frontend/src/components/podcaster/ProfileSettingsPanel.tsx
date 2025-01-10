import React, { useEffect, useState } from 'react';
import { Camera } from 'lucide-react';
import axios from 'axios';

export function ProfileSettingsPanel() {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    avatar: '',
    bio: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('User not authenticated.');

        const response = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { fullname, email, metadata } = response.data;
        setProfile({
          fullName: `${fullname.firstname} ${fullname.lastname}`,
          email,
          avatar: metadata?.avatar_url || 'https://via.placeholder.com/150',
          bio: metadata?.bio || '',
        });
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('User not authenticated.');

      const [firstname, lastname] = profile.fullName.split(' ');

      await axios.put(
        'http://localhost:5000/api/auth/update-profile',
        {
          firstname,
          lastname,
          bio: profile.bio,
          avatar_url: profile.avatar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess('Profile updated successfully!');
    } catch (err: any) {
      console.error(err);
      setError('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">Profile Settings</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div className="space-y-6">
        {/* Avatar */}
        <div className="flex items-center space-x-4">
          <img
            src={profile.avatar}
            alt="Profile Avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button className="p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700">
            <Camera className="h-5 w-5" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              readOnly
              className="mt-1 block w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        <button
          onClick={handleSaveChanges}
          disabled={loading}
          className={`mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}

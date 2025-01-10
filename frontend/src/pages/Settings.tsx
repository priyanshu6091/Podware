import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Settings as SettingsIcon, Bell, Lock, ShieldAlert } from 'lucide-react';
import { ProfileSettings } from '../components/settings/ProfileSettings';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { PrivacySettings } from '../components/settings/PrivacySettings';

type SettingsTab = 'profile' | 'notifications' | 'privacy' | 'admin';

interface TabButtonProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
}

function TabButton({ icon: Icon, label, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg w-full ${
        active ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );
}

export function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  const handleProfileUpdate = (data: { fullName: string; location: string }) => {
    console.log('Profile updated:', data);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 border-r border-gray-200 p-6 space-y-2">
              <TabButton
                icon={SettingsIcon}
                label="Profile"
                active={activeTab === 'profile'}
                onClick={() => setActiveTab('profile')}
              />
              <TabButton
                icon={Bell}
                label="Notifications"
                active={activeTab === 'notifications'}
                onClick={() => setActiveTab('notifications')}
              />
              <TabButton
                icon={Lock}
                label="Privacy"
                active={activeTab === 'privacy'}
                onClick={() => setActiveTab('privacy')}
              />
              {user?.role === 'Admin' && (
                <TabButton
                  icon={ShieldAlert}
                  label="Admin Settings"
                  active={activeTab === 'admin'}
                  onClick={() => setActiveTab('admin')}
                />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 p-8">
              {activeTab === 'profile' && (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
                  <ProfileSettings user={user} onSave={handleProfileUpdate} />
                </>
              )}
              {activeTab === 'notifications' && (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
                  <NotificationSettings />
                </>
              )}
              {activeTab === 'privacy' && (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Privacy Settings</h2>
                  <PrivacySettings />
                </>
              )}
              {activeTab === 'admin' && user?.role === 'Admin' && (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Admin Panel</h2>
                  <p className="text-gray-700">
                    Here you can manage platform-wide settings, view analytics, and perform administrative actions.
                  </p>
                  {/* Add admin-specific components or details here */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

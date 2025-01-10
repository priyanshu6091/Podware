import React, { useState } from 'react';
import { Lock, Eye, Users } from 'lucide-react';

interface PrivacyOptionProps {
  icon: React.ElementType;
  title: string;
  description: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

function PrivacyOption({ icon: Icon, title, description, options, value, onChange }: PrivacyOptionProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-3">
        <Icon className="h-5 w-5 text-purple-600" />
        <div>
          <h4 className="text-sm font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export function PrivacySettings() {
  const [privacy, setPrivacy] = useState({
    profile: 'Public',
    activity: 'Friends Only',
    listening: 'Private',
  });

  const updatePrivacy = (key: keyof typeof privacy) => (value: string) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  const visibilityOptions = ['Public', 'Friends Only', 'Private'];

  return (
    <div className="space-y-6">
      <PrivacyOption
        icon={Eye}
        title="Profile Visibility"
        description="Control who can see your profile"
        options={visibilityOptions}
        value={privacy.profile}
        onChange={updatePrivacy('profile')}
      />
      <PrivacyOption
        icon={Users}
        title="Activity Status"
        description="Manage who can see your listening activity"
        options={visibilityOptions}
        value={privacy.activity}
        onChange={updatePrivacy('activity')}
      />
      <PrivacyOption
        icon={Lock}
        title="Listening History"
        description="Choose who can view your listening history"
        options={visibilityOptions}
        value={privacy.listening}
        onChange={updatePrivacy('listening')}
      />
    </div>
  );
}
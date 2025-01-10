import React from 'react';
import { Mail, User, MapPin, Shield } from 'lucide-react';

interface User {
  email: string;
  metadata?: {
    location?: string;
    avatar_url?: string;
  };
  fullname?: {
    firstname?: string;
    lastname?: string;
  };
  role?: string;
}

interface DetailItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function DetailItem({ icon: Icon, label, value }: DetailItemProps) {
  return (
    <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-100">
      <Icon className="h-5 w-5 text-purple-600" />
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}

interface ProfileDetailsProps {
  user: User;
}

export function ProfileDetails({ user }: ProfileDetailsProps) {
  console.log('Profiledetails User:', user);
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Profile Details</h2>
      <div className="grid gap-4">
        <DetailItem icon={Mail} label="Email" value={user.email || 'N/A'} />
        <DetailItem
          icon={MapPin}
          label="Location"
          value={user.metadata?.location || 'Not specified'}
        />
        <DetailItem
          icon={User}
          label="Full Name"
          value={`${user.fullname?.firstname || 'First name not available'} ${
            user.fullname?.lastname || 'Last name not available'
          }`}
        />
        <DetailItem icon={Shield} label="Role" value={user.role || 'Not specified'} />
      </div>
    </div>
  );
}

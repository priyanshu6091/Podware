import React, { useState } from 'react';
import { Bell, Mail, MessageSquare } from 'lucide-react';

interface NotificationToggleProps {
  icon: React.ElementType;
  title: string;
  description: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

function NotificationToggle({ icon: Icon, title, description, enabled, onChange }: NotificationToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-purple-50 rounded-lg">
          <Icon className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
          enabled ? 'bg-purple-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    newEpisodes: true,
    comments: false,
    newsletter: true,
  });

  const updateNotification = (key: keyof typeof notifications) => (value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <NotificationToggle
        icon={Bell}
        title="New Episode Alerts"
        description="Get notified when new episodes are released"
        enabled={notifications.newEpisodes}
        onChange={updateNotification('newEpisodes')}
      />
      <NotificationToggle
        icon={MessageSquare}
        title="Comments"
        description="Receive notifications for comments on your activity"
        enabled={notifications.comments}
        onChange={updateNotification('comments')}
      />
      <NotificationToggle
        icon={Mail}
        title="Newsletter"
        description="Weekly digest of top podcasts and updates"
        enabled={notifications.newsletter}
        onChange={updateNotification('newsletter')}
      />
    </div>
  );
}
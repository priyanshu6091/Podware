import React from 'react';
import { MessageSquare, Heart, Users } from 'lucide-react';

export function EngagementPanel() {
  const stats = [
    { label: 'Total Comments', value: '1,234', icon: MessageSquare },
    { label: 'Positive Ratings', value: '98%', icon: Heart },
    { label: 'Audience Growth', value: '+20%', icon: Users },
  ];

  return (
    <div className="space-y-6">
      {/* Engagement Stats */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Engagement Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="h-5 w-5 text-purple-600" />
                <span className="text-green-600 text-sm">{stat.value}</span>
              </div>
              <p className="text-2xl font-bold text-purple-900">{stat.value}</p>
              <p className="text-sm text-purple-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Details */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Latest Comments</h2>
        <ul className="space-y-4">
          <li className="p-4 border rounded-lg bg-gray-50">
            <p className="text-sm text-gray-600">
              <strong>John Doe:</strong> "Loved this episode! Very insightful."
            </p>
          </li>
          <li className="p-4 border rounded-lg bg-gray-50">
            <p className="text-sm text-gray-600">
              <strong>Jane Smith:</strong> "Looking forward to more content on AI."
            </p>
          </li>
          <li className="p-4 border rounded-lg bg-gray-50">
            <p className="text-sm text-gray-600">
              <strong>Alex Brown:</strong> "Great episode! Keep it up."
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

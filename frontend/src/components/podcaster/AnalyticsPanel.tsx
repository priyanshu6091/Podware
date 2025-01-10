import React from 'react';
import { BarChart, TrendingUp, Users } from 'lucide-react';

export function AnalyticsPanelPodcaster() {
  const stats = [
    { label: 'Total Listeners', value: '12.5K', icon: Users, trend: '+15%' },
    { label: 'Avg. Listen Time', value: '28m', icon: TrendingUp, trend: '+5%' },
    { label: 'Revenue', value: '$1,234', icon: BarChart, trend: '+25%' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">Analytics Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="h-5 w-5 text-purple-600" />
              <span className="text-green-600 text-sm">{stat.trend}</span>
            </div>
            <p className="text-2xl font-bold text-purple-900">{stat.value}</p>
            <p className="text-sm text-purple-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

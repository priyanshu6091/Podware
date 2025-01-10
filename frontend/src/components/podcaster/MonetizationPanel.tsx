import React from 'react';
import { DollarSign, Gift, Users, TrendingUp } from 'lucide-react';

export function MonetizationPanel() {
  const stats = [
    { label: 'Total Revenue', value: '$2,345', trend: '+15%', icon: DollarSign },
    { label: 'Subscribers', value: '1.2K', trend: '+8%', icon: Users },
    { label: 'Tips Received', value: '$456', trend: '+25%', icon: Gift },
    { label: 'Ad Revenue', value: '$890', trend: '+12%', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      {/* Revenue Stats */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Revenue Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="h-5 w-5 text-purple-600" />
                <span className="text-green-600 text-sm">{stat.trend}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Subscription Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Monthly Subscription Price</p>
              <p className="text-sm text-gray-600">Price for premium content access</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">$</span>
              <input
                type="number"
                className="w-24 px-3 py-2 border rounded-lg"
                defaultValue={4.99}
                step="0.01"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Early Access Window</p>
              <p className="text-sm text-gray-600">Days before public release</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="w-24 px-3 py-2 border rounded-lg"
                defaultValue={7}
              />
              <span className="text-gray-500">days</span>
            </div>
          </div>
        </div>

        <button className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
          Save Changes
        </button>
      </div>

      {/* Ad Integration */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Ad Integration</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Enable Mid-Roll Ads</p>
              <p className="text-sm text-gray-600">Insert ads during episodes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Sponsorship Opportunities</p>
              <p className="text-sm text-gray-600">Allow brands to contact you</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
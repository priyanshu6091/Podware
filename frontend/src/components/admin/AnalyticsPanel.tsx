import React from 'react';
import { BarChart, TrendingUp, Users, DollarSign } from 'lucide-react';

export function AnalyticsPanel() {
  const stats = [
    { label: 'Total Users', value: '12,345', icon: Users, trend: '+8%' },
    { label: 'Monthly Revenue', value: '$45,678', icon: DollarSign, trend: '+15%' },
    { label: 'Active Podcasters', value: '456', icon: BarChart, trend: '+10%' },
    { label: 'Engagement Rate', value: '72%', icon: TrendingUp, trend: '+5%' },
  ];

  const chartData = [
    { month: 'Jan', users: 1200, revenue: 15000 },
    { month: 'Feb', users: 1800, revenue: 20000 },
    { month: 'Mar', users: 2500, revenue: 30000 },
    { month: 'Apr', users: 3200, revenue: 40000 },
    { month: 'May', users: 4000, revenue: 45000 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">Platform Analytics</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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

      {/* Charts Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly User Growth</h3>
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <svg width="100%" height="200">
              {/* X-Axis */}
              <line x1="50" y1="180" x2="600" y2="180" stroke="gray" />
              {chartData.map((point, index) => (
                <text
                  key={index}
                  x={50 + index * 100}
                  y="195"
                  fill="gray"
                  fontSize="10"
                  textAnchor="middle"
                >
                  {point.month}
                </text>
              ))}

              {/* Bars */}
              {chartData.map((point, index) => (
                <rect
                  key={index}
                  x={50 + index * 100 - 15}
                  y={180 - point.users / 20}
                  width="30"
                  height={point.users / 20}
                  fill="#805ad5"
                />
              ))}
            </svg>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Revenue</h3>
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <svg width="100%" height="200">
              {/* X-Axis */}
              <line x1="50" y1="180" x2="600" y2="180" stroke="gray" />
              {chartData.map((point, index) => (
                <text
                  key={index}
                  x={50 + index * 100}
                  y="195"
                  fill="gray"
                  fontSize="10"
                  textAnchor="middle"
                >
                  {point.month}
                </text>
              ))}

              {/* Line Chart */}
              {chartData.map((point, index, array) =>
                index === array.length - 1 ? null : (
                  <line
                    key={index}
                    x1={50 + index * 100}
                    y1={180 - array[index].revenue / 200}
                    x2={50 + (index + 1) * 100}
                    y2={180 - array[index + 1].revenue / 200}
                    stroke="#805ad5"
                    strokeWidth="2"
                  />
                )
              )}
              {chartData.map((point, index) => (
                <circle
                  key={index}
                  cx={50 + index * 100}
                  cy={180 - point.revenue / 200}
                  r="4"
                  fill="#805ad5"
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users } from 'lucide-react';

export function RevenueManagementPanel() {
  const [payouts, setPayouts] = useState([
    { id: '1', creator: 'John Doe', amount: 1500, status: 'Pending', date: '2025-01-05' },
    { id: '2', creator: 'Jane Smith', amount: 2500, status: 'Completed', date: '2025-01-01' },
    { id: '3', creator: 'Alex Johnson', amount: 1200, status: 'Failed', date: '2025-01-03' },
  ]);

  const metrics = [
    { label: 'Total Revenue', value: '$45,678', icon: DollarSign, trend: '+15%' },
    { label: 'Active Subscriptions', value: '1,234', icon: Users, trend: '+8%' },
    { label: 'Ad Revenue', value: '$12,345', icon: TrendingUp, trend: '+10%' },
  ];

  const handlePayoutAction = (id: string, action: 'approve' | 'reject') => {
    setPayouts((prev) =>
      prev.map((payout) =>
        payout.id === id
          ? { ...payout, status: action === 'approve' ? 'Completed' : 'Rejected' }
          : payout
      )
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">Revenue Management</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <metric.icon className="h-5 w-5 text-purple-600" />
              <span className="text-green-600 text-sm">{metric.trend}</span>
            </div>
            <p className="text-2xl font-bold text-purple-900">{metric.value}</p>
            <p className="text-sm text-purple-600">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Payout Management */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-md font-medium text-gray-900 mb-4">Pending Payouts</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Creator
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payouts.map((payout) => (
                <tr key={payout.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payout.creator}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ${payout.amount.toLocaleString()}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      payout.status === 'Pending'
                        ? 'text-yellow-600'
                        : payout.status === 'Completed'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {payout.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {payout.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {payout.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handlePayoutAction(payout.id, 'approve')}
                          className="text-green-600 hover:text-green-800 mr-2"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handlePayoutAction(payout.id, 'reject')}
                          className="text-red-600 hover:text-red-800"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

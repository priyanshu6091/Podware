import React, { useState } from 'react';

interface Ticket {
  id: string;
  user: string;
  issue: string;
  status: 'Open' | 'Pending' | 'Resolved';
  submittedAt: string;
}

export function SupportPanel() {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: '1',
      user: 'John Doe',
      issue: 'Unable to access premium content',
      status: 'Open',
      submittedAt: '2025-01-05',
    },
    {
      id: '2',
      user: 'Jane Smith',
      issue: 'Payment issue with subscription',
      status: 'Pending',
      submittedAt: '2025-01-03',
    },
    {
      id: '3',
      user: 'Alex Johnson',
      issue: 'Bug in podcast upload',
      status: 'Resolved',
      submittedAt: '2025-01-01',
    },
  ]);

  const handleAction = (id: string, action: 'resolve' | 'pending') => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id
          ? { ...ticket, status: action === 'resolve' ? 'Resolved' : 'Pending' }
          : ticket
      )
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">User Support Tickets</h2>

      {/* Ticket Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                User
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Issue
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Submitted At
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {ticket.user}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {ticket.issue}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    ticket.status === 'Open'
                      ? 'text-yellow-600'
                      : ticket.status === 'Resolved'
                      ? 'text-green-600'
                      : 'text-blue-600'
                  }`}
                >
                  {ticket.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {ticket.submittedAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {ticket.status !== 'Resolved' && (
                    <button
                      onClick={() => handleAction(ticket.id, 'resolve')}
                      className="text-green-600 hover:text-green-800 mr-2"
                    >
                      Resolve
                    </button>
                  )}
                  {ticket.status === 'Open' && (
                    <button
                      onClick={() => handleAction(ticket.id, 'pending')}
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      Mark as Pending
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

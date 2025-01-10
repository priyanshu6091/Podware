import React, { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'User' | 'Podcaster' | 'Admin';
  status: 'Active' | 'Inactive' | 'Banned';
  createdAt: string;
}

export function UserManagementPanel() {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'User',
      status: 'Active',
      createdAt: '2025-01-01',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      role: 'Podcaster',
      status: 'Inactive',
      createdAt: '2025-01-02',
    },
    {
      id: '3',
      name: 'Alex Johnson',
      email: 'alexjohnson@example.com',
      role: 'Admin',
      status: 'Banned',
      createdAt: '2025-01-03',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleAction = (id: string, action: 'activate' | 'deactivate' | 'ban') => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                action === 'activate'
                  ? 'Active'
                  : action === 'deactivate'
                  ? 'Inactive'
                  : 'Banned',
            }
          : user
      )
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">User Management</h2>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Created At
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.role}</td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    user.status === 'Active'
                      ? 'text-green-600'
                      : user.status === 'Inactive'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                >
                  {user.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {user.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {user.status !== 'Active' && (
                    <button
                      onClick={() => handleAction(user.id, 'activate')}
                      className="text-green-600 hover:text-green-800 mr-2"
                    >
                      Activate
                    </button>
                  )}
                  {user.status !== 'Inactive' && (
                    <button
                      onClick={() => handleAction(user.id, 'deactivate')}
                      className="text-yellow-600 hover:text-yellow-800 mr-2"
                    >
                      Deactivate
                    </button>
                  )}
                  {user.status !== 'Banned' && (
                    <button
                      onClick={() => handleAction(user.id, 'ban')}
                      className="text-red-600 hover:text-red-800"
                    >
                      Ban
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

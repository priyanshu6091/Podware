import React, { useState } from 'react';

interface Content {
  id: string;
  title: string;
  author: string;
  type: 'Podcast' | 'Episode' | 'Comment';
  status: 'Pending' | 'Approved' | 'Rejected';
  uploadedAt: string;
}

export function ContentModerationPanel() {
  const [contentList, setContentList] = useState<Content[]>([
    {
      id: '1',
      title: 'The Future of AI',
      author: 'John Doe',
      type: 'Podcast',
      status: 'Pending',
      uploadedAt: '2025-01-01',
    },
    {
      id: '2',
      title: 'Startup Growth Strategies',
      author: 'Jane Smith',
      type: 'Episode',
      status: 'Approved',
      uploadedAt: '2025-01-02',
    },
    {
      id: '3',
      title: 'Interesting insights',
      author: 'Alex Johnson',
      type: 'Comment',
      status: 'Pending',
      uploadedAt: '2025-01-03',
    },
  ]);

  const handleAction = (id: string, action: 'approve' | 'reject' | 'delete') => {
    if (action === 'delete') {
      setContentList(contentList.filter((content) => content.id !== id));
    } else {
      setContentList((prev) =>
        prev.map((content) =>
          content.id === id
            ? { ...content, status: action === 'approve' ? 'Approved' : 'Rejected' }
            : content
        )
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">Content Moderation</h2>
      <div className="space-y-4">
        {/* Filter Options */}
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Filter: Pending
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
            Filter: Approved
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
            Filter: Rejected
          </button>
        </div>

        {/* Content Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Uploaded At
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contentList.map((content) => (
                <tr key={content.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {content.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {content.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {content.type}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      content.status === 'Pending'
                        ? 'text-yellow-600'
                        : content.status === 'Approved'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {content.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {content.uploadedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleAction(content.id, 'approve')}
                      className="text-green-600 hover:text-green-800 mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(content.id, 'reject')}
                      className="text-yellow-600 hover:text-yellow-800 mr-2"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleAction(content.id, 'delete')}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
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

import React from 'react';
import { Upload, Calendar, Settings, Play } from 'lucide-react';

export function ContentManagementPanel() {
  const episodes = [
    {
      id: '1',
      title: 'The Future of AI in Business',
      thumbnail: 'https://via.placeholder.com/150',
      status: 'published',
      publishDate: '2024-03-15',
      duration: '45:00',
      views: 1234,
    },
    {
      id: '2',
      title: 'Startup Success Stories',
      thumbnail: 'https://via.placeholder.com/150',
      status: 'scheduled',
      publishDate: '2024-03-20',
      duration: '35:00',
      views: 0,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="flex items-center justify-center gap-2 p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          <Upload className="h-5 w-5" />
          Upload New Episode
        </button>
        <button className="flex items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
          <Calendar className="h-5 w-5" />
          Schedule Episode
        </button>
        <button className="flex items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
          <Settings className="h-5 w-5" />
          Batch Edit
        </button>
      </div>

      {/* Episodes List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">Episodes</h2>
          <div className="space-y-4">
            {episodes.map((episode) => (
              <div key={episode.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <img src={episode.thumbnail} alt={episode.title} className="w-20 h-20 rounded-lg" />
                <div>
                  <h3 className="font-medium">{episode.title}</h3>
                  <p className="text-sm text-gray-600">{episode.publishDate}</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Play className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Clock } from 'lucide-react';

interface HistoryItem {
  title: string;
  host: string;
  thumbnail: string;
  progress: number;
  timestamp: string;
}

export function History() {
  const historyItems: HistoryItem[] = [
    {
      title: "The Future of AI in Healthcare",
      host: "Tech Insights",
      thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000",
      progress: 75,
      timestamp: "2 hours ago",
    },
    {
      title: "Mindfulness Meditation Guide",
      host: "Wellness Weekly",
      thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000",
      progress: 100,
      timestamp: "Yesterday",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Listening History</h1>
      
      <div className="space-y-4">
        {historyItems.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.host}</p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              {item.timestamp}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
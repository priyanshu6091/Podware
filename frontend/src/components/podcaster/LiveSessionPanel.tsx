import React from 'react';
import { Play, Calendar, Users } from 'lucide-react';

export function LiveSessionPanel() {
  const upcomingSessions = [
    { id: 1, title: 'Tech Trends in 2024', date: '2024-05-20', time: '5:00 PM' },
    { id: 2, title: 'AI in Business', date: '2024-05-25', time: '6:30 PM' },
  ];

  return (
    <div className="space-y-6">
      {/* Schedule a Live Session */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Schedule a Live Session</h2>
        <button className="flex items-center justify-center gap-2 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
          <Calendar className="h-5 w-5" />
          Schedule New Session
        </button>
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Upcoming Sessions</h2>
        <ul className="space-y-4">
          {upcomingSessions.map((session) => (
            <li key={session.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
              <div>
                <h3 className="font-medium">{session.title}</h3>
                <p className="text-sm text-gray-600">
                  {session.date} at {session.time}
                </p>
              </div>
              <button className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                <Play className="h-5 w-5" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

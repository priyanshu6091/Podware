import React from 'react';
import { Trophy, Clock, BookOpen } from 'lucide-react';

export function ProgressStats() {
  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded-xl shadow-sm mb-8">
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="ml-2 font-semibold text-gray-900">5</span>
        </div>
        <p className="text-sm text-gray-600">Certificates</p>
      </div>
      <div className="text-center border-x border-gray-100">
        <div className="flex items-center justify-center mb-2">
          <Clock className="h-5 w-5 text-purple-600" />
          <span className="ml-2 font-semibold text-gray-900">12h</span>
        </div>
        <p className="text-sm text-gray-600">Learning Time</p>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <BookOpen className="h-5 w-5 text-green-500" />
          <span className="ml-2 font-semibold text-gray-900">8</span>
        </div>
        <p className="text-sm text-gray-600">Courses</p>
      </div>
    </div>
  );
}
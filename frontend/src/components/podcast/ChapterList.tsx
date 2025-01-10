import React from 'react';
import { Clock } from 'lucide-react';
import type { Chapter } from '../../types';

interface ChapterListProps {
  chapters: Chapter[];
  onChapterClick: (startTime: number) => void;
  currentTime: number;
}

export function ChapterList({ chapters, onChapterClick, currentTime }: ChapterListProps) {
  const formatTimestamp = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-2">
      {chapters.map((chapter) => (
        <button
          key={chapter.id}
          onClick={() => onChapterClick(chapter.startTime)}
          className={`w-full text-left p-3 rounded-lg hover:bg-gray-50 ${
            currentTime >= chapter.startTime && currentTime < chapter.endTime
              ? 'bg-purple-50'
              : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900">{chapter.title}</span>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{formatTimestamp(chapter.startTime)}</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
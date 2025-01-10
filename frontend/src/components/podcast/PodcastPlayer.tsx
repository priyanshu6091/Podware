import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import type { PodcastEpisode } from '../../types';

interface PodcastPlayerProps {
  episode: PodcastEpisode;
  onTimeUpdate?: (time: number) => void;
}

export function PodcastPlayer({ episode, onTimeUpdate }: PodcastPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <img
            src={episode.thumbnail}
            alt={episode.title}
            className="w-12 h-12 rounded-md object-cover"
          />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{episode.title}</h3>
            <p className="text-sm text-gray-500">{episode.host}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <SkipBack className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <SkipForward className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="mt-4">
          <div className="relative w-full h-1 bg-gray-200 rounded">
            <div
              className="absolute h-full bg-purple-600 rounded"
              style={{ width: `${(currentTime / parseInt(episode.duration)) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>{formatTime(currentTime)}</span>
            <span>{episode.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
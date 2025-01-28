// components/podcast/PodcastCard.tsx
import React from 'react';
import { Play, Heart } from 'lucide-react';

interface PodcastCardProps {
  title: string;
  host: string;
  thumbnail: string;
  duration: string;
  likes: number;
}

export function PodcastCard({ title, host, thumbnail, duration, likes }: PodcastCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <button className="absolute bottom-3 right-3 bg-purple-600 rounded-full p-2 hover:bg-purple-700 transition-colors">
          <Play className="h-6 w-6 text-white" fill="white" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{host}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm text-gray-500">{duration}</span>
          <div className="flex items-center space-x-1">
            <Heart className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-500">{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
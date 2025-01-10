import React from 'react';
import { PodcastCard } from '../podcast/PodcastCard';
import { Podcast } from '../../types/index';

interface TrendingSectionProps {
  podcasts: Podcast[];
}

export function TrendingSection({ podcasts }: TrendingSectionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Trending Now</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {podcasts.map((podcast, index) => (
          <PodcastCard key={podcast.id || index} {...podcast} />
        ))}
      </div>
    </div>
  );
}
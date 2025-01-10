import React from 'react';
import { PodcastCard } from '../podcast/PodcastCard';

export function Favorites() {
  const favoriteEpisodes = [
    {
      title: "Building Successful Startups",
      host: "Startup Stories",
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000",
      duration: "45 min",
      likes: 2345,
    },
    {
      title: "The Art of Productivity",
      host: "Life Hacks Daily",
      thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000",
      duration: "30 min",
      likes: 1567,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Favorites</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteEpisodes.map((episode, index) => (
          <PodcastCard key={index} {...episode} />
        ))}
      </div>
    </div>
  );
}
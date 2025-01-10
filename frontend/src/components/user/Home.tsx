import React from 'react';
import { PodcastCard } from '../podcast/PodcastCard';

export function Home() {
  const featuredPodcasts = [
    {
      title: "The Future of Technology",
      host: "Tech Insights with Sarah",
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000",
      duration: "45 min",
      likes: 1234,
    },
    {
      title: "Mindfulness in Modern Life",
      host: "Wellness Weekly",
      thumbnail: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000",
      duration: "32 min",
      likes: 892,
    },
    {
      title: "Startup Success Stories",
      host: "Entrepreneur's Journey",
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000",
      duration: "28 min",
      likes: 567,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome Back</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Featured Podcasts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPodcasts.map((podcast, index) => (
            <PodcastCard key={index} {...podcast} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Continue Listening</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPodcasts.slice(0, 2).map((podcast, index) => (
            <PodcastCard key={index} {...podcast} />
          ))}
        </div>
      </section>
    </div>
  );
}
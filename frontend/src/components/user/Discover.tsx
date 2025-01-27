import React, { useState, useEffect } from 'react';
import { DiscoverSearch } from '../discover/DiscoverSearch';
import { CategoryList } from '../discover/CategoryList';
import axios from 'axios';
import type { Podcast } from '../../types/index';
import { VideoPlayer } from '../videoplayer/VideoPlayer';

export function Discover() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/podcasts/all');
        setPodcasts(response.data.podcasts || []);
      } catch (error) {
        console.error('Error fetching podcasts:', error);
      }
    };

    fetchPodcasts();
  }, []);

  const filteredPodcasts = podcasts.filter((podcast) => {
    const matchesQuery = searchQuery
      ? podcast.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesCategory = selectedCategory
      ? podcast.categories.includes(selectedCategory)
      : true;

    return matchesQuery && matchesCategory;
  });

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? undefined : category);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Discover</h1>
        <p className="text-gray-600">Find your next favorite podcast</p>
      </div>

      {/* Search Bar */}
      <DiscoverSearch value={searchQuery} onChange={setSearchQuery} />

      {/* Categories */}
      <CategoryList
        categories={['Technology', 'Business', 'Health', 'Education']}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      {/* Podcast List with Video/Audio Players */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {filteredPodcasts.map((podcast) => (
          <div key={podcast.id} className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="font-semibold text-lg mb-2">{podcast.title}</h2>
            <p className="text-sm text-gray-600 mb-4">{podcast.description}</p>

            {/* Render VideoPlayer if videoUrl exists, otherwise render audio */}
            {podcast.videoUrl ? (
              <VideoPlayer url={`http://localhost:5000${podcast.videoUrl}`} />
            ) : podcast.audioUrl ? (
              <audio controls className="w-full">
                <source
                  src={`http://localhost:5000${podcast.audioUrl}`}
                  type={`audio/${podcast.audioUrl.split('.').pop()}`}
                />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <p>No media available.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

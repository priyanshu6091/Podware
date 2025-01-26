import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { VideoPlayer } from '../videoplayer/VideoPlayer';

interface Podcast {
  _id: string;
  title: string;
  description: string;
  videoUrl?: string;
  audioUrl?: string;
}

export function DiscoverPodcasts() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/podcasts/all');
        setPodcasts(response.data.podcasts);
      } catch (err) {
        setError('Failed to load podcasts. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  if (loading) return <p>Loading podcasts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Discover Podcasts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {podcasts.map((podcast) => (
          <div key={podcast._id} className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="font-semibold text-lg mb-2">{podcast.title}</h2>
            <p className="text-sm text-gray-600 mb-4">{podcast.description}</p>
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

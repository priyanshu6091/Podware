// components/podcaster/PodcasterProfile.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { PodcastCard } from '../../components/podcast/PodcastCard';
import { User, Podcast } from '../../types/index';

export function PodcasterProfile() {
  const { id } = useParams<{ id: string }>();
  const [podcaster, setPodcaster] = useState<User | null>(null);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);

  useEffect(() => {
    const fetchPodcasterProfile = async () => {
      try {
        const response = await axios.get<User & { podcasts: Podcast[] }>(`http://localhost:5000/api/podcasters/${id}`);
        console.log(response.data);
        setPodcaster(response.data);
        setPodcasts(response.data.podcasts || []);
      } catch (error) {
        console.error('Error fetching podcaster profile:', error);
      }
    };

    if (id) {
      fetchPodcasterProfile();
    }
  }, [id]);

  if (!id) return <p>Podcaster ID is undefined</p>;
  if (!podcaster) return <p>Loading podcaster profile...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <img
          src={podcaster.metadata?.avatar_url || 'https://via.placeholder.com/150'}
          alt="Podcaster Avatar"
          className="w-24 h-24 rounded-full mx-auto border-4 border-white"
        />
        <h1 className="text-3xl font-bold mt-4">{podcaster.fullname?.firstname} {podcaster.fullname?.lastname}</h1>
        <p className="text-gray-600">{podcaster.metadata?.bio}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {podcasts.map((podcast) => (
          <PodcastCard host={''} thumbnail={''} likes={0} key={podcast._id} {...podcast} />
        ))}
      </div>
    </div>
  );
}
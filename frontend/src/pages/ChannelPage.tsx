import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { VideoPlayer } from '../components/videoplayer/VideoPlayer';

interface Podcast {
  _id: string;
  title: string;
  description: string;
  videoUrl?: string;
  audioUrl?: string;
}

interface Channel {
  _id: string;
  name: string;
  description: string;
  avatar: string;
  banner: string;
}

export function ChannelPage() {
  const { id } = useParams<{ id: string }>();
  const [channel, setChannel] = useState<Channel | null>(null);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/channels/${id}`);
        setChannel(response.data.channel);
        setPodcasts(response.data.podcasts || []);
      } catch (error) {
        console.error('Error fetching channel:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, [id]);

  if (loading) return <p>Loading channel...</p>;
  if (!channel) return <p>Channel not found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <img
          src={channel.banner || 'https://via.placeholder.com/800x200'}
          alt="Channel Banner"
          className="w-full h-48 object-cover rounded-md"
        />
        <img
          src={channel.avatar || 'https://via.placeholder.com/100'}
          alt="Channel Avatar"
          className="w-24 h-24 rounded-full mx-auto -mt-12 border-4 border-white"
        />
        <h1 className="text-3xl font-bold mt-4">{channel.name}</h1>
        <p className="text-gray-600">{channel.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {podcasts.map((podcast) => (
          <div key={podcast._id} className="bg-white shadow rounded-md p-4">
            <h2 className="text-lg font-semibold">{podcast.title}</h2>
            <p className="text-sm text-gray-600 mb-4">{podcast.description}</p>
            {podcast.videoUrl ? (
              <VideoPlayer url={`http://localhost:5000${podcast.videoUrl}`} />
            ) : podcast.audioUrl ? (
              <audio controls className="w-full">
                <source src={`http://localhost:5000${podcast.audioUrl}`} />
              </audio>
            ) : (
              <p>No media available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

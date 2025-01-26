import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Channel {
  _id: string;
  name: string;
  description: string;
  avatar: string;
}

export function ChannelList() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/channels/all');
        setChannels(response.data.channels || []);
      } catch (error) {
        console.error('Error fetching channels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, []);

  if (loading) return <p>Loading channels...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {channels.map((channel) => (
        <Link to={`/channels/${channel._id}`} key={channel._id}>
          <div className="bg-white shadow rounded-md p-4 flex items-center">
            <img
              src={channel.avatar || 'https://via.placeholder.com/100'}
              alt={channel.name}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h2 className="text-lg font-semibold">{channel.name}</h2>
              <p className="text-sm text-gray-600">{channel.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

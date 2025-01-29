// pages/VideoPlayerPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';

export function VideoPlayerPage() {
  const { videoId } = useParams<{ videoId: string }>();
  const [videoData, setVideoData] = useState<{
    title: string;
    description: string;
    videoUrl: string;
  } | null>(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/videos/${videoId}`);
        console.log(response.data.videoUrl)
        setVideoData(response.data);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    if (videoId) fetchVideoDetails();
  }, [videoId]);

  if (!videoData) return <p>Loading video...</p>;
  const finalUrl='http://localhost:5000'+videoData.videoUrl;
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <ReactPlayer
        url={finalUrl}
        controls
        width="100%"
        height="480px"
        className="rounded-lg shadow-lg"
      />
      <h1 className="text-2xl font-bold mt-4">{videoData.title}</h1>
      <p className="text-gray-600 mt-2">{videoData.description}</p>
    </div>
  );
}

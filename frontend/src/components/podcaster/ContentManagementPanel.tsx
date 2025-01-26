import React, { useState, useEffect } from 'react';
import { Upload, Calendar, Settings, Play } from 'lucide-react';
import { PodcastUploadForm } from './PodcastUploadForm';
import { ScheduleEpisodeForm } from './ScheduleEpisodeForm';
import { BatchEditForm } from './BatchEditForm';

interface Episode {
  id: string;
  title: string;
  thumbnail?: string;
  publishDate?: string;
  scheduleDate?: string;
  duration?: string;
  views?: number;
}

export function ContentManagementPanel() {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [showBatchEditForm, setShowBatchEditForm] = useState(false);
  const [scheduledEpisodes, setScheduledEpisodes] = useState<Episode[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch uploaded podcasts
        const podcastsResponse = await fetch('http://localhost:5000/api/podcasts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!podcastsResponse.ok) throw new Error('Failed to fetch podcasts');
        const podcastsData = await podcastsResponse.json();
        setEpisodes(podcastsData.podcasts || []);

        // Fetch scheduled episodes
        const scheduledResponse = await fetch('http://localhost:5000/api/podcasts/schedule', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!scheduledResponse.ok) throw new Error('Failed to fetch scheduled episodes');
        const scheduledData = await scheduledResponse.json();
        setScheduledEpisodes(scheduledData.episodes || []);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      }
    };

    fetchEpisodes();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button onClick={() => setShowUploadForm(!showUploadForm)} className="flex items-center justify-center gap-2 p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          <Upload className="h-5 w-5" />
          {showUploadForm ? 'Close Upload Form' : 'Upload New Episode'}
        </button>

        <button onClick={() => setShowScheduleForm(!showScheduleForm)} className="flex items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
          <Calendar className="h-5 w-5" />
          {showScheduleForm ? 'Close Schedule Form' : 'Schedule Episode'}
        </button>

        <button onClick={() => setShowBatchEditForm(!showBatchEditForm)} className="flex items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
          <Settings className="h-5 w-5" />
          {showBatchEditForm ? 'Close Batch Edit Form' : 'Batch Edit'}
        </button>
      </div>

      {showUploadForm && <PodcastUploadForm />}
      {showScheduleForm && <ScheduleEpisodeForm />}
      {showBatchEditForm && <BatchEditForm episodes={episodes} />}

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">Scheduled Episodes</h2>
          {scheduledEpisodes.map((episode) => (
            <div key={episode.id} className="p-4 border rounded-lg">
              <h3>{episode.title}</h3>
              <p>Scheduled for: {new Date(episode.scheduleDate!).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">Uploaded Podcasts</h2>
          {episodes.map((episode) => (
            <div key={episode.id} className="flex items-center gap-4 p-4 border rounded-lg">
              <img src={episode.thumbnail || 'https://via.placeholder.com/150'} alt={episode.title} className="w-20 h-20 rounded-lg" />
              <div className="flex-1">
                <h3 className="font-medium">{episode.title}</h3>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Play className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';

interface Episode {
  id: string;
  title: string;
}

interface BatchEditFormProps {
  episodes: Episode[];
}

export function BatchEditForm({ episodes }: BatchEditFormProps) {
  const [selectedEpisodes, setSelectedEpisodes] = useState<string[]>([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleEpisodeSelection = (id: string) => {
    setSelectedEpisodes((prev) =>
      prev.includes(id) ? prev.filter((episodeId) => episodeId !== id) : [...prev, id]
    );
  };

  const handleBatchUpdate = async () => {
    if (!status) {
      setError('Please select a status to apply.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:5000/api/podcasts/batch-edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ episodes: selectedEpisodes, updates: { status } }),
      });

      if (!response.ok) {
        throw new Error('Batch update failed');
      }

      setSuccess('Batch update successful!');
      setSelectedEpisodes([]);
      setStatus('');
    } catch (err) {
      console.error(err);
      setError('Error updating episodes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="space-y-2">
        {episodes.map((episode) => (
          <div key={episode.id} className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={selectedEpisodes.includes(episode.id)}
              onChange={() => toggleEpisodeSelection(episode.id)}
            />
            <span>{episode.title}</span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
        </select>
      </div>
      {success && <div className="text-green-600 text-sm">{success}</div>}
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        onClick={handleBatchUpdate}
        className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
        disabled={loading || selectedEpisodes.length === 0 || !status}
      >
        {loading ? 'Updating...' : 'Update Selected'}
      </button>
    </div>
  );
}

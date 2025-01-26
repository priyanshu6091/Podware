import React, { useState } from 'react';

export function ScheduleEpisodeForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:5000/api/podcasts/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title, description, scheduleDate }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || 'Failed to schedule episode.');
      }

      setSuccess('Episode scheduled successfully!');
      setTitle('');
      setDescription('');
      setScheduleDate('');
    } catch (err: any) {
      console.error('Error scheduling episode:', err.message);
      setError(err.message || 'Error scheduling episode.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Schedule Date</label>
        <input
          type="date"
          value={scheduleDate}
          onChange={(e) => setScheduleDate(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      {success && <div className="text-green-600 text-sm">{success}</div>}
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        type="submit"
        className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
        disabled={loading}
      >
        {loading ? 'Scheduling...' : 'Schedule Episode'}
      </button>
    </form>
  );
}

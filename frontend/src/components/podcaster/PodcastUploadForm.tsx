import React, { useState } from 'react';
import axios from 'axios';

export function PodcastUploadForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [categories, setCategories] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'audio' | 'video') => {
    if (e.target.files && e.target.files[0]) {
      if (type === 'audio') {
        setAudioFile(e.target.files[0]);
      } else {
        setVideoFile(e.target.files[0]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!audioFile && !videoFile) {
      setMessage('Please upload either an audio or video file.');
      return;
    }
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('duration', duration);
    formData.append('categories', categories);
    if (audioFile) formData.append('audio', audioFile); // 'audio' matches the backend
    if (videoFile) formData.append('video', videoFile); // 'video' matches the backend
  
    try {
      const response = await axios.post('http://localhost:5000/api/podcasts/upload', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setMessage('Podcast uploaded successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading podcast:', error);
      setMessage('Error uploading podcast. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Upload Podcast</h2>
      {message && <p className="text-sm text-red-600 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Duration</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="block w-full px-4 py-2 border rounded-lg"
            placeholder="e.g., 30:00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Categories</label>
          <input
            type="text"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            className="block w-full px-4 py-2 border rounded-lg"
            placeholder="e.g., Tech, Business"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Audio File</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => handleFileChange(e, 'audio')}
            className="block w-full text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Video File</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleFileChange(e, 'video')}
            className="block w-full text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

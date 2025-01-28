// components/user/Discover.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { DiscoverSearch } from '../discover/DiscoverSearch';
import { CategoryList } from '../discover/CategoryList';
import { PodcastCard } from '../podcast/PodcastCard';
import { User, Podcast } from '../../types/index';

export function Discover() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [podcasters, setPodcasters] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPodcasters = async () => {
      try {
        const response = await axios.get<User[]>('http://localhost:5000/api/podcasters');
        setPodcasters(response.data || []);
      } catch (error) {
        console.error('Error fetching podcasters:', error);
      }
    };

    fetchPodcasters();
  }, []);

  const filteredPodcasters = podcasters.filter((podcaster) => {
    const matchesQuery = searchQuery
      ? podcaster.fullname.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        podcaster.fullname.lastname.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesCategory = selectedCategory
      ? podcaster.podcasts.some((podcast) => podcast.categories.includes(selectedCategory))
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
        <p className="text-gray-600">Find your next favorite podcaster</p>
      </div>

      {/* Search Bar */}
      <DiscoverSearch value={searchQuery} onChange={setSearchQuery} />

      {/* Categories */}
      <CategoryList
        categories={['Technology', 'Business', 'Health', 'Education']}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      {/* Podcaster List with Podcasts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {filteredPodcasters.map((podcaster) => (
          <div key={podcaster._id} className="bg-white shadow-lg rounded-lg p-4">
            <Link to={`/podcasters/${podcaster._id}`}>
              <h2 className="font-semibold text-lg mb-2">{podcaster.fullname.firstname} {podcaster.fullname.lastname}</h2>
              <p className="text-sm text-gray-600 mb-4">{podcaster.metadata.bio}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
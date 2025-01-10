import React, { useState } from 'react';
import { DiscoverSearch } from '../discover/DiscoverSearch';
import { CategoryList } from '../discover/CategoryList';
import { TrendingSection } from '../discover/TrendingSection';
import type { Podcast } from '../../types/index';

export function Discover() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const categories = [
    'Technology',
    'Business',
    'Health',
    'Education',
    'Entertainment',
    'Science',
    'Arts',
    'Sports'
  ];

  const trendingPodcasts: Podcast[] = [
    {
      id: '1',
      title: "AI Revolution Weekly",
      host: "Tech Trends",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000",
      duration: "40 min",
      likes: 2345,
      category: 'Technology',
    },
    {
      id: '2',
      title: "Global Economics Today",
      host: "Market Watch",
      thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1000",
      duration: "35 min",
      likes: 1456,
      category: 'Business',
    },
    {
      id: '3',
      title: "Mindful Leadership",
      host: "Growth Mindset",
      thumbnail: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=1000",
      duration: "30 min",
      likes: 987,
      category: 'Education',
    },
  ];

  // Filter trending podcasts based on search query and category
  const filteredPodcasts = trendingPodcasts.filter((podcast) => {
    const matchesQuery = searchQuery
      ? podcast.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesCategory = selectedCategory
      ? podcast.category === selectedCategory
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
        <p className="text-gray-600">Find your next favorite podcast</p>
      </div>

      <DiscoverSearch
        value={searchQuery}
        onChange={setSearchQuery}
      />

      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      <TrendingSection podcasts={filteredPodcasts} />
    </div>
  );
}

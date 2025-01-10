import React from 'react';
import { Search, Mic } from 'lucide-react';

interface DiscoverSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function DiscoverSearch({ value, onChange }: DiscoverSearchProps) {
  return (
    <div className="relative mb-6">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Discover new podcasts..."
          className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow duration-200"
        />
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        <button className="absolute right-3 top-2.5 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200">
          <Mic className="h-5 w-5 text-purple-600" />
        </button>
      </div>
    </div>
  );
}
import React from 'react';

interface CategoryListProps {
  categories: string[];
  onCategorySelect: (category: string) => void;
  selectedCategory?: string;
}

export function CategoryList({ categories, onCategorySelect, selectedCategory }: CategoryListProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Browse Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategorySelect(category)}
            className={`px-4 py-2 rounded-full transition-colors duration-200 ${
              selectedCategory === category
                ? 'bg-purple-600 text-white'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
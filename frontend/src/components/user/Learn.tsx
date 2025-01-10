import React from 'react';
import { BookOpen, Clock, Award } from 'lucide-react';
import { FeatureCard } from '../learn/FeatureCard';
import { CourseGrid } from '../learn/CourseGrid';
import { ProgressStats } from '../learn/ProgressStats';
import type { Podcast } from '../../types/index';

export function Learn() {
  const features = [
    {
      icon: BookOpen,
      title: "Learning Paths",
      description: "Follow curated paths designed by industry experts"
    },
    {
      icon: Clock,
      title: "Track Progress",
      description: "Monitor your learning journey with detailed analytics"
    },
    {
      icon: Award,
      title: "Earn Certificates",
      description: "Get recognized for your achievements and skills"
    }
  ];

  const courses: Podcast[] = [
    {
      id: '1',
      title: "Introduction to AI",
      host: "Tech Academy",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000",
      duration: "4 hours",
      likes: 3456,
    },
    {
      id: '2',
      title: "Business Strategy 101",
      host: "Business School",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000",
      duration: "6 hours",
      likes: 2345,
    },
    {
      id: '3',
      title: "Personal Development",
      host: "Growth Institute",
      thumbnail: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000",
      duration: "3 hours",
      likes: 1678,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learn</h1>
        <p className="text-gray-600">Expand your knowledge with expert-led courses</p>
      </div>

      <ProgressStats />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Popular Courses</h2>
          <button className="text-purple-600 hover:text-purple-700 font-medium">
            View All
          </button>
        </div>
        <CourseGrid courses={courses} />
      </section>
    </div>
  );
}
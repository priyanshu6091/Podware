import React from 'react';
import { PodcastCard } from '../podcast/PodcastCard';
import type { Podcast } from '../../types';

interface CourseGridProps {
  courses: Podcast[];
}

export function CourseGrid({ courses }: CourseGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <PodcastCard key={course.id} {...course} />
      ))}
    </div>
  );
}
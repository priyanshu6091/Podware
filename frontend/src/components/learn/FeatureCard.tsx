import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-purple-100">
      <Icon className="h-8 w-8 text-purple-600 mb-3" />
      <h3 className="font-semibold text-gray-900 text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
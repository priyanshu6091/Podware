import React from 'react';
import { ContentManagementPanel } from '../../components/podcaster/ContentManagementPanel';

export function PodcasterView() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-purple-600">Podcaster Studio</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Default Content (e.g., Content Management Panel) */}
          <ContentManagementPanel />
        </div>
      </div>
    </div>
  );
}

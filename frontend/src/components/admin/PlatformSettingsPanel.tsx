import React, { useState } from 'react';

export function PlatformSettingsPanel() {
  const [settings, setSettings] = useState({
    siteName: 'Podware',
    allowRegistrations: true,
    maxUploadSize: 50, // in MB
    revenueShare: 70, // percentage
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSaveSettings = () => {
    console.log('Saved Settings:', settings);
    // Here, you can send the settings to the backend using an API call
    alert('Settings saved successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">Platform Settings</h2>
      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-md font-medium text-gray-900 mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Site Name</label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700 mr-4">Allow New Registrations</label>
              <input
                type="checkbox"
                name="allowRegistrations"
                checked={settings.allowRegistrations}
                onChange={handleInputChange}
                className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Content Policies */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-md font-medium text-gray-900 mb-4">Content Policies</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Max Upload Size (MB)</label>
            <input
              type="number"
              name="maxUploadSize"
              value={settings.maxUploadSize}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              min={1}
              max={100}
            />
          </div>
        </div>

        {/* Monetization Settings */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-md font-medium text-gray-900 mb-4">Monetization Settings</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Revenue Share (%)</label>
            <input
              type="number"
              name="revenueShare"
              value={settings.revenueShare}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              min={0}
              max={100}
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveSettings}
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

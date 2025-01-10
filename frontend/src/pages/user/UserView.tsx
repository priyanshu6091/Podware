import React, { useState, useEffect } from 'react';
import { 
  Home as HomeIcon, 
  Compass, 
  BookOpen, 
  Trophy, 
  Heart, 
  Clock,
  Bell,
  User
} from 'lucide-react';
import { Home } from '../../components/user/Home';
import { Discover } from '../../components/user/Discover';
import { Learn } from '../../components/user/Learn';
import { Rewards } from '../../components/user/Rewards';
import { Favorites } from '../../components/user/Favorites';
import { History } from '../../components/user/History';
import { CoinBalance } from '../../components/rewards/CoinBalance';
import axios from 'axios';

type Tab = 'home' | 'discover' | 'learn' | 'rewards' | 'favorites' | 'history';

export function UserView() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [notifications, setNotifications] = useState(0);
  const [coinBalance, setCoinBalance] = useState(0);

  // Fetch user data (notifications and coin balance)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('User not authenticated.');

        const response = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setNotifications(response.data.notifications || 0);
        setCoinBalance(response.data.coinBalance || 0);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Tabs specific to the "User" role
  const tabs = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'rewards', label: 'Rewards', icon: Trophy },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'history', label: 'History', icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-purple-600">Podware</h1>
            </div>

            <div className="flex items-center space-x-4">
              <CoinBalance balance={coinBalance} />
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <Bell className="h-6 w-6 text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <User className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200">
        <nav className="p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center w-full px-4 py-3 rounded-lg ${
                activeTab === tab.id
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="h-5 w-5 mr-3" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="pl-64 pt-16">
        <div className="max-w-7xl mx-auto p-8">
          {activeTab === 'home' && <Home />}
          {activeTab === 'discover' && <Discover />}
          {activeTab === 'learn' && <Learn />}
          {activeTab === 'rewards' && <Rewards />}
          {activeTab === 'favorites' && <Favorites />}
          {activeTab === 'history' && <History />}
        </div>
      </div>
    </div>
  );
}

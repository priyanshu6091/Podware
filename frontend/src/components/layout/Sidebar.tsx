import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Home, Compass, BookOpen, Trophy, Heart, Clock, Mic, BarChart, DollarSign, Users, Settings, MessageSquare, Shield } from 'lucide-react';

export function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getNavigationItems = () => {
    if (!user) return [];

    switch (user.role) {
      case 'User':
        return [
          { name: 'Home', icon: Home, route: '/' },
          { name: 'Discover', icon: Compass, route: '/user/discover' },
          { name: 'Learn', icon: BookOpen, route: '/user/learn' },
          { name: 'Rewards', icon: Trophy, route: '/user/rewards' },
          { name: 'Favorites', icon: Heart, route: '/user/favorites' },
          { name: 'History', icon: Clock, route: '/user/history' },
        ];
      case 'Admin':
        return [
          { name: 'Users', icon: Users, route: '/admin/users' },
          { name: 'Content', icon: Shield, route: '/admin/content' },
          { name: 'Revenue', icon: DollarSign, route: '/admin/revenue' },
          { name: 'Settings', icon: Settings, route: '/admin/settings' },
          { name: 'Analytics', icon: BarChart, route: '/admin/analytics' },
          { name: 'Support', icon: MessageSquare, route: '/admin/support' },
        ];
      case 'Podcaster':
        return [
          { name: 'Dashboard', icon: BarChart, route: '/podcaster' },
          // { name: 'Content', icon: Mic, route: '/podcaster/content' },
          { name: 'Analytics', icon: BarChart, route: '/podcaster/analytics' },
          { name: 'Monetization', icon: DollarSign, route: '/podcaster/monetization' },
          { name: 'Engagement', icon: Users, route: '/podcaster/engagement' },
          { name: 'Settings', icon: Settings, route: '/podcaster/settings' },
          { name: 'Live Session', icon: MessageSquare, route: '/podcaster/live' },
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200">
      <div className="flex-1 flex flex-col pt-20 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigationItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.route)}
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-purple-600 w-full"
            >
              <item.icon className="mr-3 h-6 w-6" />
              {item.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

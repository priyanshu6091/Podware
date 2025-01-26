import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Home,
  Compass,
  BookOpen,
  Trophy,
  Heart,
  Clock,
  Mic,
  BarChart,
  DollarSign,
  Users,
  Settings,
  MessageSquare,
  Shield,
  X,
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ sidebarOpen, toggleSidebar }: SidebarProps) {
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

  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <div className="text-xl font-bold text-purple-600">Menu</div>
        <button onClick={toggleSidebar} className="lg:hidden">
          <X className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      <div className="p-4 space-y-2">
        {navigationItems.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              navigate(item.route);
              toggleSidebar();
            }}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <item.icon className="inline-block mr-3 h-6 w-6" />
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}

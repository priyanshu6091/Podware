import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ErrorBoundary } from './components/auth/ErrorBoundary';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Home } from './components/user/Home';
import { DiscoverPodcasts } from './components/discover/DiscoverPodcasts';  // Updated route
import { Learn } from './components/user/Learn';
import { Rewards } from './components/user/Rewards';
import { Favorites } from './components/user/Favorites';
import { History } from './components/user/History';
import { SignIn } from './pages/auth/SignIn';
import { SignUp } from './pages/auth/SignUp';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { AdminView } from './pages/admin/AdminView';
import { PodcasterView } from './pages/podcaster/PodcasterView';
import { AnalyticsPanel } from './components/admin/AnalyticsPanel';
import { AnalyticsPanelPodcaster } from './components/podcaster/AnalyticsPanel';
import { ContentManagementPanel } from './components/podcaster/ContentManagementPanel';
import { EngagementPanel } from './components/podcaster/EngagementPanel';
import { LiveSessionPanel } from './components/podcaster/LiveSessionPanel';
import { MonetizationPanel } from './components/podcaster/MonetizationPanel';
import { ProfileSettingsPanel } from './components/podcaster/ProfileSettingsPanel';
import { UserManagementPanel } from './components/admin/UserManagementPanel';
import { ContentModerationPanel } from './components/admin/ContentModerationPanel';
import { PlatformSettingsPanel } from './components/admin/PlatformSettingsPanel';
import { RevenueManagementPanel } from './components/admin/RevenueManagementPanel';
import { SupportPanel } from './components/admin/SupportPanel';
import { ChannelPage } from './pages/ChannelPage';
import { Discover } from './components/user/Discover';

function AppRoutes() {
  const { user, loading, fetchUser } = useAuth();

  useEffect(() => {
    if (!user) {
      fetchUser(); // Fetch user if not set
    }
  }, [user, fetchUser]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const renderDashboard = () => {
    if (!user) return <Navigate to="/signin" />;
    switch (user.role) {
      case 'Admin':
        return <Navigate to="/admin" />;
      case 'User':
        return <Navigate to="/user" />;
      case 'Podcaster':
        return <Navigate to="/podcaster" />;
      default:
        return <Navigate to="/signin" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {user && <Header />}
      {user && <Sidebar sidebarOpen={false} toggleSidebar={function (): void {
        throw new Error('Function not implemented.');
      } } />}
      <main className={user ? 'lg:pl-64 pt-16' : ''}>
        <Routes>
          {/* Auth Routes */}
          <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />

          {/* Redirect based on role */}
          <Route path="/" element={renderDashboard()} />

          {/* Admin Routes */}
          <Route path="/admin" element={user?.role === 'Admin' ? <AdminView /> : <Navigate to="/signin" />} />
          <Route path="/admin/users" element={<UserManagementPanel />} />
          <Route path="/admin/content" element={<ContentModerationPanel />} />
          <Route path="/admin/revenue" element={<RevenueManagementPanel />} />
          <Route path="/admin/settings" element={<PlatformSettingsPanel />} />
          <Route path="/admin/analytics" element={<AnalyticsPanel />} />
          <Route path="/admin/support" element={<SupportPanel />} />

          {/* Podcaster Routes */}
          <Route path="/podcaster" element={user?.role === 'Podcaster' ? <PodcasterView /> : <Navigate to="/signin" />} />
          <Route path="/podcaster/content" element={<ContentManagementPanel />} />
          <Route path="/podcaster/analytics" element={<AnalyticsPanelPodcaster />} />
          <Route path="/podcaster/monetization" element={<MonetizationPanel />} />
          <Route path="/podcaster/engagement" element={<EngagementPanel />} />
          <Route path="/podcaster/settings" element={<ProfileSettingsPanel />} />
          <Route path="/podcaster/live" element={<LiveSessionPanel />} />

          {/* User Routes */}
          <Route path="/user" element={user ? <Home /> : <Navigate to="/signin" />} />
          <Route path="/user/discover" element={user ? <Discover /> : <Navigate to="/signin" />} />  {/* Updated route */}
          <Route path="/user/learn" element={user ? <Learn /> : <Navigate to="/signin" />} />
          <Route path="/user/rewards" element={user ? <Rewards /> : <Navigate to="/signin" />} />
          <Route path="/user/favorites" element={user ? <Favorites /> : <Navigate to="/signin" />} />
          <Route path="/user/history" element={user ? <History /> : <Navigate to="/signin" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/signin" />} />
          <Route path="/settings" element={user ? <Settings /> : <Navigate to="/signin" />} />


          <Route path="/channels/:id" element={<ChannelPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

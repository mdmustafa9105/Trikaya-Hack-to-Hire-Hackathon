import React, { useState } from 'react';
import Layout from './components/Layout';
import Auth from './components/Auth';
import Feed from './components/Feed';
import MapComponent from './components/Map';
import Chat from './components/Chat';
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import Rulee from './components/Rulee';
import Onboarding from './components/Onboarding';
import { AppNotification } from './types';
import { MOCK_NOTIFICATIONS } from './constants';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [showSOS, setShowSOS] = useState(false);
  
  // Hoisted Notification State
  const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);

  const handleLogin = () => {
    setIsAuthenticated(true);
    // Trigger onboarding after successful login
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  // Notification Handlers
  const addNotification = (notification: Omit<AppNotification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotif: AppNotification = {
      id: Date.now().toString(),
      timestamp: 'Just now',
      isRead: false,
      ...notification
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleMarkRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  // Simple Router Switch
  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Feed addNotification={addNotification} />;
      case 'map': return <MapComponent />;
      case 'messages': return <Chat />;
      case 'marketplace': return <Marketplace />;
      case 'profile': return <Profile />;
      case 'rulee': return <Rulee />;
      default: return <Feed addNotification={addNotification} />;
    }
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <Layout 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage}
      showSOS={showSOS}
      setShowSOS={setShowSOS}
      notifications={notifications}
      onMarkRead={handleMarkRead}
      onMarkAllRead={handleMarkAllRead}
    >
      {renderPage()}
    </Layout>
  );
};

export default App;
import React, { useState } from 'react';
import { Home, Heart, MessageCircle, Map, User, Menu, Bell, Search, Video } from 'lucide-react';
import { CURRENT_USER } from '../constants';
import { AppNotification } from '../types';
import SOSButton from './SOSButton';
import NotificationsPanel from './NotificationsPanel';
import { AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  showSOS: boolean;
  setShowSOS: (show: boolean) => void;
  notifications: AppNotification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentPage, 
  setCurrentPage, 
  showSOS, 
  setShowSOS,
  notifications,
  onMarkRead,
  onMarkAllRead
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const NavItem = ({ page, icon: Icon, label }: { page: string, icon: any, label: string }) => (
    <button
      onClick={() => setCurrentPage(page)}
      className={`flex flex-col items-center justify-center w-full p-2 transition-colors ${
        currentPage === page ? 'text-paw-600' : 'text-stone-400 hover:text-stone-600'
      }`}
    >
      <Icon size={24} strokeWidth={currentPage === page ? 2.5 : 2} />
      <span className="text-[10px] mt-1 font-medium">{label}</span>
    </button>
  );

  return (
    <div className="h-screen bg-stone-50 text-stone-900 font-sans flex flex-col md:flex-row max-w-7xl mx-auto shadow-2xl overflow-hidden relative">
      
      {/* Sidebar (Desktop) - Fixed Height */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-stone-200 h-full flex-shrink-0 z-20">
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-3 text-paw-600">
            <div className="bg-paw-100 p-2 rounded-xl">
              <Heart size={28} fill="currentColor" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Pawbrûlée</h1>
          </div>
        </div>

        <nav className="space-y-2 flex-1 px-6 overflow-y-auto mt-4">
          {[
            { id: 'home', icon: Home, label: 'Feed' },
            { id: 'marketplace', icon: Search, label: 'Marketplace' },
            { id: 'rulee', icon: Video, label: 'Rulee' },
            { id: 'map', icon: Map, label: 'Rescue Map' },
            { id: 'messages', icon: MessageCircle, label: 'Messages' },
            { id: 'profile', icon: User, label: 'Profile' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex items-center gap-4 w-full p-3 rounded-xl transition-all ${
                currentPage === item.id 
                  ? 'bg-paw-50 text-paw-600 font-semibold' 
                  : 'text-stone-500 hover:bg-stone-50'
              }`}
            >
              <item.icon size={22} />
              {item.label}
            </button>
          ))}
          
          <button
            onClick={() => setShowNotifications(true)}
            className={`flex items-center gap-4 w-full p-3 rounded-xl transition-all mt-4 ${
              showNotifications ? 'bg-paw-50 text-paw-600 font-semibold' : 'text-stone-500 hover:bg-stone-50'
            }`}
          >
            <div className="relative">
               <Bell size={22} />
               {unreadCount > 0 && (
                 <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
               )}
            </div>
            Notifications
          </button>
        </nav>

        <div className="mt-auto p-6 pt-4 border-t border-stone-100 flex items-center gap-3 bg-white">
          <img src={CURRENT_USER.avatar} className="w-10 h-10 rounded-full object-cover" alt="User" />
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold truncate">{CURRENT_USER.fullName}</p>
            <p className="text-xs text-stone-500 truncate">@{CURRENT_USER.username}</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative bg-stone-50 overflow-hidden">
        
        {/* Mobile Header */}
        <header className={`md:hidden flex-shrink-0 sticky top-0 z-30 border-b border-stone-100 px-4 py-3 flex justify-between items-center ${currentPage === 'rulee' ? 'bg-black/90 text-white border-stone-800' : 'bg-white/95 backdrop-blur-md'}`}>
           <div className={`flex items-center gap-2 ${currentPage === 'rulee' ? 'text-paw-400' : 'text-paw-600'}`}>
            <Heart size={24} fill="currentColor" />
            <h1 className="text-lg font-bold">Pawbrûlée</h1>
           </div>
           <div className="flex gap-4">
             <button onClick={() => setShowNotifications(true)} className="relative">
                <Bell size={24} className={currentPage === 'rulee' ? 'text-stone-300' : 'text-stone-600'} />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white"></span>
                  </span>
                )}
             </button>
           </div>
        </header>

        {/* Content Wrapper */}
        <div className={`flex-1 w-full relative ${
             currentPage === 'rulee' ? 'overflow-hidden' : 'overflow-y-auto no-scrollbar'
           }`}>
           
           <div className={`mx-auto min-h-full ${
             currentPage === 'rulee' ? 'h-full max-w-full' : 'max-w-2xl pb-24 md:pb-10'
           }`}>
             {children}
           </div>
        </div>
      </main>

      {/* SOS Button (Floating) */}
      <div className="fixed bottom-20 right-4 md:bottom-10 md:right-10 z-40">
        <SOSButton active={showSOS} onToggle={() => setShowSOS(!showSOS)} />
      </div>

      {/* Bottom Nav (Mobile) */}
      <nav className="md:hidden flex-shrink-0 bg-white border-t border-stone-200 z-30 px-2 py-1 flex justify-between items-center h-16 text-xs safe-area-bottom">
        <NavItem page="home" icon={Home} label="Feed" />
        <NavItem page="map" icon={Map} label="Map" />
        <NavItem page="rulee" icon={Video} label="Rulee" />
        <NavItem page="messages" icon={MessageCircle} label="Chat" />
        <NavItem page="profile" icon={User} label="Profile" />
      </nav>

      {/* Notification Panel Overlay */}
      <AnimatePresence>
        {showNotifications && (
          <NotificationsPanel 
            notifications={notifications} 
            onClose={() => setShowNotifications(false)} 
            onMarkRead={onMarkRead}
            onMarkAllRead={onMarkAllRead}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
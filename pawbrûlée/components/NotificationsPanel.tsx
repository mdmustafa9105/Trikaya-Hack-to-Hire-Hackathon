import React, { useState } from 'react';
import { AppNotification } from '../types';
import { Heart, UserPlus, AlertTriangle, Info, Check, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  notifications: AppNotification[];
  onClose: () => void;
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
}

const NotificationsPanel: React.FC<Props> = ({ notifications, onClose, onMarkRead, onMarkAllRead }) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Unread' | 'Alerts'>('All');

  const getIcon = (type: string) => {
    switch(type) {
      case 'like': return <Heart size={16} className="text-white" fill="currentColor" />;
      case 'follow': return <UserPlus size={16} className="text-white" />;
      case 'alert': return <AlertTriangle size={16} className="text-white" />;
      default: return <Info size={16} className="text-white" />;
    }
  };

  const getBgColor = (type: string) => {
    switch(type) {
      case 'like': return 'bg-red-500';
      case 'follow': return 'bg-blue-500';
      case 'alert': return 'bg-red-600 animate-pulse';
      default: return 'bg-paw-500';
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'Unread') return !n.isRead;
    if (activeTab === 'Alerts') return n.type === 'alert';
    return true;
  });

  return (
    <div className="fixed inset-0 z-[100] flex justify-end pointer-events-none">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto" onClick={onClose}></div>
      
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-sm bg-white h-full shadow-2xl pointer-events-auto flex flex-col"
      >
        <div className="p-4 border-b border-stone-100 bg-white z-10">
          <div className="flex justify-between items-center mb-4">
             <div>
                <h2 className="text-xl font-bold">Notifications</h2>
                <p className="text-xs text-stone-400">{notifications.filter(n => !n.isRead).length} unread messages</p>
             </div>
             <div className="flex gap-2">
               <button onClick={onMarkAllRead} className="p-2 text-paw-600 hover:bg-paw-50 rounded-full" title="Mark all read">
                  <Check size={20} />
               </button>
               <button onClick={onClose} className="p-2 text-stone-400 hover:bg-stone-50 rounded-full">
                  <X size={20} />
               </button>
             </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {['All', 'Unread', 'Alerts'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === tab 
                    ? 'bg-stone-900 text-white shadow-md' 
                    : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-stone-400">
               <div className="bg-stone-50 p-4 rounded-full mb-3">
                 <Filter size={32} className="opacity-50" />
               </div>
               <p className="font-medium">No {activeTab.toLowerCase()} notifications.</p>
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <motion.div 
                key={notif.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => onMarkRead(notif.id)}
                className={`p-3 rounded-xl flex gap-3 cursor-pointer transition-colors border border-transparent relative overflow-hidden ${
                  notif.isRead ? 'bg-white hover:bg-stone-50' : 'bg-paw-50/40 border-paw-100'
                }`}
              >
                <div className="relative shrink-0">
                  {notif.user ? (
                    <img src={notif.user.avatar} className="w-10 h-10 rounded-full object-cover" alt="User" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
                       <img src="https://lucide.dev/icons/paw-print.svg" className="w-6 h-6 opacity-50" alt="System" />
                    </div>
                  )}
                  <div className={`absolute -bottom-1 -right-1 p-1 rounded-full border-2 border-white ${getBgColor(notif.type)}`}>
                    {getIcon(notif.type)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-stone-800 leading-tight">
                    {notif.user && <span className="font-bold">{notif.user.username} </span>}
                    {notif.message}
                  </p>
                  <p className={`text-xs mt-1 ${notif.type === 'alert' ? 'text-red-500 font-bold' : 'text-stone-400'}`}>
                    {notif.timestamp}
                  </p>
                </div>

                {!notif.isRead && (
                  <div className="self-center">
                    <div className="w-2.5 h-2.5 bg-paw-500 rounded-full"></div>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default NotificationsPanel;
import React, { useState } from 'react';
import { CURRENT_USER, MOCK_POSTS } from '../constants';
import { Settings, MapPin, Grid, Bookmark, Heart, Edit3, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'likes' | 'saved'>('posts');

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Banner */}
      <div className="h-44 bg-gradient-to-br from-paw-400 via-paw-500 to-paw-600 relative overflow-hidden">
         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         <button className="absolute top-4 right-4 text-white/90 hover:text-white bg-black/20 p-2.5 rounded-full backdrop-blur-md transition-all hover:bg-black/30">
           <Settings size={20} />
         </button>
      </div>
      
      {/* Header Info */}
      <div className="px-5 -mt-16 mb-2 relative">
        <div className="flex justify-between items-end mb-4">
          <div className="relative group">
            <div className="rounded-full bg-white p-1 shadow-xl">
               <img src={CURRENT_USER.avatar} className="w-28 h-28 rounded-full object-cover bg-stone-100" alt="Profile" />
            </div>
            <button className="absolute bottom-2 right-2 bg-stone-900 text-white p-2 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform">
               <Edit3 size={14} />
            </button>
          </div>
          <button className="bg-stone-100 text-stone-900 hover:bg-stone-200 transition-colors px-6 py-2.5 rounded-2xl text-sm font-bold shadow-sm mb-2 border border-stone-200">
            Edit Profile
          </button>
        </div>
        
        <div className="mb-4">
          <h2 className="text-2xl font-black text-stone-900 flex items-center gap-2">
            {CURRENT_USER.fullName} 
            {CURRENT_USER.isVerified && <ShieldCheck size={20} className="text-blue-500 fill-blue-50" />}
          </h2>
          <p className="text-stone-500 font-medium">@{CURRENT_USER.username}</p>
        </div>

        <p className="text-stone-700 text-sm mb-5 leading-relaxed max-w-md">{CURRENT_USER.bio}</p>
        
        <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 mb-6 bg-stone-50 w-fit px-3 py-1.5 rounded-full border border-stone-100">
          <MapPin size={14} className="text-paw-600" /> {CURRENT_USER.location}
        </div>

        {/* Stats */}
        <div className="flex justify-between bg-stone-50 rounded-2xl p-5 mb-6 border border-stone-100">
          {[
            { label: 'Posts', val: CURRENT_USER.stats.posts },
            { label: 'Followers', val: '8.5k' },
            { label: 'Following', val: CURRENT_USER.stats.following }
          ].map((stat) => (
            <div key={stat.label} className="text-center flex-1 cursor-pointer hover:bg-stone-100 rounded-xl transition-colors py-1">
              <div className="font-black text-xl text-stone-900">{stat.val}</div>
              <div className="text-xs font-bold text-stone-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-around border-b border-stone-100 mb-1 sticky top-0 bg-white z-10">
         {[
           { id: 'posts', icon: Grid },
           { id: 'likes', icon: Heart },
           { id: 'saved', icon: Bookmark }
         ].map((tab) => (
           <button 
             key={tab.id}
             onClick={() => setActiveTab(tab.id as any)}
             className={`flex-1 flex justify-center py-4 relative transition-colors ${
               activeTab === tab.id ? 'text-paw-600' : 'text-stone-300 hover:text-stone-500'
             }`}
           >
             <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} className={activeTab === tab.id ? 'transform scale-110 transition-transform' : ''} />
             {activeTab === tab.id && (
               <motion.div layoutId="activeTab" className="absolute bottom-0 w-12 h-0.5 bg-paw-600 rounded-full" />
             )}
           </button>
         ))}
      </div>

      {/* Content Grid */}
      <div className="min-h-[400px]">
        {activeTab === 'posts' && (
          <div className="grid grid-cols-3 gap-0.5 pb-2">
            {MOCK_POSTS.map(post => (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                key={post.id} 
                className="aspect-square bg-stone-100 overflow-hidden relative group cursor-pointer"
              >
                <img src={post.imageUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Post" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2">
                   <Heart size={18} fill="white" /> <span className="font-bold">{post.likes}</span>
                </div>
              </motion.div>
            ))}
            {/* Fillers for visual density */}
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="aspect-square bg-stone-100 animate-pulse"></div>
            ))}
          </div>
        )}

        {activeTab === 'likes' && (
           <div className="flex flex-col items-center justify-center py-24 text-stone-400">
              <div className="p-4 bg-stone-50 rounded-full mb-3">
                 <Heart size={40} className="opacity-20 text-stone-500" />
              </div>
              <p className="text-sm font-medium">Posts you've liked will appear here.</p>
           </div>
        )}

        {activeTab === 'saved' && (
           <div className="flex flex-col items-center justify-center py-24 text-stone-400">
              <div className="p-4 bg-stone-50 rounded-full mb-3">
                 <Bookmark size={40} className="opacity-20 text-stone-500" />
              </div>
              <p className="text-sm font-medium">Only you can see what you've saved.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
import React, { useState } from 'react';
import { MOCK_POSTS, MOCK_STORIES } from '../constants';
import { UserRole, DonationCampaign, AppNotification } from '../types';
import DonationCard from './DonationCard';
import { Heart, MessageCircle, Send, Bookmark, Plus, Search, BadgeCheck } from 'lucide-react';

interface FeedProps {
  addNotification?: (n: Omit<AppNotification, 'id' | 'timestamp' | 'isRead'>) => void;
}

const Feed: React.FC<FeedProps> = ({ addNotification }) => {
  const [activeTab, setActiveTab] = useState('All Posts');
  
  const getFilteredPosts = () => {
    switch (activeTab) {
      case 'Donations':
        return MOCK_POSTS.filter(post => post.type === 'donation');
      case 'Spotlight':
        return MOCK_POSTS.filter(post => 
          post.user.role === UserRole.VET || 
          post.user.role === UserRole.NGO || 
          post.user.isVerified
        );
      default:
        return MOCK_POSTS;
    }
  };

  const filteredPosts = getFilteredPosts();

  return (
    <div className="pt-2">
      
      {/* Search Header */}
      <div className="px-4 mb-6 mt-2 flex items-center gap-2">
        <div className="relative group flex-1">
          <input 
            type="text" 
            placeholder="Search Pawbrûlée..." 
            className="w-full bg-white border border-stone-200 rounded-2xl py-3.5 pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-paw-400 focus:border-transparent shadow-sm transition-all"
          />
          <div className="absolute left-4 top-3.5 text-stone-400 group-focus-within:text-paw-500 transition-colors pointer-events-none">
             <Search size={20} />
          </div>
          <button className="absolute right-2 top-2 bg-stone-100 p-1.5 rounded-lg text-stone-400 hover:text-stone-600">
             <Search size={16} />
          </button>
        </div>
      </div>

      {/* Stories */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 mb-8 pb-2">
        <div className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group">
           <div className="w-18 h-18 p-[2px] rounded-full border-2 border-dashed border-paw-300 group-hover:border-paw-500 transition-colors flex items-center justify-center">
             <div className="w-16 h-16 rounded-full bg-stone-50 flex items-center justify-center text-paw-500">
               <Plus size={24} />
             </div>
           </div>
           <span className="text-xs font-medium text-stone-600">Add Story</span>
        </div>
        {MOCK_STORIES.map(story => (
          <div key={story.id} className="flex flex-col items-center gap-2 shrink-0 cursor-pointer">
            <div className={`w-18 h-18 rounded-full p-[3px] ${story.hasUnseen ? 'bg-gradient-to-tr from-yellow-400 to-paw-600' : 'bg-stone-200'}`}>
              <img src={story.avatar} className="w-16 h-16 rounded-full border-2 border-white object-cover" alt={story.username} />
            </div>
            <span className="text-xs font-medium text-stone-600 truncate w-16 text-center">{story.username}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex px-4 gap-2 mb-6 overflow-x-auto no-scrollbar">
        {['All Posts', 'Donations', 'Spotlight'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
              activeTab === tab 
                ? 'bg-paw-600 text-white shadow-lg shadow-paw-200 transform scale-105' 
                : 'bg-white text-stone-500 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="px-4 space-y-6">
        {filteredPosts.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-16 text-stone-400 bg-white rounded-3xl border border-stone-100 border-dashed">
             <div className="bg-stone-50 p-4 rounded-full mb-3">
                <Search size={32} />
             </div>
             <p className="font-medium">No posts found in {activeTab}.</p>
             <button onClick={() => setActiveTab('All Posts')} className="text-paw-600 text-sm font-bold mt-2 hover:underline">
               View all posts
             </button>
           </div>
        ) : (
          filteredPosts.map(post => {
            if (post.type === 'donation') {
              return <DonationCard key={post.id} post={post as DonationCampaign} addNotification={addNotification} />;
            }

            // Regular Post
            return (
              <div key={post.id} className="bg-white border border-stone-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <img src={post.user.avatar} className="w-10 h-10 rounded-full object-cover border border-stone-100" alt="Avatar" />
                  <div>
                    <h4 className="font-bold text-sm text-stone-900 flex items-center gap-1">
                      {post.user.fullName}
                      {post.user.isVerified && <BadgeCheck size={16} className="text-blue-500 fill-blue-50" />}
                    </h4>
                    <p className="text-xs text-stone-400">{post.timestamp}</p>
                  </div>
                </div>
                
                {post.caption && <p className="text-sm text-stone-700 mb-3 leading-relaxed">{post.caption}</p>}
                
                <div className="rounded-2xl overflow-hidden mb-4 bg-stone-100">
                  <img src={post.imageUrl} className="w-full h-auto object-cover max-h-[500px]" alt="Post" />
                </div>

                <div className="flex items-center justify-between text-stone-500 pt-2 border-t border-stone-50 mt-2">
                  <div className="flex gap-6">
                    <button className="flex items-center gap-2 hover:text-pink-500 transition-colors group">
                      <Heart size={22} className="group-hover:scale-110 transition-transform" /> 
                      <span className="text-sm font-medium">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-blue-500 transition-colors group">
                      <MessageCircle size={22} className="group-hover:scale-110 transition-transform" /> 
                      <span className="text-sm font-medium">{post.comments}</span>
                    </button>
                    <button className="hover:text-green-500 transition-colors group">
                      <Send size={22} className="group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                  <button className="hover:text-paw-600 transition-colors">
                    <Bookmark size={22} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Feed;
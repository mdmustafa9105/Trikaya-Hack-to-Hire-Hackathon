import React from 'react';
import { MOCK_REELS } from '../constants';
import { Heart, MessageCircle, Share2, Music, MoreVertical, Plus } from 'lucide-react';

const Rulee: React.FC = () => {
  return (
    // Uses full height of parent (minus mobile header if present, but handled by absolute/overflow)
    <div className="h-full w-full bg-black md:rounded-3xl overflow-y-scroll snap-y snap-mandatory no-scrollbar relative">
      {MOCK_REELS.map((reel) => (
        <div key={reel.id} className="h-full w-full snap-start relative bg-stone-900 flex items-center justify-center overflow-hidden">
          {/* Simulated Video Background */}
          <img 
            src={reel.videoUrl} 
            className="absolute inset-0 w-full h-full object-cover opacity-70"
            alt="Reel Content"
          />
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90"></div>

          {/* Right Side Actions */}
          <div className="absolute bottom-24 right-4 flex flex-col items-center gap-6 z-20 text-white">
            <div className="flex flex-col items-center gap-1 group cursor-pointer">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-full group-hover:bg-white/20 transition-all">
                <Heart size={28} className="text-white" />
              </div>
              <span className="text-xs font-bold drop-shadow-md">{reel.likes}</span>
            </div>
            <div className="flex flex-col items-center gap-1 group cursor-pointer">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-full group-hover:bg-white/20 transition-all">
                <MessageCircle size={28} />
              </div>
              <span className="text-xs font-bold drop-shadow-md">{reel.comments}</span>
            </div>
            <div className="flex flex-col items-center gap-1 group cursor-pointer">
               <div className="p-3 bg-white/10 backdrop-blur-md rounded-full group-hover:bg-white/20 transition-all">
                <Share2 size={28} />
               </div>
              <span className="text-xs font-bold drop-shadow-md">Share</span>
            </div>
            <button className="p-2 opacity-80 hover:opacity-100">
              <MoreVertical size={24} />
            </button>
            
            <div className="relative mt-4">
               <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden animate-[spin_5s_linear_infinite]">
                 <img src={reel.user.avatar} className="w-full h-full object-cover" alt="music" />
               </div>
               <div className="absolute -bottom-1 -right-1 bg-paw-500 rounded-full p-1">
                 <Music size={10} />
               </div>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-6 left-4 right-16 z-20 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                 <img src={reel.user.avatar} className="w-11 h-11 rounded-full border-2 border-white shadow-md" alt="User" />
                 <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-500 rounded-full p-0.5 border border-white">
                    <Plus size={10} strokeWidth={4} />
                 </div>
              </div>
              <div className="flex flex-col">
                 <span className="font-bold text-base shadow-black drop-shadow-lg">@{reel.user.username}</span>
                 <span className="text-[10px] bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-md w-fit mt-0.5">Follow</span>
              </div>
            </div>
            <p className="text-sm mb-3 line-clamp-2 leading-relaxed drop-shadow-md">{reel.caption}</p>
            <div className="flex items-center gap-2 text-xs opacity-90 bg-white/10 w-fit px-3 py-1.5 rounded-full backdrop-blur-sm">
              <Music size={14} />
              <div className="w-40 overflow-hidden whitespace-nowrap mask-linear-fade">
                 <p className="">{reel.song}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rulee;
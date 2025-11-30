import React, { useState } from 'react';
import { MOCK_PINS } from '../constants';
import { MapPin } from '../types';
import { Navigation, Phone, Search, Target, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MapComponent: React.FC = () => {
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(null);
  const [filter, setFilter] = useState('All');

  const filteredPins = filter === 'All' ? MOCK_PINS : MOCK_PINS.filter(p => p.type === filter.toLowerCase());

  return (
    <div className="h-[calc(100vh-140px)] w-full relative overflow-hidden bg-[#e5e7eb] md:rounded-3xl mt-0 md:mt-2 shadow-inner border-0 md:border border-stone-200">
      
      {/* Search & Filter Header */}
      <div className="absolute top-4 left-4 right-4 z-20 space-y-3">
         <div className="bg-white/95 backdrop-blur rounded-2xl shadow-lg flex items-center p-3.5 border border-stone-100">
            <Search className="text-stone-400 ml-1" size={20} />
            <input type="text" placeholder="Search clinics, rescues, NGOs..." className="flex-1 ml-3 outline-none text-sm text-stone-700 bg-transparent placeholder:text-stone-400" />
            <div className="border-l border-stone-200 pl-3 ml-2">
                <Compass className="text-paw-600" size={20} />
            </div>
         </div>
         <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 px-1">
           {['All', 'Rescue', 'Vet', 'NGO'].map(f => (
             <button 
               key={f} 
               onClick={() => setFilter(f)}
               className={`px-4 py-2 rounded-full text-xs font-bold shadow-md whitespace-nowrap transition-all transform hover:scale-105 ${
                 filter === f ? 'bg-stone-900 text-white' : 'bg-white text-stone-600 border border-stone-100'
               }`}
             >
               {f}
             </button>
           ))}
         </div>
      </div>

      {/* Map Container */}
      <div className="w-full h-full relative cursor-grab active:cursor-grabbing" onClick={() => setSelectedPin(null)}>
        {/* Map Background Pattern */}
        <div className="absolute inset-0 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px), radial-gradient(#cbd5e1 1.5px, #f1f5f9 1.5px)',
             backgroundSize: '24px 24px',
             backgroundPosition: '0 0, 12px 12px',
             backgroundColor: '#f8fafc'
           }}>
        </div>
        
        {/* Mock Roads/Features */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" xmlns="http://www.w3.org/2000/svg">
           <path d="M-50,200 C150,200 200,400 500,300 S800,100 1000,150" stroke="#cbd5e1" strokeWidth="30" fill="none" />
           <path d="M200,0 L200,1000" stroke="#cbd5e1" strokeWidth="20" fill="none" />
           <path d="M600,0 L500,1000" stroke="#cbd5e1" strokeWidth="20" fill="none" />
           <circle cx="500" cy="300" r="120" fill="#e2e8f0" opacity="0.6" />
        </svg>

        {/* Current Location */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
           <div className="w-64 h-64 bg-blue-500/5 rounded-full animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
           <div className="w-5 h-5 bg-blue-500 border-4 border-white rounded-full shadow-lg relative z-10"></div>
        </div>

        {/* Pins */}
        {filteredPins.map(pin => (
          <motion.button
            key={pin.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1, y: -5 }}
            onClick={(e) => { e.stopPropagation(); setSelectedPin(pin); }}
            className="absolute transform -translate-x-1/2 -translate-y-full z-10 group"
            style={{ top: `${pin.lat}%`, left: `${pin.lng}%` }}
          >
             {/* Label on Hover */}
             <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
               {pin.title}
             </div>

             <div className={`
               p-3 rounded-full border-[3px] border-white shadow-xl text-white relative transition-colors
               ${pin.type === 'vet' ? 'bg-blue-500' : pin.type === 'rescue' ? 'bg-green-500' : 'bg-orange-500'}
             `}>
               {pin.type === 'vet' && <div className="text-white text-xs font-bold">V</div>}
               {pin.type === 'rescue' && <div className="text-white text-xs font-bold">R</div>}
               {pin.type === 'ngo' && <div className="text-white text-xs font-bold">N</div>}
               
               <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-white translate-y-full drop-shadow-sm"></div>
             </div>
          </motion.button>
        ))}
      </div>

      {/* Pin Detail Card */}
      <AnimatePresence>
      {selectedPin && (
        <motion.div 
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="absolute bottom-6 left-4 right-4 bg-white rounded-3xl p-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] z-30 border border-stone-100"
        >
           <div className="flex justify-between items-start mb-4">
             <div className="flex items-center gap-4">
                <div className={`p-3.5 rounded-2xl shadow-sm ${
                   selectedPin.type === 'vet' ? 'bg-blue-50 text-blue-600' : selectedPin.type === 'rescue' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                }`}>
                  <Target size={28} />
                </div>
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-0.5">{selectedPin.type}</span>
                    <h3 className="text-xl font-bold text-stone-900 leading-tight">{selectedPin.title}</h3>
                </div>
             </div>
             <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
               selectedPin.status === 'open' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
             }`}>
               {selectedPin.status}
             </span>
           </div>
           
           <div className="grid grid-cols-2 gap-3 mt-4">
             <button className="bg-stone-900 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-stone-800 transition-colors shadow-lg shadow-stone-200">
               <Navigation size={18} /> Directions
             </button>
             <button className="bg-white border-2 border-stone-100 text-stone-800 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-stone-50 transition-colors">
               <Phone size={18} /> Call Now
             </button>
           </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default MapComponent;
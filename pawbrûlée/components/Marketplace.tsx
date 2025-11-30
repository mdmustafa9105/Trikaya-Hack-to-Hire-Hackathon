import React from 'react';
import { MOCK_SERVICES } from '../constants';
import { Star, MapPin } from 'lucide-react';

const Marketplace: React.FC = () => {
  return (
    <div className="pt-4 px-4 pb-20">
      <h2 className="text-2xl font-bold mb-4">Marketplace</h2>
      
      {/* Categories */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-paw-100 p-4 rounded-2xl flex flex-col items-center justify-center text-paw-800 h-24 cursor-pointer hover:bg-paw-200 transition-colors">
          <span className="text-2xl mb-1">🐕</span>
          <span className="font-bold text-sm">Services</span>
        </div>
        <div className="bg-green-100 p-4 rounded-2xl flex flex-col items-center justify-center text-green-800 h-24 cursor-pointer hover:bg-green-200 transition-colors">
          <span className="text-2xl mb-1">🏠</span>
          <span className="font-bold text-sm">Adopt</span>
        </div>
      </div>

      <h3 className="font-bold text-lg mb-3">Top Rated Services</h3>
      <div className="space-y-4">
        {MOCK_SERVICES.map(service => (
          <div key={service.id} className="bg-white p-3 rounded-2xl border border-stone-100 shadow-sm flex gap-3">
             <img src={service.imageUrl} className="w-24 h-24 rounded-xl object-cover" alt={service.title} />
             <div className="flex-1 py-1">
                <div className="flex justify-between items-start">
                   <span className="text-[10px] bg-stone-100 px-1.5 py-0.5 rounded text-stone-500 font-medium">{service.category}</span>
                   <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
                     <Star size={12} fill="currentColor" /> {service.rating}
                   </div>
                </div>
                <h4 className="font-bold text-stone-900 mt-1">{service.title}</h4>
                <p className="text-xs text-stone-500 mb-2">by {service.provider.fullName}</p>
                <div className="flex justify-between items-center mt-auto">
                   <span className="font-bold text-paw-600">{service.price}</span>
                   <button className="text-xs bg-stone-900 text-white px-3 py-1.5 rounded-lg font-medium">Book</button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;

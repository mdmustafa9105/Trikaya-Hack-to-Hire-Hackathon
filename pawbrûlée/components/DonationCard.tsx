import React, { useState } from 'react';
import { DonationCampaign, AppNotification } from '../types';
import { ShieldCheck, MapPin, Clock, Share2, Heart, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  post: DonationCampaign;
  addNotification?: (n: Omit<AppNotification, 'id' | 'timestamp' | 'isRead'>) => void;
}

const DonationCard: React.FC<Props> = ({ post, addNotification }) => {
  const [showModal, setShowModal] = useState(false);
  const [donating, setDonating] = useState(false);
  const percent = Math.min((post.raisedAmount / post.targetAmount) * 100, 100);

  const urgencyColors = {
    Low: 'bg-green-100 text-green-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    High: 'bg-orange-100 text-orange-700',
    Critical: 'bg-red-100 text-red-700 animate-pulse'
  };

  return (
    <>
      <div className="bg-white border border-stone-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow mb-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3">
            <img src={post.user.avatar} className="w-12 h-12 rounded-full object-cover border-2 border-paw-100" alt="Avatar" />
            <div>
              <div className="flex items-center gap-1">
                <h3 className="font-bold text-stone-900">{post.user.fullName}</h3>
                {post.user.isVerified && <ShieldCheck size={16} className="text-blue-500" />}
                {post.user.isNgoVerified && <span className="bg-paw-100 text-paw-700 text-[10px] font-bold px-1.5 py-0.5 rounded">NGO</span>}
              </div>
              <p className="text-xs text-stone-500">{post.timestamp} • <span className="flex items-center inline-flex gap-0.5"><MapPin size={10}/> {post.location}</span></p>
            </div>
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${urgencyColors[post.urgency]}`}>
            {post.urgency} Urgency
          </span>
        </div>

        {/* Content */}
        <div className="mb-4">
          <h4 className="font-bold text-lg mb-1">{post.title}</h4>
          <p className="text-stone-600 text-sm leading-relaxed mb-3">{post.caption}</p>
          <div className="relative rounded-2xl overflow-hidden h-64 bg-stone-100">
             <img src={post.imageUrl} className="w-full h-full object-cover" alt="Campaign" />
             <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 text-green-700 shadow-sm">
                <ShieldCheck size={14} />
                Legitimacy: {post.legitimacyScore}%
             </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1 font-medium">
             <span className="text-paw-600">₹{post.raisedAmount.toLocaleString()} raised</span>
             <span className="text-stone-400">of ₹{post.targetAmount.toLocaleString()}</span>
          </div>
          <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              className="bg-gradient-to-r from-paw-400 to-paw-600 h-full rounded-full"
            />
          </div>
          <div className="flex justify-between items-center mt-2 text-xs text-stone-400">
             <span>{Math.floor(percent)}% Funded</span>
             <span className="flex items-center gap-1"><Clock size={12}/> {post.daysLeft} days left</span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
           <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-stone-200 text-stone-600 font-semibold text-sm hover:bg-stone-50 transition-colors">
             <Share2 size={18} /> Share
           </button>
           <button 
             onClick={() => setShowModal(true)}
             className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-paw-600 text-white font-bold text-sm shadow-lg shadow-paw-200 hover:bg-paw-700 hover:shadow-paw-300 transition-all transform hover:-translate-y-0.5"
           >
             <Heart size={18} fill="currentColor" /> Donate Now
           </button>
        </div>
      </div>

      {/* Donation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="bg-white rounded-3xl w-full max-w-sm p-6 relative overflow-hidden shadow-2xl"
          >
             <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-800">✕</button>
             
             <h3 className="text-xl font-bold mb-1">Donate to Rescue</h3>
             <p className="text-sm text-stone-500 mb-6">Your contribution goes directly to verified account.</p>

             <div className="grid grid-cols-3 gap-2 mb-6">
                {[500, 1000, 2000].map(amt => (
                  <button key={amt} className="border border-paw-200 bg-paw-50 text-paw-700 font-bold py-2 rounded-xl hover:bg-paw-100">
                    ₹{amt}
                  </button>
                ))}
             </div>

             <div className="mb-6">
               <label className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 block">Payment Method</label>
               <div className="space-y-2">
                 <div className="flex items-center gap-3 p-3 border border-paw-500 bg-paw-50/50 rounded-xl cursor-pointer">
                    <div className="w-4 h-4 rounded-full border-4 border-paw-600"></div>
                    <span className="font-medium text-stone-800">UPI / GPay / PhonePe</span>
                 </div>
                 <div className="flex items-center gap-3 p-3 border border-stone-200 rounded-xl cursor-pointer hover:border-paw-300">
                    <div className="w-4 h-4 rounded-full border border-stone-300"></div>
                    <span className="font-medium text-stone-800">Credit / Debit Card</span>
                 </div>
               </div>
             </div>

             <button 
               onClick={() => {
                 setDonating(true);
                 setTimeout(() => {
                   setDonating(false);
                   setShowModal(false);
                   if (addNotification) {
                       addNotification({
                           type: 'alert',
                           message: `You successfully donated to ${post.title}!`,
                           user: post.user
                       });
                   }
                   alert("Thank you! Donation successful.");
                 }, 1500);
               }}
               disabled={donating}
               className="w-full bg-paw-600 text-white font-bold py-3 rounded-xl shadow-lg flex justify-center items-center gap-2"
             >
               {donating ? <span className="animate-spin">⌛</span> : 'Confirm Payment'}
             </button>
             
             <div className="mt-4 flex items-center justify-center gap-1 text-[10px] text-stone-400">
               <ShieldCheck size={12} /> Secure 256-bit SSL Encrypted
             </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default DonationCard;
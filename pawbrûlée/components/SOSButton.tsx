import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Phone, Video, MapPin, X, ShieldAlert } from 'lucide-react';

interface SOSButtonProps {
  active: boolean;
  onToggle: () => void;
}

const SOSButton: React.FC<SOSButtonProps> = ({ active, onToggle }) => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [alertSent, setAlertSent] = useState(false);

  useEffect(() => {
    let timer: any;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setAlertSent(true);
      setCountdown(null);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const startEmergency = () => {
    setCountdown(3);
  };

  const cancelEmergency = () => {
    setCountdown(null);
    setAlertSent(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-red-600 text-white p-4 rounded-full shadow-2xl shadow-red-600/40 relative group"
      >
        <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
        <div className="relative z-10 flex flex-col items-center">
            <span className="font-black text-xs">SOS</span>
        </div>
      </motion.button>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            className="fixed inset-0 z-50 bg-stone-900 flex flex-col items-center justify-between p-6 pb-12"
          >
            <div className="w-full flex justify-end">
              <button onClick={onToggle} className="p-2 bg-stone-800 rounded-full text-white">
                <X size={24} />
              </button>
            </div>

            <div className="text-center w-full max-w-md">
              <div className="mb-8 flex justify-center">
                 <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center animate-pulse">
                    <AlertTriangle size={48} className="text-red-500" />
                 </div>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-2">Emergency Mode</h2>
              <p className="text-stone-400 mb-8 text-sm">
                This will share your live location with nearby NGOs and Vets. 
                <span className="text-red-400 block mt-2 font-bold">Penalty applies for false alarms.</span>
              </p>

              {!alertSent && countdown === null && (
                <div className="space-y-4">
                  <button 
                    onClick={startEmergency}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-5 rounded-2xl shadow-lg shadow-red-900/50 flex items-center justify-center gap-3"
                  >
                    <ShieldAlert size={28} /> TAP TO ALERT
                  </button>
                  <button className="w-full bg-stone-800 hover:bg-stone-700 text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2">
                    <Video size={20} /> Live Stream Verification
                  </button>
                </div>
              )}

              {countdown !== null && (
                <div className="bg-white rounded-3xl p-8">
                   <h3 className="text-6xl font-black text-red-600 mb-4">{countdown}</h3>
                   <p className="text-stone-900 font-bold mb-4">Sending Alert...</p>
                   <button onClick={cancelEmergency} className="text-stone-500 underline text-sm">Cancel</button>
                </div>
              )}

              {alertSent && (
                <div className="bg-green-600 rounded-3xl p-8 text-white">
                   <div className="flex justify-center mb-4"><MapPin size={40} /></div>
                   <h3 className="text-2xl font-bold mb-2">Help is on the way!</h3>
                   <p className="opacity-90 text-sm mb-4">Alert sent to 3 NGOs and 5 Volunteers within 2km.</p>
                   <div className="bg-green-700 rounded-xl p-3 text-xs">
                      Location tracking active. Keep app open.
                   </div>
                </div>
              )}
            </div>

            <div className="text-stone-500 text-xs text-center w-full max-w-xs">
              By using this feature, you agree to allow geolocation tracking for emergency purposes.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SOSButton;

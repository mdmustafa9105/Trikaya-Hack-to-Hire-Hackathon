import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, AlertTriangle, Map, Video, ArrowRight, Check } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const steps = [
  {
    id: 1,
    title: "Welcome to Pawbrûlée",
    description: "A community dedicated to the welfare of every paw. Connect, rescue, and make a difference together.",
    icon: <Heart size={64} className="text-paw-600" fill="currentColor" />,
    color: "bg-paw-50"
  },
  {
    id: 2,
    title: "Emergency SOS",
    description: "Witness an animal in distress? Use the floating SOS button to instantly alert nearby NGOs and volunteers with your live location.",
    icon: <AlertTriangle size={64} className="text-red-500" />,
    color: "bg-red-50"
  },
  {
    id: 3,
    title: "Verified Giving",
    description: "Donate with confidence. All campaigns are vetted with legitimacy scores, ensuring your help reaches those who need it most.",
    icon: <div className="relative">
      <Heart size={64} className="text-paw-600" />
      <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full border-4 border-white">
        <Check size={20} strokeWidth={4} />
      </div>
    </div>,
    color: "bg-blue-50"
  },
  {
    id: 4,
    title: "Rescue Map & Services",
    description: "Find nearby vets, shelters, and pet-friendly services on our interactive map. Or explore 'Rulee' for wholesome pet content!",
    icon: <div className="flex gap-4">
      <Map size={48} className="text-stone-700" />
      <Video size={48} className="text-stone-700" />
    </div>,
    color: "bg-stone-100"
  }
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        
        {/* Progress Bar */}
        <div className="flex gap-2 mb-12">
          {steps.map((_, index) => (
            <div 
              key={index}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index <= currentStep ? 'w-full bg-paw-600' : 'w-full bg-stone-200'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            {/* Icon Circle */}
            <div className={`w-48 h-48 rounded-full ${steps[currentStep].color} flex items-center justify-center mb-10 shadow-inner`}>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                {steps[currentStep].icon}
              </motion.div>
            </div>

            {/* Text */}
            <h2 className="text-3xl font-black text-stone-900 mb-4 tracking-tight">
              {steps[currentStep].title}
            </h2>
            <p className="text-stone-500 leading-relaxed text-lg mb-8">
              {steps[currentStep].description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Action Button */}
        <div className="mt-8">
          <button
            onClick={handleNext}
            className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-stone-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-stone-200"
          >
            {currentStep === steps.length - 1 ? "Get Started" : "Next"}
            <ArrowRight size={20} />
          </button>
          {currentStep < steps.length - 1 && (
             <button onClick={onComplete} className="w-full py-4 text-stone-400 font-semibold text-sm hover:text-stone-600 transition-colors">
               Skip Tour
             </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default Onboarding;
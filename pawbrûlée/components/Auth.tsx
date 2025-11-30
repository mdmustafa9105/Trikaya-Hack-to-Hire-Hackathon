import React, { useState } from 'react';
import { Heart, Check, ChevronRight, Loader2, ShieldCheck, Mail, Lock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthProps {
  onLogin: () => void;
}

// Fixed: Component defined outside the main component to prevent re-mounting on state changes
const InputField = ({ icon: Icon, type, placeholder, value, onChange }: any) => (
  <div className="relative mb-4 z-20">
    <div className="absolute left-3 top-3.5 text-stone-400 pointer-events-none">
      <Icon size={20} />
    </div>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-paw-500 transition-all text-stone-800"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [aadhaar, setAadhaar] = useState('');

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (step < 3) setStep(step + 1);
      else onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen bg-paw-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-paw-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 z-0"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 z-10 relative"
      >
        <div className="flex justify-center mb-6 text-paw-600">
           <div className="p-3 bg-paw-100 rounded-2xl">
             <Heart size={40} fill="currentColor" />
           </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-stone-800 mb-2">
          {isLoginMode ? 'Welcome Back' : step === 1 ? 'Join Pawbrûlée' : step === 2 ? 'Create Identity' : 'Get Verified'}
        </h2>
        <p className="text-center text-stone-500 mb-8">
          {isLoginMode ? 'Login to continue saving lives' : 'Connect, Rescue, Love.'}
        </p>

        <AnimatePresence mode="wait">
          {isLoginMode ? (
            <motion.div key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <InputField icon={Mail} type="email" placeholder="Email Address" value={email} onChange={setEmail} />
              <InputField icon={Lock} type="password" placeholder="Password" value={password} onChange={setPassword} />
              <button onClick={onLogin} className="w-full bg-paw-600 hover:bg-paw-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-paw-500/30 flex justify-center items-center gap-2">
                 Sign In
              </button>
            </motion.div>
          ) : (
            <motion.div key={`step-${step}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              
              {step === 1 && (
                <>
                  <InputField icon={Mail} type="email" placeholder="Email Address" value={email} onChange={setEmail} />
                  <InputField icon={Lock} type="password" placeholder="Create Password" value={password} onChange={setPassword} />
                </>
              )}

              {step === 2 && (
                <>
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-stone-100 rounded-full mx-auto mb-3 flex items-center justify-center text-4xl">🐶</div>
                    <p className="text-xs text-paw-600 font-semibold cursor-pointer">Upload Avatar</p>
                  </div>
                  <InputField icon={User} type="text" placeholder="@username" value={username} onChange={setUsername} />
                </>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="p-4 bg-paw-50 border border-paw-100 rounded-xl flex items-start gap-3">
                    <ShieldCheck className="text-paw-600 shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-stone-800">Verify Identity</h4>
                      <p className="text-xs text-stone-600 mt-1">
                        Optional: Verify with Aadhaar to get a blue checkmark and access NGO tools.
                      </p>
                    </div>
                  </div>
                  <InputField icon={User} type="text" placeholder="Aadhaar Number (Optional)" value={aadhaar} onChange={setAadhaar} />
                  <div className="text-center">
                    <button onClick={onLogin} className="text-sm text-stone-400 hover:text-stone-600 underline">Skip for now</button>
                  </div>
                </div>
              )}

              <button 
                onClick={handleNext}
                disabled={loading}
                className="w-full mt-6 bg-paw-600 hover:bg-paw-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-paw-500/30 flex justify-center items-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : (
                  <>
                    {step === 3 ? 'Complete Setup' : 'Continue'}
                    {step < 3 && <ChevronRight size={20} />}
                  </>
                )}
              </button>
              
              <div className="flex justify-center mt-4 gap-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`h-1.5 rounded-full transition-all ${i <= step ? 'w-6 bg-paw-500' : 'w-2 bg-stone-200'}`} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 pt-6 border-t border-stone-100 text-center">
          <p className="text-stone-500 text-sm">
            {isLoginMode ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="text-paw-600 font-bold hover:underline"
            >
              {isLoginMode ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
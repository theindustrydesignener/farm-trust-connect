import { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, SealCheck, Shield } from '@phosphor-icons/react';
import { onboardingSteps } from './data';

export function SplashScreen({ onDone }: { onDone: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-green-700 to-green-900 text-white p-8">
      <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 12 }} className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
        <span className="text-5xl font-bold text-white">F</span>
      </motion.div>
      <h1 className="text-4xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>FarmLink</h1>
      <p className="text-green-200 text-center mt-3 text-sm max-w-64">Fresh produce direct from Nigerian farmers to your table</p>
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onDone} className="mt-10 bg-white text-green-800 font-bold px-10 py-3.5 rounded-full text-sm shadow-lg">Get Started</motion.button>
    </motion.div>
  );
}

export function OnboardingScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const s = onboardingSteps[step];
  const icons = [Leaf, SealCheck, Shield];
  const Icon = icons[step];
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <motion.div key={step} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-3xl flex items-center justify-center mb-8" style={{ backgroundColor: s.color + '20' }}>
            <Icon size={52} color={s.color} weight="fill" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.title}</h2>
          <p className="text-gray-500 text-center mt-3 text-sm leading-relaxed">{s.description}</p>
        </motion.div>
      </div>
      <div className="px-8 pb-10">
        <div className="flex justify-center gap-2 mb-8">
          {onboardingSteps.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all ${i === step ? 'w-8 bg-green-600' : 'w-2 bg-gray-200'}`} />
          ))}
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => step < 2 ? setStep(s => s + 1) : onDone()} className="w-full bg-green-600 text-white font-bold py-3.5 rounded-full text-sm">
          {step < 2 ? 'Continue' : 'Start Shopping'}
        </motion.button>
      </div>
    </div>
  );
}

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="w-20 h-20 rounded-2xl bg-green-600 flex items-center justify-center mb-6">
          <span className="text-4xl font-bold text-white">F</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Welcome to FarmLink</h2>
        <p className="text-gray-500 text-sm mt-2 text-center">Sign in to access fresh produce from verified Nigerian farmers</p>
        <div className="w-full mt-8 space-y-3">
          <div className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-400">+234 812 345 6789</div>
          <div className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-400">&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</div>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onLogin} className="w-full bg-green-600 text-white font-bold py-3.5 rounded-full text-sm mt-6">Sign In</motion.button>
        <p className="text-xs text-gray-400 mt-4">By continuing, you agree to our Terms &amp; Privacy Policy</p>
      </div>
    </div>
  );
}
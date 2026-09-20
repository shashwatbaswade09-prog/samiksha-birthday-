import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { config } from '../../data/config';
import { Gift, ArrowRight } from 'lucide-react';

export const Surprise = () => {
  const { setScene } = useAppStore();
  const [step, setStep] = useState(0); // 0: Wait text, 1: Box, 2: Open Surprise

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-black px-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,240,0.05)_0%,transparent_70%)]" />

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="wait"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center text-center cursor-pointer"
            onClick={() => setStep(1)}
          >
            <p className="font-serif text-2xl md:text-3xl text-ivory/80 italic mb-4">
              Wait.
            </p>
            <p className="font-serif text-2xl md:text-3xl text-champagne italic">
              There's still one thing...
            </p>
            <p className="font-sans text-[10px] text-white/30 tracking-widest uppercase mt-12 animate-pulse">
              Tap anywhere
            </p>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="box"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => setStep(2)}
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: [-2, 2, -2, 0] }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-40 h-40 border border-champagne/30 rounded-2xl flex items-center justify-center glass-panel mb-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-champagne/5 to-transparent pointer-events-none" />
              <Gift size={48} className="text-champagne/80 group-hover:text-champagne transition-colors" />
            </motion.div>
            
            <p className="font-sans text-xs text-champagne tracking-[0.4em] uppercase">
              Open
            </p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="surprise"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full max-w-lg flex flex-col items-center text-center glass-panel p-8 md:p-12 rounded-2xl relative"
          >
            <div className="absolute -top-12 opacity-30">
              <Gift size={80} className="text-champagne blur-sm" />
            </div>

            <div className="mb-12 mt-4">
              <h3 className="font-sans text-[10px] text-champagne/70 tracking-[0.4em] uppercase mb-6">
                Your Surprise
              </h3>
              
              {config.surprise.type === 'message' && (
                <p className="font-serif text-xl md:text-2xl text-ivory leading-relaxed">
                  {config.surprise.content}
                </p>
              )}
            </div>

            <button
              onClick={() => setScene('finale')}
              className="px-8 py-3 rounded-full border border-champagne/40 text-champagne text-xs tracking-widest uppercase flex items-center gap-4 hover:bg-champagne/10 transition-colors"
            >
              <span>Continue</span>
              <ArrowRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

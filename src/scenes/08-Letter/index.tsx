import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { config } from '../../data/config';
import { Mail, ArrowRight } from 'lucide-react';

export const Letter = () => {
  const { setScene } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-black px-6 md:px-12"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#1a110a] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="closed"
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.8 } }}
            className="relative z-10 flex flex-col items-center justify-center cursor-pointer group"
            onClick={() => setIsOpen(true)}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-serif italic text-xl md:text-2xl text-ivory/80 mb-12 text-center"
            >
              "I couldn't fit this into a text."
            </motion.p>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-32 h-20 md:w-48 md:h-32 border-2 border-champagne/40 rounded-sm relative flex items-center justify-center overflow-hidden glass-panel"
            >
              <div className="absolute top-0 left-0 w-full h-full border-t-2 border-champagne/40 transform origin-top-left translate-y-1/2 rotate-12 opacity-50" />
              <div className="absolute top-0 right-0 w-full h-full border-t-2 border-champagne/40 transform origin-top-right translate-y-1/2 -rotate-12 opacity-50" />
              <Mail className="text-champagne/70 z-10 group-hover:text-champagne transition-colors" size={32} />
            </motion.div>
            
            <p className="mt-8 font-sans text-[10px] text-champagne/40 tracking-widest uppercase animate-pulse">
              Tap to open
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="open"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="relative z-10 w-full max-w-2xl h-full flex flex-col pt-24 pb-32 overflow-y-auto scroll-smooth"
          >
            <div className="flex-grow flex flex-col justify-center">
              <div className="w-12 h-px bg-champagne/50 mx-auto mb-12" />
              
              <div className="font-serif text-lg md:text-2xl text-ivory/90 leading-loose md:leading-loose whitespace-pre-wrap text-center px-4">
                {config.letter}
              </div>
              
              <div className="w-12 h-px bg-champagne/50 mx-auto mt-12" />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1 }}
              className="flex justify-center mt-24 pb-12"
            >
              <button
                onClick={() => setScene('cake')}
                className="flex items-center gap-4 px-8 py-4 rounded-full border border-champagne/30 text-champagne text-xs uppercase tracking-widest hover:bg-champagne/10 transition-colors"
              >
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

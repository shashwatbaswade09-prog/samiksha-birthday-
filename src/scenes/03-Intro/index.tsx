import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { config } from '../../data/config';
import { Typewriter } from '../../components/ui/Typewriter';

export const Intro = () => {
  const { setScene } = useAppStore();
  const [currentLine, setCurrentLine] = useState(0);
  const [showNextLine, setShowNextLine] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (showNextLine && currentLine < config.introLines.length - 1) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setShowNextLine(false);
      }, 1500); // Wait before showing next line
      return () => clearTimeout(timer);
    } else if (showNextLine && currentLine === config.introLines.length - 1) {
      setTimeout(() => setIsFinished(true), 1500);
    }
  }, [showNextLine, currentLine]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-black px-8"
    >
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={currentLine}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 1 } }}
              className="text-center"
            >
              <Typewriter 
                text={config.introLines[currentLine]} 
                speed={70}
                onComplete={() => setShowNextLine(true)}
                className="font-serif text-2xl md:text-3xl text-ivory/90 leading-relaxed italic"
              />
            </motion.div>
          ) : (
            <motion.div
              key="cta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="flex flex-col items-center mt-12"
            >
              <button
                onClick={() => setScene('story')}
                className="text-champagne font-sans tracking-[0.3em] text-sm uppercase flex items-center gap-4 hover:text-white transition-colors p-4"
              >
                <span>Our Story</span>
                <span className="text-xl leading-none mb-1">→</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

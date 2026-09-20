import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { config } from '../../data/config';
import { Camera, ChevronRight } from 'lucide-react';

export const Memories = () => {
  const { setScene } = useAppStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flash, setFlash] = useState(false);

  const handleNext = () => {
    if (currentIndex < config.gallery.length - 1) {
      setFlash(true);
      setTimeout(() => setFlash(false), 200);
      setCurrentIndex(prev => prev + 1);
    } else {
      setScene('quiz');
    }
  };

  const handleDragEnd = (_event: any, info: any) => {
    if (info.offset.x < -50 || info.offset.x > 50) {
      handleNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
    >
      {/* Flash effect */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="absolute top-12 text-center z-20">
        <h2 className="font-sans text-xs tracking-[0.4em] text-champagne/70 uppercase flex items-center gap-3">
          <Camera size={14} />
          The Camera Roll
        </h2>
      </div>

      <div className="relative w-full max-w-sm aspect-[3/4] flex items-center justify-center mt-12 z-10">
        <AnimatePresence mode="popLayout">
          {config.gallery.map((photo, index) => {
            if (index < currentIndex) return null;
            
            const isTop = index === currentIndex;
            const zIndex = config.gallery.length - index;
            const rotate = isTop ? 0 : (index % 2 === 0 ? 3 : -3);
            const scale = isTop ? 1 : 0.95 - (index - currentIndex) * 0.05;
            const yOffset = isTop ? 0 : (index - currentIndex) * 20;

            return (
              <motion.div
                key={index}
                layout
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1 - (index - currentIndex) * 0.2, 
                  scale, 
                  y: yOffset,
                  rotate,
                  zIndex
                }}
                exit={{ x: -300, opacity: 0, rotate: -20, transition: { duration: 0.4 } }}
                whileTap={isTop ? { cursor: 'grabbing' } : {}}
                className={`absolute w-4/5 md:w-full bg-[#f8f8f8] p-4 pb-16 md:p-6 md:pb-24 shadow-2xl rounded-sm ${isTop ? 'cursor-grab' : ''}`}
                style={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0,0,0,0.1) inset"
                }}
              >
                {/* Polaroid Frame */}
                <div className="relative w-full aspect-square overflow-hidden bg-gray-200">
                  <img
                    src={photo.image}
                    alt={photo.caption}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  {/* Subtle glare */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-16 flex flex-col items-center z-20">
        <p className="font-sans text-[10px] text-ivory/30 tracking-widest uppercase mb-6">
          Swipe or tap next
        </p>
        <button
          onClick={handleNext}
          className="flex items-center gap-3 px-6 py-3 rounded-full border border-champagne/30 text-champagne text-xs uppercase tracking-widest hover:bg-champagne/10 transition-colors glass-panel"
        >
          {currentIndex < config.gallery.length - 1 ? (
            <span>Next Memory</span>
          ) : (
            <span>Continue</span>
          )}
          <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';

const bgImage = "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?q=80&w=800&auto=format&fit=crop";

export const Splash = () => {
  const { setScene, setAudioPlaying } = useAppStore();

  const handleBegin = () => {
    // In a real app we'd trigger audio here. For now, state flip.
    setAudioPlaying(true);
    setScene('unlock');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-black"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      {/* Gradient to make text readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 mt-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1 }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl text-champagne mb-8 tracking-wide font-medium"
        >
          I made something <br/>
          <span className="italic text-glow">for you.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 3.5 }}
          className="flex flex-col items-center space-y-8"
        >
          <div className="w-8 h-[1px] bg-champagne/40" />
          
          <p className="font-sans text-xs tracking-[0.2em] text-ivory/70 uppercase leading-loose">
            It's not much... <br/>
            but it's entirely yours.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBegin}
            className="mt-8 px-8 py-3 rounded-full border border-champagne/40 text-champagne text-xs tracking-widest uppercase transition-colors hover:bg-champagne/10 flex items-center gap-4 glass-panel"
          >
            <span>Begin</span>
            <span className="text-lg leading-none mb-1">→</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

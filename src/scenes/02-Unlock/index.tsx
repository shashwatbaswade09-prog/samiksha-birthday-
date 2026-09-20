import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { config } from '../../data/config';
import { Lock, Unlock as UnlockIcon } from 'lucide-react';

export const Unlock = () => {
  const { setScene, setUnlocked } = useAppStore();
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === config.unlockDate) {
      setStatus('success');
      setUnlocked(true);
      setTimeout(() => {
        setScene('intro');
      }, 2500);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-black/95 px-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,240,0.05)_0%,transparent_70%)]" />

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-12 text-champagne opacity-70"
        >
          {status === 'success' ? <UnlockIcon size={32} /> : <Lock size={32} />}
        </motion.div>

        <div className="h-20 flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.p
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-serif text-2xl text-ivory text-center"
              >
                Only you can enter.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p
                key="error"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="font-serif text-xl text-accent text-center italic"
              >
                Hmm... I thought you'd remember that one.
              </motion.p>
            )}
            {status === 'success' && (
              <motion.p
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="font-serif text-2xl text-champagne text-center italic text-glow"
              >
                I knew you would.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center space-y-8 p-8 rounded-2xl glass-panel"
        >
          <div className="text-center space-y-2">
            <label className="text-xs tracking-widest text-ivory/50 uppercase">
              What's our date?
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              disabled={status === 'success'}
              placeholder="DD/MM/YYYY"
              className="w-full bg-transparent border-b border-white/20 text-center text-xl tracking-widest text-champagne pb-2 outline-none focus:border-champagne/60 transition-colors placeholder:text-white/10"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={status === 'success'}
            type="submit"
            className={`w-full py-3 rounded text-xs tracking-widest uppercase transition-all duration-300 border
              ${status === 'success' 
                ? 'bg-champagne text-black border-champagne' 
                : 'bg-white/5 text-ivory border-white/10 hover:bg-white/10 hover:border-white/30'
              }`}
          >
            {status === 'success' ? 'Unlocking...' : 'Unlock'}
          </motion.button>
        </motion.form>
      </div>
    </motion.div>
  );
};

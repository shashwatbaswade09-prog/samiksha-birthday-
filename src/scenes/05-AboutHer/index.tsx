import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { config } from '../../data/config';
import { ArrowRight } from 'lucide-react';

const Card = ({ item, index }: { item: any, index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setIsOpen(!isOpen)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`w-full max-w-sm mx-auto glass-panel rounded-2xl cursor-pointer overflow-hidden transition-colors ${isOpen ? 'bg-white/10' : 'bg-white/5 hover:bg-white/10'}`}
    >
      <motion.div layout className="p-6">
        <div className="flex items-start justify-between">
          <span className="font-sans text-xs tracking-widest text-champagne/50">0{index + 1}</span>
        </div>
        <motion.p layout className="font-serif text-xl md:text-2xl text-ivory mt-4">
          {item.prompt}
        </motion.p>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div className="w-8 h-px bg-champagne/30 mb-4" />
              <p className="font-sans text-sm md:text-base text-ivory/80 leading-relaxed">
                {item.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export const AboutHer = () => {
  const { setScene } = useAppStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
      className="absolute inset-0 w-full h-full bg-background overflow-y-auto scroll-smooth"
    >
      <div className="min-h-full flex flex-col pt-32 pb-32 px-6 md:px-12 max-w-2xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-champagne italic">
            {config.aboutHerTitle}
          </h2>
          <p className="font-sans text-xs text-white/50 tracking-widest uppercase mt-6">
            Tap to reveal
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {config.thingsILove.map((item, index) => (
            <Card key={index} item={item} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -50px 0px" }}
          className="mt-32 flex justify-center"
        >
          <button
            onClick={() => setScene('memories')}
            className="flex items-center gap-4 px-8 py-4 rounded-full border border-champagne/30 text-champagne text-xs uppercase tracking-widest hover:bg-champagne/10 transition-colors"
          >
            <span>The Camera Roll</span>
            <ArrowRight size={16} />
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
};

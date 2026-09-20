import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { config } from '../../data/config';
import { ChevronDown } from 'lucide-react';

export const Story = () => {
  const { setScene } = useAppStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
      className="absolute inset-0 w-full h-full bg-background overflow-y-auto overflow-x-hidden scroll-smooth"
    >
      <div className="min-h-[100dvh] flex flex-col pt-32 pb-24 px-6 md:px-12 max-w-2xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-ivory">Our Story</h2>
          <div className="w-px h-16 bg-gradient-to-b from-champagne/50 to-transparent mx-auto mt-12" />
        </motion.div>

        {/* Timeline */}
        <div className="space-y-48 relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[27px] top-0 bottom-0 w-px bg-white/10 hidden md:block" />

          {config.story.map((chapter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12"
            >
              <div className="md:w-1/3 flex flex-col">
                <div className="flex items-center gap-4 mb-4 md:mb-6">
                  <span className="font-serif text-3xl text-champagne/40 italic">{chapter.chapter}</span>
                  <div className="h-px bg-champagne/20 flex-grow md:hidden" />
                </div>
                <h3 className="font-serif text-2xl text-ivory mb-2">{chapter.title}</h3>
                <p className="font-sans text-xs tracking-widest text-white/50 uppercase">{chapter.date}</p>
                <p className="mt-6 font-sans text-sm md:text-base text-ivory/80 leading-relaxed md:hidden">
                  {chapter.text}
                </p>
              </div>

              <div className="md:w-2/3">
                <div className="relative rounded-2xl overflow-hidden glass-panel p-2 flex items-center justify-center">
                  <img 
                    src={chapter.image} 
                    alt={chapter.title}
                    className="w-full h-auto max-h-[70vh] object-contain rounded-xl filter grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
                </div>
                <p className="mt-8 font-sans text-base text-ivory/80 leading-relaxed hidden md:block">
                  {chapter.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Next Scene Trigger */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="mt-48 flex flex-col items-center justify-center text-center"
        >
          <p className="font-serif text-xl italic text-champagne/70 mb-8">
            But there are also the little things...
          </p>
          <button
            onClick={() => setScene('aboutHer')}
            className="flex items-center justify-center w-16 h-16 rounded-full border border-champagne/30 text-champagne hover:bg-champagne/10 transition-colors"
          >
            <ChevronDown size={24} />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

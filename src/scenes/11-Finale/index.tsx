import { Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { config } from '../../data/config';
import { HeartTree3D } from '../../three/Finale/HeartTree3D';

export const Finale = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = [
      setTimeout(() => setStep(1), 2000),
      setTimeout(() => setStep(2), 4000),
      setTimeout(() => setStep(3), 6000),
      setTimeout(() => setStep(4), 8000),
      setTimeout(() => setStep(5), 11000), // Final Message
    ];
    return () => sequence.forEach(clearTimeout);
  }, []);

  const phrases = [
    "Every memory.",
    "Every stupid joke.",
    "Every random conversation.",
    "Every ordinary day.",
    "Somehow... they all became my favourite story."
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-black"
    >
      <div className="absolute inset-0 z-0 opacity-50">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Suspense fallback={null}>
            <HeartTree3D />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 text-center pointer-events-none">
        <AnimatePresence mode="wait">
          {step < 5 ? (
            <motion.div
              key={`phrase-${step}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1 }}
              className="font-serif text-2xl md:text-3xl text-champagne italic"
            >
              {phrases[step]}
            </motion.div>
          ) : (
            <motion.div
              key="finale"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="flex flex-col items-center"
            >
              <h1 className="font-serif text-4xl md:text-5xl text-ivory text-glow mb-8">
                Happy Birthday, {config.herName}.
              </h1>
              <p className="font-sans text-sm tracking-widest text-white/50 uppercase leading-loose max-w-sm whitespace-pre-wrap">
                {config.finalMessage}
              </p>
              
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2, type: "spring" }}
                className="mt-12 text-2xl text-accent"
              >
                ❤️
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

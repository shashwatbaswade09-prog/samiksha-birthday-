import { Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { useAppStore } from '../../store/useAppStore';
import { config } from '../../data/config';
import { Cake3D } from '../../three/Cake/Cake3D';
import { ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Cake = () => {
  const { setScene } = useAppStore();
  const [wished, setWished] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const handleExtinguish = () => {
    setWished(true);
    
    // Trigger confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#F7E7CE', '#D32F2F', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#F7E7CE', '#D32F2F', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setTimeout(() => {
      setShowButton(true);
    }, 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-black"
    >
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 5, 13], fov: 60 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.2} />
            <Environment preset="city" />
            <Cake3D onExtinguish={handleExtinguish} />
            <ContactShadows opacity={0.4} scale={10} blur={2} far={4} color="#000000" />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 2}
            />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute top-24 z-10 text-center pointer-events-none">
        <AnimatePresence mode="wait">
          {!wished ? (
            <motion.h2
              key="wish"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-serif text-3xl md:text-4xl text-champagne italic text-glow"
            >
              Make a wish.
              <p className="font-sans text-[10px] text-white/50 tracking-widest uppercase mt-4 not-italic">
                Tap the candle to blow it out
              </p>
            </motion.h2>
          ) : (
            <motion.h2
              key="happy"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-serif text-4xl md:text-5xl text-ivory text-glow"
            >
              Happy Birthday, {config.herName}
            </motion.h2>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-24 z-10"
          >
            <button
              onClick={() => setScene('surprise')}
              className="px-8 py-3 rounded-full border border-champagne/40 text-champagne text-xs tracking-widest uppercase flex items-center gap-4 hover:bg-champagne/10 transition-colors glass-panel"
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

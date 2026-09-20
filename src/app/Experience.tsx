import { AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { useEffect, useRef } from 'react';

// We will import scenes here later
import { Splash } from '../scenes/01-Splash';
import { Unlock } from '../scenes/02-Unlock';
import { Intro } from '../scenes/03-Intro';
import { Story } from '../scenes/04-Story';
import { AboutHer } from '../scenes/05-AboutHer';
import { Memories } from '../scenes/06-Memories';
import { Quiz } from '../scenes/07-Quiz';
import { Letter } from '../scenes/08-Letter';
import { Cake } from '../scenes/09-Cake';
import { Surprise } from '../scenes/10-Surprise';
import { Finale } from '../scenes/11-Finale';

export const Experience = () => {
  const { currentScene } = useAppStore();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Start playing audio only after they pass the splash and unlock scenes
    // because browsers block autoplay before user interaction
    if (currentScene !== 'splash' && currentScene !== 'unlock') {
      if (audioRef.current) {
        audioRef.current.volume = 0.4; // Slightly lower volume for background music
        audioRef.current.play().catch(e => console.log("Audio play blocked by browser:", e));
      }
    }
  }, [currentScene]);

  return (
    <div className="relative w-full h-full min-h-[100dvh] bg-background text-ivory overflow-hidden">
      <audio ref={audioRef} src="/assets/audio/bgm.mp3" loop />
      {/* Global Grain Overlay */}
      <div className="film-grain pointer-events-none" />

      <AnimatePresence mode="wait">
        {currentScene === 'splash' && <Splash key="splash" />}
        {currentScene === 'unlock' && <Unlock key="unlock" />}
        {currentScene === 'intro' && <Intro key="intro" />}
        {currentScene === 'story' && <Story key="story" />}
        {currentScene === 'aboutHer' && <AboutHer key="aboutHer" />}
        {currentScene === 'memories' && <Memories key="memories" />}
        {currentScene === 'quiz' && <Quiz key="quiz" />}
        {currentScene === 'letter' && <Letter key="letter" />}
        {currentScene === 'cake' && <Cake key="cake" />}
        {currentScene === 'surprise' && <Surprise key="surprise" />}
        {currentScene === 'finale' && <Finale key="finale" />}
        {/* We will add more scenes here */}
      </AnimatePresence>
    </div>
  );
};

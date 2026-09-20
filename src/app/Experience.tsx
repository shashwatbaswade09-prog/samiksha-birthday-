import { AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';

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

  return (
    <div className="relative w-full h-full min-h-[100dvh] bg-background text-ivory overflow-hidden">
      <audio id="bgm" src={`${import.meta.env.BASE_URL}assets/audio/bgm.mp3`} loop />
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

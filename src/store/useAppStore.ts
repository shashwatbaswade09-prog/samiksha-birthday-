import { create } from 'zustand';

type Scene = 
  | 'splash' 
  | 'unlock' 
  | 'intro' 
  | 'story' 
  | 'aboutHer' 
  | 'memories' 
  | 'quiz' 
  | 'letter' 
  | 'cake' 
  | 'surprise' 
  | 'finale';

interface AppState {
  currentScene: Scene;
  setScene: (scene: Scene) => void;
  audioPlaying: boolean;
  setAudioPlaying: (playing: boolean) => void;
  unlocked: boolean;
  setUnlocked: (unlocked: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentScene: 'splash',
  setScene: (scene) => set({ currentScene: scene }),
  audioPlaying: false,
  setAudioPlaying: (playing) => set({ audioPlaying: playing }),
  unlocked: false,
  setUnlocked: (unlocked) => set({ unlocked }),
}));

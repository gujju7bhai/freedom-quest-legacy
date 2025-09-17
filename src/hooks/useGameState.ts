import { useState, useEffect } from 'react';

export interface GameState {
  xp: number;
  unlocked: Record<string, boolean>;
  progress: Record<string, { completed: boolean; perfect?: boolean }>;
  sound: boolean;
  currentCharacter: string | null;
  quizIndex: number;
}

const defaultState: GameState = {
  xp: 0,
  unlocked: { gandhi: true, netaji: false },
  progress: {},
  sound: true,
  currentCharacter: null,
  quizIndex: 0,
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(defaultState);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('fq_state');
      if (saved) {
        const parsedState = JSON.parse(saved);
        setGameState({ ...defaultState, ...parsedState });
      }
    } catch (error) {
      console.warn('Failed to load game state:', error);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('fq_state', JSON.stringify(gameState));
    } catch (error) {
      console.warn('Failed to save game state:', error);
    }
  }, [gameState]);

  const updateGameState = (updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
  };

  return { gameState, updateGameState };
};
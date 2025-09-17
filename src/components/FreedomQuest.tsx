import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MainMenu } from './MainMenu';
import { CharacterSelect } from './CharacterSelect';
import { StorySection } from './StorySection';
import { QuizSection } from './QuizSection';
import { ReportSection } from './ReportSection';
import { XPChip } from './XPChip';
import { SettingsModal } from './SettingsModal';
import { OnboardingModal } from './OnboardingModal';
import { useGameState } from '../hooks/useGameState';
import { initializeAudio } from '../utils/sounds';
import heroBackground from '@/assets/hero-background.jpg';

type Screen = 'menu' | 'character-select' | 'story' | 'quiz' | 'report';

export const FreedomQuest: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');
  const [showSettings, setShowSettings] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { gameState, updateGameState } = useGameState();

  useEffect(() => {
    // Show onboarding on first visit
    const hasSeenOnboarding = localStorage.getItem('fq_seen_onboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
    
    // Initialize audio on first user interaction
    const initAudio = () => {
      initializeAudio();
      document.removeEventListener('click', initAudio);
      document.removeEventListener('keydown', initAudio);
    };
    
    document.addEventListener('click', initAudio);
    document.addEventListener('keydown', initAudio);
    
    return () => {
      document.removeEventListener('click', initAudio);
      document.removeEventListener('keydown', initAudio);
    };
  }, []);

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const goBack = () => {
    setCurrentScreen('menu');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Background with vintage overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-fixed opacity-20"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="fixed inset-0 tricolor-glow" />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-sm bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-heading font-bold text-gradient-vintage">
            Freedom Quest
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowOnboarding(true)}
              className="border-vintage-bronze text-vintage-ink hover:bg-vintage-sepia"
            >
              Help
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(true)}
              className="border-vintage-bronze text-vintage-ink hover:bg-vintage-sepia"
            >
              Settings
            </Button>
          </div>
        </div>
      </header>

      {/* XP Chip */}
      <XPChip xp={gameState.xp} />

      {/* Back Button */}
      {currentScreen !== 'menu' && (
        <Button
          onClick={goBack}
          className="fixed top-20 left-4 z-30 border-vintage-bronze bg-patriot-cream hover:bg-vintage-sepia"
          size="sm"
        >
          ← Back
        </Button>
      )}

      {/* Main Content */}
      <main className="relative z-10 pt-20 pb-8">
        <div className="container mx-auto px-4">
          {currentScreen === 'menu' && (
            <MainMenu onNavigate={navigateToScreen} />
          )}
          
          {currentScreen === 'character-select' && (
            <CharacterSelect
              gameState={gameState}
              onNavigate={navigateToScreen}
              onUpdateGameState={updateGameState}
            />
          )}
          
          {currentScreen === 'story' && (
            <StorySection
              currentCharacter={gameState.currentCharacter}
              onNavigate={navigateToScreen}
              onUpdateGameState={updateGameState}
            />
          )}
          
          {currentScreen === 'quiz' && (
            <QuizSection
              currentCharacter={gameState.currentCharacter}
              gameState={gameState}
              onNavigate={navigateToScreen}
              onUpdateGameState={updateGameState}
            />
          )}
          
          {currentScreen === 'report' && (
            <ReportSection
              gameState={gameState}
              onNavigate={navigateToScreen}
              onUpdateGameState={updateGameState}
            />
          )}
        </div>
      </main>

      {/* Modals */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        gameState={gameState}
        onUpdateGameState={updateGameState}
      />
      
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => {
          setShowOnboarding(false);
          localStorage.setItem('fq_seen_onboarding', '1');
        }}
      />
    </div>
  );
};
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock } from 'lucide-react';
import { GameState } from '../hooks/useGameState';
import gandhiPortrait from '@/assets/gandhi-portrait.jpg';
import bosePortrait from '@/assets/bose-portrait.jpg';

interface Character {
  id: string;
  name: string;
  title: string;
  image: string;
  description: string;
  unlockMessage?: string;
}

const characters: Character[] = [
  {
    id: 'gandhi',
    name: 'Mahatma Gandhi',
    title: 'Father of the Nation',
    image: gandhiPortrait,
    description: 'Pioneer of non-violent civil disobedience. Lead movements like the Salt March and Quit India.',
  },
  {
    id: 'netaji',
    name: 'Netaji Subhas Chandra Bose',
    title: 'Leader of Indian National Army',
    image: bosePortrait,
    description: 'Leader advocating armed struggle; historically significant for the Indian National Army (INA).',
    unlockMessage: 'Complete Gandhi\'s arc to unlock',
  },
];

interface CharacterSelectProps {
  gameState: GameState;
  onNavigate: (screen: 'story') => void;
  onUpdateGameState: (updates: Partial<GameState>) => void;
}

export const CharacterSelect: React.FC<CharacterSelectProps> = ({
  gameState,
  onNavigate,
  onUpdateGameState,
}) => {
  const handleCharacterSelect = (characterId: string) => {
    const isUnlocked = gameState.unlocked[characterId];
    
    if (!isUnlocked) {
      // Show tooltip or alert for locked character
      return;
    }

    onUpdateGameState({ currentCharacter: characterId });
    onNavigate('story');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-slide-up">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient-vintage">
          Choose Your Leader
        </h2>
        <p className="text-lg text-muted-foreground">
          Select a freedom fighter to begin their story
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {characters.map((character) => {
          const isUnlocked = gameState.unlocked[character.id];
          const isCompleted = gameState.progress[character.id]?.completed;

          return (
            <Card
              key={character.id}
              className={`char-card cursor-pointer transition-all duration-300 ${
                !isUnlocked ? 'opacity-60 cursor-not-allowed' : 'hover-lift hover-glow'
              }`}
              onClick={() => handleCharacterSelect(character.id)}
            >
              <CardContent className="p-0 relative overflow-hidden">
                {/* Character Image */}
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-full object-cover"
                  />
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="text-center text-white space-y-2">
                        <Lock className="w-8 h-8 mx-auto" />
                        <p className="text-sm font-medium">
                          {character.unlockMessage}
                        </p>
                      </div>
                    </div>
                  )}
                  {isCompleted && (
                    <Badge className="absolute top-2 right-2 bg-freedom-green text-patriot-white">
                      Completed
                    </Badge>
                  )}
                </div>

                {/* Character Info */}
                <div className="p-6 space-y-3 paper-texture">
                  <div className="space-y-1">
                    <h3 className="text-xl font-heading font-bold text-vintage-ink">
                      {character.name}
                    </h3>
                    <p className="text-sm font-decorative text-saffron">
                      {character.title}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {character.description}
                  </p>
                  
                  {isUnlocked && (
                    <div className="pt-2">
                      <Badge variant="outline" className="border-freedom-green text-freedom-green">
                        Click to Start
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
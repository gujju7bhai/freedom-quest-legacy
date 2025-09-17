import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, BookOpen, Unlock } from 'lucide-react';
import { GameState } from '../hooks/useGameState';

interface ReportSectionProps {
  gameState: GameState;
  onNavigate: (screen: 'menu' | 'character-select') => void;
  onUpdateGameState: (updates: Partial<GameState>) => void;
}

const characterNames: Record<string, string> = {
  gandhi: 'Mahatma Gandhi',
  netaji: 'Netaji Subhas Chandra Bose',
};

const characterEvents: Record<string, string[]> = {
  gandhi: ['Salt March (Dandi March)', 'Civil Disobedience Movement', 'Non-violent Resistance'],
  netaji: ['Indian National Army Formation', 'Azad Hind Government', 'Armed Freedom Struggle'],
};

export const ReportSection: React.FC<ReportSectionProps> = ({
  gameState,
  onNavigate,
  onUpdateGameState,
}) => {
  const currentCharacter = gameState.currentCharacter;
  const characterName = currentCharacter ? characterNames[currentCharacter] : 'Unknown';
  const events = currentCharacter ? characterEvents[currentCharacter] || [] : [];
  const isCompleted = currentCharacter ? gameState.progress[currentCharacter]?.completed : false;
  const isPerfect = currentCharacter ? gameState.progress[currentCharacter]?.perfect : false;
  
  // Check if a new character was unlocked
  const newlyUnlocked = currentCharacter === 'gandhi' && gameState.unlocked.netaji;

  const handleContinue = () => {
    if (newlyUnlocked) {
      onNavigate('character-select');
    } else {
      onNavigate('menu');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-slide-up">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-4xl">
          <Trophy className="w-10 h-10 text-vintage-gold" />
          <h2 className="font-heading font-bold text-gradient-vintage">
            Quest Complete!
          </h2>
        </div>
        <p className="text-xl text-muted-foreground">
          {characterName}'s story has been completed
        </p>
      </div>

      {/* Main Report Card */}
      <Card className="paper-texture border-vintage decorative-corner">
        <CardContent className="p-8">
          <div className="space-y-8">
            {/* Character Summary */}
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-heading font-bold text-vintage-ink">
                {characterName}
              </h3>
              <div className="flex justify-center gap-4 flex-wrap">
                {isCompleted && (
                  <Badge className="bg-freedom-green text-patriot-white px-3 py-1">
                    <Star className="w-4 h-4 mr-1" />
                    Completed
                  </Badge>
                )}
                {isPerfect && (
                  <Badge className="bg-vintage-gold text-vintage-ink px-3 py-1">
                    <Trophy className="w-4 h-4 mr-1" />
                    Perfect Score
                  </Badge>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-saffron">
                  {gameState.xp}
                </div>
                <div className="text-sm text-muted-foreground">Total XP Earned</div>
              </div>
              
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-freedom-green">
                  {Object.values(gameState.progress).filter(p => p.completed).length}
                </div>
                <div className="text-sm text-muted-foreground">Quests Completed</div>
              </div>
              
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-vintage-gold">
                  {Object.values(gameState.unlocked).filter(Boolean).length}
                </div>
                <div className="text-sm text-muted-foreground">Leaders Unlocked</div>
              </div>
            </div>

            {/* Historical Events Covered */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-vintage-ink flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Historical Events Covered
              </h4>
              <div className="flex flex-wrap gap-2">
                {events.map((event, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-saffron text-saffron"
                  >
                    {event}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Unlock Notification */}
            {newlyUnlocked && (
              <div className="bg-gradient-to-r from-saffron/10 to-freedom-green/10 p-6 rounded-lg border-2 border-vintage-gold">
                <div className="text-center space-y-2">
                  <Unlock className="w-8 h-8 text-vintage-gold mx-auto" />
                  <h4 className="text-lg font-bold text-vintage-gold">
                    🎉 New Leader Unlocked!
                  </h4>
                  <p className="text-vintage-ink">
                    You've unlocked <strong>Netaji Subhas Chandra Bose</strong>! 
                    Experience his story of armed resistance and the Indian National Army.
                  </p>
                </div>
              </div>
            )}

            {/* Learning Summary */}
            <div className="bg-muted/30 p-6 rounded-lg border border-vintage-bronze">
              <h4 className="font-semibold mb-3 text-vintage-ink">What You've Learned</h4>
              <div className="text-sm text-muted-foreground space-y-2">
                {currentCharacter === 'gandhi' && (
                  <>
                    <p>• The significance of the Salt March in India's freedom struggle</p>
                    <p>• Gandhi's philosophy of non-violent resistance (Satyagraha)</p>
                    <p>• How civil disobedience movements mobilized the masses</p>
                  </>
                )}
                {currentCharacter === 'netaji' && (
                  <>
                    <p>• The formation and role of the Indian National Army</p>
                    <p>• Netaji's approach to armed resistance against British rule</p>
                    <p>• The significance of "Give me blood, I will give you freedom"</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={handleContinue}
          className="bg-freedom-green hover:bg-freedom-green-dark text-patriot-white px-8 py-3"
          size="lg"
        >
          {newlyUnlocked ? 'Try New Leader' : 'Continue Learning'}
        </Button>
        
        <Button
          onClick={() => onNavigate('menu')}
          variant="outline"
          className="border-saffron text-saffron hover:bg-saffron hover:text-patriot-white px-8 py-3"
          size="lg"
        >
          Main Menu
        </Button>
      </div>

      {/* Inspirational Quote */}
      <div className="text-center">
        <blockquote className="text-lg italic text-vintage-ink font-decorative">
          {currentCharacter === 'gandhi' 
            ? '"Be the change that you wish to see in the world."'
            : '"Freedom is not given, it is taken."'
          }
        </blockquote>
        <p className="text-sm text-muted-foreground mt-2">
          - {characterName}
        </p>
      </div>
    </div>
  );
};
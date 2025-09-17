import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GameState } from '../hooks/useGameState';
import gandhiPortrait from '@/assets/gandhi-portrait.jpg';
import bosePortrait from '@/assets/bose-portrait.jpg';

interface StoryData {
  slides: Array<{ img: string; text: string }>;
  decision: {
    scenario: string;
    A: { text: string; correct: boolean; explanation: string };
    B: { text: string; correct: boolean; explanation: string };
  };
}

const stories: Record<string, StoryData> = {
  gandhi: {
    slides: [
      { 
        img: gandhiPortrait, 
        text: '1930: The British salt tax burdens millions of Indians. Gandhi must decide how to respond to this injustice.' 
      },
    ],
    decision: {
      scenario: 'In 1930, the British imposed a salt tax. What should Gandhi Ji do?',
      A: { 
        text: 'Accept and move on', 
        correct: false, 
        explanation: 'Accepting would not build the movement or challenge unjust law.' 
      },
      B: { 
        text: 'Organize a peaceful protest (Salt March)', 
        correct: true, 
        explanation: 'The Salt March was a pivotal non-violent protest that mobilized the nation.' 
      }
    },
  },
  netaji: {
    slides: [
      { 
        img: bosePortrait, 
        text: '1943: Subhas Chandra Bose forms the Indian National Army to fight for independence through armed struggle.' 
      },
    ],
    decision: {
      scenario: 'Netaji wants to liberate India. What approach should he take?',
      A: { 
        text: 'Form an army to fight the British', 
        correct: true, 
        explanation: 'Netaji believed armed struggle was necessary and formed the INA.' 
      },
      B: { 
        text: 'Wait for negotiations', 
        correct: false, 
        explanation: 'Netaji was impatient with negotiations and chose direct action.' 
      }
    },
  },
};

interface StorySectionProps {
  currentCharacter: string | null;
  onNavigate: (screen: 'quiz') => void;
  onUpdateGameState: (updates: Partial<GameState>) => void;
}

export const StorySection: React.FC<StorySectionProps> = ({
  currentCharacter,
  onNavigate,
  onUpdateGameState,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [showDecision, setShowDecision] = useState(false);
  const [decisionMade, setDecisionMade] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');

  const story = currentCharacter ? stories[currentCharacter] : null;

  useEffect(() => {
    // Reset state when character changes
    setSlideIndex(0);
    setShowDecision(false);
    setDecisionMade(null);
    setFeedback('');
  }, [currentCharacter]);

  if (!story || !currentCharacter) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground">No story selected</p>
      </div>
    );
  }

  const handleNext = () => {
    if (slideIndex < story.slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      setShowDecision(true);
    }
  };

  const handleDecision = (choice: 'A' | 'B') => {
    if (decisionMade) return; // Prevent double-clicking
    
    setDecisionMade(choice);
    const decision = story.decision[choice];
    setFeedback(decision.explanation);
    
    // Navigate to quiz after showing feedback
    setTimeout(() => {
      onNavigate('quiz');
    }, 2000);
  };

  const currentSlide = story.slides[slideIndex];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
      <div className="text-center">
        <h2 className="text-3xl font-heading font-bold text-gradient-vintage mb-2">
          {currentCharacter === 'gandhi' ? 'Mahatma Gandhi' : 'Netaji Subhas Chandra Bose'}
        </h2>
        <p className="text-muted-foreground">Story & Decision</p>
      </div>

      {!showDecision ? (
        <Card className="paper-texture border-vintage">
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Story Image */}
              <div className="aspect-video w-full rounded-lg overflow-hidden border-2 border-vintage-bronze">
                <img
                  src={currentSlide.img}
                  alt="Story scene"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Story Text */}
              <div className="text-center space-y-4">
                <p className="text-lg leading-relaxed text-vintage-ink bg-patriot-cream/50 p-4 rounded-lg border border-vintage-bronze">
                  {currentSlide.text}
                </p>
                
                <Button
                  onClick={handleNext}
                  className="bg-saffron hover:bg-saffron-dark text-patriot-white px-8"
                >
                  {slideIndex < story.slides.length - 1 ? 'Continue' : 'Make Decision'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="paper-texture border-vintage">
          <CardContent className="p-8">
            <div className="space-y-6">
              <h3 className="text-xl font-heading font-bold text-center text-vintage-ink">
                {story.decision.scenario}
              </h3>
              
              <div className="grid gap-4">
                <Button
                  onClick={() => handleDecision('A')}
                  disabled={!!decisionMade}
                  className={`p-6 h-auto text-left justify-start border-2 ${
                    decisionMade === 'A'
                      ? story.decision.A.correct
                        ? 'border-freedom-green bg-freedom-green/10 text-freedom-green'
                        : 'border-destructive bg-destructive/10 text-destructive'
                      : 'border-vintage-bronze hover:bg-vintage-sepia hover:border-saffron'
                  }`}
                  variant="outline"
                >
                  <div className="space-y-1">
                    <span className="font-semibold">A. {story.decision.A.text}</span>
                    {decisionMade === 'A' && (
                      <div className="text-sm opacity-80">
                        {story.decision.A.correct ? '✓ Correct' : '✗ Incorrect'}
                      </div>
                    )}
                  </div>
                </Button>
                
                <Button
                  onClick={() => handleDecision('B')}
                  disabled={!!decisionMade}
                  className={`p-6 h-auto text-left justify-start border-2 ${
                    decisionMade === 'B'
                      ? story.decision.B.correct
                        ? 'border-freedom-green bg-freedom-green/10 text-freedom-green'
                        : 'border-destructive bg-destructive/10 text-destructive'
                      : 'border-vintage-bronze hover:bg-vintage-sepia hover:border-saffron'
                  }`}
                  variant="outline"
                >
                  <div className="space-y-1">
                    <span className="font-semibold">B. {story.decision.B.text}</span>
                    {decisionMade === 'B' && (
                      <div className="text-sm opacity-80">
                        {story.decision.B.correct ? '✓ Correct' : '✗ Incorrect'}
                      </div>
                    )}
                  </div>
                </Button>
              </div>
              
              {feedback && (
                <div className="bg-muted/50 p-4 rounded-lg border border-vintage-bronze">
                  <p className="font-medium text-vintage-ink">{feedback}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Proceeding to quiz in a moment...
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
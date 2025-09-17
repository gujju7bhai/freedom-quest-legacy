import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { GameState } from '../hooks/useGameState';
import { playCorrectSound, playIncorrectSound, playXPGainSound } from '../utils/sounds';

interface Question {
  q: string;
  choices: string[];
  a: number;
  explanation: string;
}

const quizData: Record<string, Question[]> = {
  gandhi: [
    {
      q: 'What year was the Salt March?',
      choices: ['1928', '1930', '1935', '1942'],
      a: 1,
      explanation: 'The Salt March began in 1930, also known as the Dandi March.',
    },
    {
      q: 'Who led the Salt March?',
      choices: ['Jawaharlal Nehru', 'Mahatma Gandhi', 'Subhas Bose', 'Sardar Patel'],
      a: 1,
      explanation: 'Mahatma Gandhi led the Salt March from Sabarmati Ashram to Dandi.',
    },
    {
      q: 'The Salt March was primarily a protest against?',
      choices: ['Land taxes', 'Salt tax', 'Income tax', 'Trade tariffs'],
      a: 1,
      explanation: 'The Salt March protested the British monopoly on salt and the salt tax.',
    },
  ],
  netaji: [
    {
      q: 'What did INA stand for?',
      choices: ['Indian Naval Army', 'Indian National Army', 'Indian Native Army', 'Indian New Army'],
      a: 1,
      explanation: 'INA stood for Indian National Army, formed by Netaji Subhas Chandra Bose.',
    },
    {
      q: 'In which year did Netaji form the INA?',
      choices: ['1941', '1942', '1943', '1944'],
      a: 2,
      explanation: 'Netaji formed the INA in 1943 with the help of the Japanese.',
    },
    {
      q: 'What was Netaji\'s famous slogan?',
      choices: ['Quit India', 'Do or Die', 'Give me blood, I will give you freedom', 'Satyameva Jayate'],
      a: 2,
      explanation: '"Give me blood, and I will give you freedom" was Netaji\'s inspiring slogan.',
    },
  ],
};

interface QuizSectionProps {
  currentCharacter: string | null;
  gameState: GameState;
  onNavigate: (screen: 'report') => void;
  onUpdateGameState: (updates: Partial<GameState>) => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  currentCharacter,
  gameState,
  onNavigate,
  onUpdateGameState,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [characterStartXP, setCharacterStartXP] = useState(0);

  const questions = currentCharacter ? quizData[currentCharacter] || [] : [];
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    // Reset quiz state when character changes and store starting XP
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setHasAnswered(false);
    setCharacterStartXP(gameState.xp); // Remember XP at character start
  }, [currentCharacter, gameState.xp]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (hasAnswered && showFeedback) {
        if (e.key.toLowerCase() === 'n') {
          handleNext();
        }
        return;
      }

      if (!hasAnswered && /^[1-4]$/.test(e.key)) {
        const index = parseInt(e.key) - 1;
        if (index < currentQuestion.choices.length) {
          handleAnswerSelect(index);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [hasAnswered, showFeedback, currentQuestion]);

  if (!currentQuestion || !currentCharacter) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground">No quiz available</p>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (hasAnswered) return;

    setSelectedAnswer(answerIndex);
    setHasAnswered(true);
    setShowFeedback(true);

    const isCorrect = answerIndex === currentQuestion.a;
    
    if (isCorrect) {
      // Play correct sound and award XP
      if (gameState.sound) {
        playCorrectSound();
        setTimeout(() => {
          playXPGainSound();
        }, 300);
      }
      
      // Award XP for correct answer (add to current total)
      onUpdateGameState({ xp: gameState.xp + 50 });
    } else {
      // Play incorrect sound
      if (gameState.sound) {
        playIncorrectSound();
      }
      
      // Reset XP to character start point and restart quiz
      onUpdateGameState({ xp: characterStartXP });
      setTimeout(() => {
        restartQuiz();
      }, 2000);
      return;
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setHasAnswered(false);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setHasAnswered(false);
    } else {
      // Quiz completed - mark character as completed
      onUpdateGameState({
        progress: {
          ...gameState.progress,
          [currentCharacter]: { completed: true, perfect: true }
        },
        // Unlock next character if this was Gandhi
        ...(currentCharacter === 'gandhi' && {
          unlocked: { ...gameState.unlocked, netaji: true }
        })
      });
      onNavigate('report');
    }
  };

  const isCorrect = selectedAnswer === currentQuestion.a;
  const isWrong = selectedAnswer !== null && selectedAnswer !== currentQuestion.a;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
      {/* Quiz Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-heading font-bold text-gradient-vintage">
          Quiz Session
        </h2>
        <div className="flex items-center justify-between max-w-md mx-auto">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <div className="text-sm font-medium">
            XP: <span className="text-saffron">{gameState.xp}</span>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="paper-texture border-vintage">
        <CardContent className="p-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center text-vintage-ink">
              {currentQuestion.q}
            </h3>

            <div className="grid gap-3">
              {currentQuestion.choices.map((choice, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={hasAnswered}
                  variant="outline"
                  className={`p-4 h-auto text-left justify-start border-2 transition-all ${
                    selectedAnswer === index
                      ? isCorrect
                        ? 'border-freedom-green bg-freedom-green/10 text-freedom-green animate-pulse-correct'
                        : 'border-destructive bg-destructive/10 text-destructive animate-shake-wrong'
                      : hasAnswered && index === currentQuestion.a
                      ? 'border-freedom-green bg-freedom-green/10 text-freedom-green'
                      : 'border-vintage-bronze hover:bg-vintage-sepia hover:border-saffron'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>
                      <span className="font-medium mr-2">{index + 1}.</span>
                      {choice}
                    </span>
                    {hasAnswered && (
                      <span className="ml-2">
                        {selectedAnswer === index
                          ? isCorrect ? '✓' : '✗'
                          : index === currentQuestion.a ? '✓' : ''}
                      </span>
                    )}
                  </div>
                </Button>
              ))}
            </div>

            {showFeedback && (
              <div className={`p-4 rounded-lg border ${
                isCorrect 
                  ? 'bg-freedom-green/10 border-freedom-green text-freedom-green' 
                  : 'bg-destructive/10 border-destructive text-destructive'
              }`}>
                <p className="font-medium">
                  {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                </p>
                <p className="text-sm mt-1 opacity-90">
                  {currentQuestion.explanation}
                </p>
              {isWrong && (
                  <p className="text-sm mt-2 font-medium">
                    XP reset to starting level ({characterStartXP}). Quiz will restart...
                  </p>
                )}
              </div>
            )}

            {showFeedback && isCorrect && (
              <div className="text-center">
                <Button
                  onClick={handleNext}
                  className="bg-saffron hover:bg-saffron-dark text-patriot-white px-8"
                >
                  {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Press 'N' for next question
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <div className="text-center text-sm text-muted-foreground">
        <p>💡 Use keyboard numbers 1-4 to select answers quickly</p>
      </div>
    </div>
  );
};
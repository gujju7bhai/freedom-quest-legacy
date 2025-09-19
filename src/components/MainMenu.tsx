import React from 'react';
import { Button } from '@/components/ui/button';

interface MainMenuProps {
  onNavigate: (screen: 'character-select' | 'menu') => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onNavigate }) => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-muted/20">
      <div className="text-center space-y-8 animate-slide-up">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-gradient-tricolor leading-tight decorative-corner">
            Freedom Quest
          </h1>
          <p className="text-xl md:text-2xl font-decorative text-vintage-ink opacity-90">
            The Quiz of Freedom
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Journey through India's freedom struggle with interactive stories and quizzes 
            featuring legendary heroes like Mahatma Gandhi and Netaji Subhas Chandra Bose.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          <Button
            onClick={() => onNavigate('character-select')}
            className="w-full sm:w-auto bg-freedom-green text-patriot-white hover:bg-freedom-green-dark 
                     border-2 border-freedom-green-dark shadow-lg hover-lift text-lg px-8 py-3"
            size="lg"
          >
            Start Quest
          </Button>
          
          <Button
            variant="outline"
            className="w-full sm:w-auto border-2 border-saffron text-saffron hover:bg-saffron 
                     hover:text-patriot-white shadow-lg hover-lift text-lg px-8 py-3"
            size="lg"
            onClick={() => window.close()}
          >
            Exit
          </Button>
        </div>

        <div className="text-sm text-muted-foreground space-y-2">
          <p>🎓 Educational • 🇮🇳 Patriotic • 📚 Interactive Learning</p>
          <p className="font-decorative">
            "Freedom is not worth having if it does not include the freedom to make mistakes." - Gandhi
          </p>
        </div>
      </div>
    </div>
  );
};
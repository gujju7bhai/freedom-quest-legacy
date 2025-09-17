import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="paper-texture border-vintage max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-gradient-vintage">
            How to Play — Quick Guide
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-saffron text-patriot-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h4 className="font-semibold">Choose Your Leader</h4>
                <p className="text-sm text-muted-foreground">
                  Select a freedom fighter and watch their story unfold through interactive cutscenes.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-freedom-green text-patriot-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h4 className="font-semibold">Make Decisions</h4>
                <p className="text-sm text-muted-foreground">
                  Choose how your leader responds to historical challenges and see the consequences.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-vintage-gold text-vintage-ink flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h4 className="font-semibold">Answer Quizzes</h4>
                <p className="text-sm text-muted-foreground">
                  Test your knowledge with historical questions. Correct answers give +50 XP. 
                  Wrong answers reset your XP and restart the quiz.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg border border-vintage-bronze">
            <h4 className="font-semibold mb-2">💡 Pro Tips</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Use keyboard numbers 1-4 to select quiz options quickly</li>
              <li>• Press 'N' to advance to the next question</li>
              <li>• Complete Gandhi's arc perfectly to unlock Netaji</li>
              <li>• Learn from mistakes - the quiz restarts if you get an answer wrong</li>
            </ul>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={onClose} 
            className="bg-freedom-green hover:bg-freedom-green-dark text-patriot-white px-8"
          >
            Start Learning!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { GameState } from '../hooks/useGameState';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameState: GameState;
  onUpdateGameState: (updates: Partial<GameState>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  gameState,
  onUpdateGameState,
}) => {
  const handleSoundToggle = (enabled: boolean) => {
    onUpdateGameState({ sound: enabled });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="paper-texture border-vintage">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-gradient-vintage">
            Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="sound-toggle" className="text-base font-medium">
              Enable Sound Effects
            </Label>
            <Switch
              id="sound-toggle"
              checked={gameState.sound}
              onCheckedChange={handleSoundToggle}
            />
          </div>
          
          <div className="border-t border-vintage-bronze pt-4">
            <h4 className="font-semibold mb-2">Game Progress</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Total XP: {gameState.xp}</p>
              <p>Characters Unlocked: {Object.values(gameState.unlocked).filter(Boolean).length}</p>
              <p>Quests Completed: {Object.values(gameState.progress).filter(p => p.completed).length}</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={onClose} className="bg-freedom-green hover:bg-freedom-green-dark text-patriot-white">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
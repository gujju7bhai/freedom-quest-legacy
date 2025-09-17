import React from 'react';

interface XPChipProps {
  xp: number;
}

export const XPChip: React.FC<XPChipProps> = ({ xp }) => {
  const [isAnimating, setIsAnimating] = React.useState(false);
  const prevXP = React.useRef(xp);

  React.useEffect(() => {
    if (xp > prevXP.current && xp > 0) {
      // XP increased, trigger animation
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
    prevXP.current = xp;
  }, [xp]);

  return (
    <div className={`fixed bottom-4 right-4 z-50 bg-gradient-to-r from-vintage-gold to-saffron text-vintage-ink px-4 py-2 rounded-full border-2 border-vintage-bronze shadow-lg transition-transform duration-300 ${
      isAnimating ? 'scale-110 animate-pulse' : 'animate-float'
    }`}>
      <span className="font-decorative">XP</span>
      <strong className="ml-2 text-lg">{xp}</strong>
    </div>
  );
};
import React from 'react';

interface XPChipProps {
  xp: number;
}

export const XPChip: React.FC<XPChipProps> = ({ xp }) => {
  return (
    <div className="xp-chip animate-float">
      <span className="font-decorative">XP</span>
      <strong className="ml-2 text-lg">{xp}</strong>
    </div>
  );
};
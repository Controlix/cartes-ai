import React from 'react';

interface ReserveDisplayProps {
  reservePoints: number;
}

const ReserveDisplay: React.FC<ReserveDisplayProps> = ({ reservePoints }) => {
  if (reservePoints <= 0) return null;

  return (
    <div className="bg-orange-100 border border-orange-200 text-orange-800 font-bold px-4 py-2 rounded-lg shadow-sm text-center flex items-center justify-center gap-2 flex-shrink-0 animate-pulse">
      <span>📦</span>
      <span>Reserve: {reservePoints} punten</span>
    </div>
  );
};

export default ReserveDisplay;

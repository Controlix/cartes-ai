import React from 'react';
import { translations } from '@/config/translations';

interface GameOverDisplayProps {
  winner: string;
  isSubmitted: boolean;
  onSubmit: () => void;
}

const GameOverDisplay: React.FC<GameOverDisplayProps> = ({ winner, isSubmitted, onSubmit }) => {
  return (
    <div className="bg-green-100 border border-green-200 p-6 rounded-xl text-center shadow-lg flex-shrink-0 flex flex-col items-center gap-4">
      <div>
        <h2 className="text-2xl font-black text-green-800 mb-1">{translations.game.gameOverTitle}</h2>
        <p className="text-xl font-bold text-green-700">{translations.game.winnerLabel} {winner}</p>
      </div>
      
      {isSubmitted ? (
        <p className="text-green-600 font-bold py-2 px-4 bg-white/50 rounded-lg border border-green-300">
          {translations.game.submitSuccess}
        </p>
      ) : (
        <button 
          onClick={onSubmit}
          className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-sm"
        >
          {translations.game.submitButton}
        </button>
      )}
    </div>
  );
};

export default GameOverDisplay;

import React, { useEffect, useRef } from 'react';
import { Round } from '@/types/Round';
import { translations } from '@/config/translations';
import { Crown, ThumbsDown, Scale } from 'lucide-react';

interface GameHistoryProps {
  rounds: Round[];
  team1Name?: string;
  team2Name?: string;
}

const GameHistory: React.FC<GameHistoryProps> = ({ 
  rounds,
  team1Name = translations.history.team1Header,
  team2Name = translations.history.team2Header
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [rounds]);

  const renderScore = (
    score: number, 
    reserve: number = 0, 
    isTeam1: boolean, 
    isLitige: boolean = false, 
    isCapot: boolean = false, 
    isDedans: boolean = false,
    isTieBreaker: boolean = false,
    isLitigeResolution: boolean = false,
    contestedPoints?: number
  ) => {
    const isZero = score === 0 && !isLitigeResolution;
    return (
      <div className={`flex items-center justify-${isTeam1 ? 'center' : 'end'} gap-2 relative`}>
        <div className={`font-bold py-1 rounded-md px-3 flex items-center justify-center gap-1.5 ${
          (isLitige && score === 0) || isTieBreaker
            ? 'text-gray-400 bg-gray-100 italic' 
            : isTeam1 ? 'text-blue-600 bg-blue-50/50' : 'text-red-600 bg-red-50/50'
        }`}>
          <span className="flex items-center gap-1">
            {score}
            {isLitige && score === 0 && contestedPoints !== undefined && (
              <span className="text-[11px] font-normal text-gray-400 ml-0.5">
                ({contestedPoints})
              </span>
            )}
            {isCapot && score > 0 && <Crown size={12} className="text-yellow-500 fill-yellow-500" />}
            {isDedans && score > 0 && <ThumbsDown size={12} className="text-red-400" />}
          </span>
          {reserve > 0 && (
            <span className="text-[10px] font-bold text-orange-600 border-l border-gray-200 pl-1.5 ml-0.5">
              +{reserve}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-500 py-3 px-4">
        <div className="text-left">{translations.history.roundLabel}</div>
        <div className="text-center !capitalize !normal-case">{team1Name}</div>
        <div className="text-right !capitalize !normal-case">{team2Name}</div>
      </div>
      
      {rounds.length === 0 ? (
        <div className="p-8 text-gray-400 italic text-center">
          {translations.history.emptyState}
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {rounds.map((round) => (
            <div 
              key={round.id} 
              data-testid="round-row"
              className={`grid grid-cols-3 py-3 px-4 items-center transition-colors ${
                round.isLitige ? 'bg-orange-50/30' : 
                round.isTieBreaker ? 'bg-purple-50/30' :
                round.isLitigeResolution ? 'bg-orange-50/20' :
                'hover:bg-gray-50'
              }`}
            >
              <div className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <span>#{round.number}</span>
                <div className="flex gap-1 items-center">
                  {round.isLitige && <Scale size={12} className="text-orange-400" />}
                  {round.isTieBreaker && (
                    <span className="text-[10px] font-black bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded border border-purple-200 uppercase leading-none" title="Tie Breaker">
                      TB
                    </span>
                  )}
                  {round.isLitigeResolution && (
                    <span className="text-[10px] font-black bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded border border-orange-200 uppercase leading-none" title="Resolution">
                      RES
                    </span>
                  )}
                </div>
              </div>
              {renderScore(round.team1Score, round.team1Reserve, true, round.isLitige, round.isCapot, round.isDedans, round.isTieBreaker, round.isLitigeResolution, round.contestedPoints)}
              {renderScore(round.team2Score, round.team2Reserve, false, round.isLitige, round.isCapot, round.isDedans, round.isTieBreaker, round.isLitigeResolution, round.contestedPoints)}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
};

export default GameHistory;

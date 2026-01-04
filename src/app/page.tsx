'use client'

import ScoreHeader from '@/components/ScoreHeader';
import RoundInputForm from '@/components/RoundInputForm';
import GameHistory from '@/components/GameHistory';
import ReserveDisplay from '@/components/ReserveDisplay';
import GameOverDisplay from '@/components/GameOverDisplay';
import { useGameLogic } from '@/hooks/useGameLogic';

export default function Home() {
  const {
    team1Name,
    setTeam1Name,
    team2Name,
    setTeam2Name,
    rounds,
    gameStatus,
    isSubmitted,
    reservePoints,
    team1Score,
    team2Score,
    handleRoundSubmit,
    handleSubmitGame,
    resetGame,
    winner,
  } = useGameLogic();

  return (
    <main className="h-screen h-[100dvh] bg-gray-50 flex flex-col overflow-hidden">
      <ScoreHeader 
        team1Score={team1Score} 
        team2Score={team2Score} 
        team1Name={team1Name} 
        team2Name={team2Name}
        onTeam1NameChange={setTeam1Name}
        onTeam2NameChange={setTeam2Name}
        onReset={resetGame}
      />
      
      <div className="flex-1 p-4 flex flex-col gap-4 max-w-4xl mx-auto w-full overflow-hidden">
        <ReserveDisplay reservePoints={reservePoints} />

        {gameStatus === 'finished' && (
          <GameOverDisplay 
            winner={winner} 
            isSubmitted={isSubmitted} 
            onSubmit={handleSubmitGame} 
          />
        )}

        <div className="flex-1 overflow-y-auto min-h-0">
          <GameHistory rounds={rounds} />
        </div>

        <div className="flex-shrink-0">
          <RoundInputForm 
            onSubmit={handleRoundSubmit} 
            disabled={gameStatus === 'finished'} 
            team1Name={team1Name}
            team2Name={team2Name}
          />
        </div>
      </div>
    </main>
  );
}

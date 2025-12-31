'use client'

import { useState, useMemo } from 'react';
import ScoreHeader from '@/components/ScoreHeader';
import RoundInputForm from '@/components/RoundInputForm';
import GameHistory from '@/components/GameHistory';
import { appConfig } from '@/config/appConfig';
import { translations } from '@/config/translations';
import { Round } from '@/types/Round';

export default function Home() {
  const [team1Name, setTeam1Name] = useState(appConfig.defaultTeam1Name);
  const [team2Name, setTeam2Name] = useState(appConfig.defaultTeam2Name);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'finished'>('playing');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reservePoints, setReservePoints] = useState(0);
  const [tieBreakerWinner, setTieBreakerWinner] = useState<'team1' | 'team2' | null>(null);

  // Derive scores from rounds
  const { team1Score, team2Score } = useMemo(() => {
    return rounds.reduce(
      (acc, round) => ({
        team1Score: acc.team1Score + round.team1Score + (round.team1Reserve || 0),
        team2Score: acc.team2Score + round.team2Score + (round.team2Reserve || 0),
      }),
      { team1Score: 0, team2Score: 0 }
    );
  }, [rounds]);

  // Target score is now constant from config, but we keep it in variable for logic consistency
  const targetScore = appConfig.targetScore;

  const handleRoundSubmit = (score1: number, score2: number, taker: 'team1' | 'team2' = 'team1') => {
    if (gameStatus === 'finished') return;

    // 1. Check if we are in a special end-game resolution mode
    const isTieBreaker = (team1Score >= targetScore && team2Score >= targetScore && team1Score === team2Score);
    const isLitigeResolution = (team1Score >= targetScore || team2Score >= targetScore) && reservePoints > 0;

    if (isTieBreaker || isLitigeResolution) {
      // In these modes, the round points are ignored. 
      // Only the winner matters to decide the game or award reserves.
      const roundWinner = score1 > score2 ? 'team1' : 'team2';
      
      let awardedReserve1 = 0;
      let awardedReserve2 = 0;
      let newReserve = 0;

      if (isLitigeResolution) {
        if (roundWinner === 'team1') awardedReserve1 = reservePoints;
        else awardedReserve2 = reservePoints;
        newReserve = 0;
      }

      const newRound: Round = {
        id: crypto.randomUUID(),
        number: rounds.length + 1,
        team1Score: 0,
        team2Score: 0,
        team1Reserve: awardedReserve1 > 0 ? awardedReserve1 : undefined,
        team2Reserve: awardedReserve2 > 0 ? awardedReserve2 : undefined,
        taker,
        isLitige: false,
        isCapot: false,
        isDedans: false,
        isTieBreaker,
        isLitigeResolution,
      };

      const newRounds = [...rounds, newRound];
      setRounds(newRounds);
      setReservePoints(newReserve);

      // Re-evaluate game status
      const nextTotal1 = team1Score + awardedReserve1;
      const nextTotal2 = team2Score + awardedReserve2;

      // If it was a tie-breaker, it definitely ends now (Sudden Death)
      // If it was litige resolution, it ends if one team is ahead and above target
      if (isTieBreaker || (nextTotal1 !== nextTotal2 && (nextTotal1 >= targetScore || nextTotal2 >= targetScore))) {
        if (isTieBreaker) setTieBreakerWinner(roundWinner);
        setGameStatus('finished');
      }
      return;
    }

    let s1 = score1;
    let s2 = score2;
    let r1 = 0;
    let r2 = 0;
    let newReserve = reservePoints;
    let isLitige = false;
    let isCapot = false;
    let isDedans = false;

    // 1. Check for Litige
    if (score1 === score2) {
      isLitige = true;
      if (taker === 'team1') {
        s1 = 0;
        s2 = score2;
        newReserve += score1;
      } else {
        s2 = 0;
        s1 = score1;
        newReserve += score2;
      }
    } 
    // 2. Check for Capot (Automatic detection if one team has all trick points)
    else if (score1 === 162 || score2 === 162 || score1 === 252 || score2 === 252) {
      isCapot = true;
      if (score1 >= 162) {
        s1 = 252;
        r1 = reservePoints;
        s2 = 0;
      } else {
        s2 = 252;
        r2 = reservePoints;
        s1 = 0;
      }
      newReserve = 0;
    }
    // 3. Check for Dedans (Taker fails to get more points than defender)
    else if ((taker === 'team1' && score1 < score2) || (taker === 'team2' && score2 < score1)) {
      isDedans = true;
      if (taker === 'team1') {
        s1 = 0;
        s2 = 162;
        r2 = reservePoints;
      } else {
        s2 = 0;
        s1 = 162;
        r1 = reservePoints;
      }
      newReserve = 0;
    }
    // 4. Normal Win
    else {
      if (score1 > score2) {
        s1 = score1;
        r1 = reservePoints;
        s2 = score2;
      } else {
        s2 = score2;
        r2 = reservePoints;
        s1 = score1;
      }
      newReserve = 0;
    }

    const newRound: Round = {
      id: crypto.randomUUID(),
      number: rounds.length + 1,
      team1Score: s1,
      team2Score: s2,
      team1Reserve: r1 > 0 ? r1 : undefined,
      team2Reserve: r2 > 0 ? r2 : undefined,
      taker,
      isLitige,
      isCapot,
      isDedans,
    };

    const newRounds = [...rounds, newRound];
    setRounds(newRounds);
    setReservePoints(newReserve);

    const newTotal1 = team1Score + s1 + r1;
    const newTotal2 = team2Score + s2 + r2;

    console.log(`New Totals: ${newTotal1} - ${newTotal2}`);

    // End Game condition: 
    // 1. One team is >= target score
    // 2. It's NOT a tie
    // 3. It's NOT a litige (current round)
    if ((newTotal1 >= targetScore || newTotal2 >= targetScore) && newTotal1 !== newTotal2 && !isLitige) {
      setGameStatus('finished');
    }
  };

  const handleSubmitGame = () => {
    setIsSubmitted(true);
    // Future implementation: Send to tournament server
  };

  const resetGame = () => {
    setRounds([]);
    setReservePoints(0);
    setGameStatus('playing');
    setIsSubmitted(false);
    setTieBreakerWinner(null);
  };

  const winner = tieBreakerWinner 
    ? (tieBreakerWinner === 'team1' ? team1Name : team2Name)
    : (team1Score > team2Score ? team1Name : team2Name);

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
        {reservePoints > 0 && (
          <div className="bg-orange-100 border border-orange-200 text-orange-800 font-bold px-4 py-2 rounded-lg shadow-sm text-center flex items-center justify-center gap-2 flex-shrink-0 animate-pulse">
            <span>📦</span>
            <span>Reserve: {reservePoints} punten</span>
          </div>
        )}

        {gameStatus === 'finished' && (
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
                onClick={handleSubmitGame}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-sm"
              >
                {translations.game.submitButton}
              </button>
            )}
          </div>
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

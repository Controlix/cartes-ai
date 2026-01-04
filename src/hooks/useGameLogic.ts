import { useState, useMemo } from 'react';

import { processRound, GameState } from '@/logic/GameEngine';
import { GameStateContext, RoundInput } from '@/logic/types';
import { appConfig } from '@/config/appConfig';
import { Round } from '@/types/Round';

export const useGameLogic = () => {
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

  const targetScore = appConfig.targetScore;

  const handleRoundSubmit = (score1: number, score2: number, taker: 'team1' | 'team2' = 'team1') => {
    if (gameStatus === 'finished') return;

    const context: GameStateContext = {
      team1Score,
      team2Score,
      reservePoints,
      targetScore,
      roundsPlayed: rounds.length
    };

    const input: RoundInput = {
      score1,
      score2,
      taker
    };

    const { newRound, newReserve, roundWinner, gameState } = processRound(context, input);

    const newRounds = [...rounds, newRound];
    setRounds(newRounds);
    setReservePoints(newReserve);

    // Calculate new totals to check game end condition
    const nextTotal1 = team1Score + newRound.team1Score + (newRound.team1Reserve || 0);
    const nextTotal2 = team2Score + newRound.team2Score + (newRound.team2Reserve || 0);

    // Check for Game Over based on State returned by Engine
    // The Engine determined the state used for processing. We use that context to decide termination.
    
    if (gameState === GameState.TIE_BREAKER) {
      // Sudden Death: Ends if we have a winner
      if (roundWinner !== null) {
        setTieBreakerWinner(roundWinner);
        setGameStatus('finished');
      }
    } else if (gameState === GameState.LITIGE_RESOLUTION) {
      // Resolution: Ends if winner creates lead >= target
      if (roundWinner !== null) {
        // Check if the resolution actually ended the game (one team ahead and >= target)
        if (nextTotal1 !== nextTotal2 && (nextTotal1 >= targetScore || nextTotal2 >= targetScore)) {
          setGameStatus('finished');
        }
      }
    } else {
      // Standard Round
      if (roundWinner !== null && (nextTotal1 >= targetScore || nextTotal2 >= targetScore) && nextTotal1 !== nextTotal2) {
        setGameStatus('finished');
      }
    }
  };

  const handleSubmitGame = () => {
    setIsSubmitted(true);
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

  return {
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
  };
};

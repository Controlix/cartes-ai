import { useState, useMemo } from 'react';
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

    // 1. Check if we are in a special end-game resolution mode
    const isTieBreaker = (team1Score >= targetScore && team2Score >= targetScore && team1Score === team2Score);
    const isLitigeResolution = (
      team1Score >= targetScore || 
      team2Score >= targetScore || 
      (team1Score + reservePoints >= targetScore) || 
      (team2Score + reservePoints >= targetScore)
    ) && reservePoints > 0;

    if (isTieBreaker || isLitigeResolution) {
      let roundWinner: 'team1' | 'team2' | null = null;
      if (score1 > score2) roundWinner = 'team1';
      else if (score2 > score1) roundWinner = 'team2';
      
      let awardedReserve1 = 0;
      let awardedReserve2 = 0;
      let newReserve = 0;

      if (isLitigeResolution) {
        if (roundWinner === 'team1') {
          awardedReserve1 = reservePoints;
          newReserve = 0;
        } else if (roundWinner === 'team2') {
          awardedReserve2 = reservePoints;
          newReserve = 0;
        } else {
          // Recursive Litige: Tie during resolution.
          // Keep existing reserve, award nothing this round.
          newReserve = reservePoints;
        }
      }

      const newRound: Round = {
        id: crypto.randomUUID(),
        number: rounds.length + 1,
        team1Score: 0,
        team2Score: 0,
        team1Reserve: awardedReserve1 > 0 ? awardedReserve1 : undefined,
        team2Reserve: awardedReserve2 > 0 ? awardedReserve2 : undefined,
        taker,
        isLitige: roundWinner === null, // It is a litige if no winner
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

      // End game ONLY if we have a winner for this round AND criteria met
      if (roundWinner !== null) {
        // If it was a tie-breaker, it ends (Sudden Death)
        // If it was litige resolution, it ends if one team is ahead and above target
        if (isTieBreaker || (nextTotal1 !== nextTotal2 && (nextTotal1 >= targetScore || nextTotal2 >= targetScore))) {
          if (isTieBreaker) setTieBreakerWinner(roundWinner);
          setGameStatus('finished');
        }
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
    let contestedPoints = undefined;

    // 1. Check for Litige
    if (score1 === score2) {
      isLitige = true;
      contestedPoints = score1;
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
    // 2. Check for Capot
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
    // 3. Check for Dedans
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
      contestedPoints,
    };

    const newRounds = [...rounds, newRound];
    setRounds(newRounds);
    setReservePoints(newReserve);

    const newTotal1 = team1Score + s1 + r1;
    const newTotal2 = team2Score + s2 + r2;

    if ((newTotal1 >= targetScore || newTotal2 >= targetScore) && newTotal1 !== newTotal2 && !isLitige) {
      setGameStatus('finished');
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

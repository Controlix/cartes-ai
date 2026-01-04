import { Round } from '@/types/Round';
import { GameStateContext, RoundInput, RoundResult, RoundStrategy } from './types';

// Helper
const determineRoundWinner = (score1: number, score2: number): 'team1' | 'team2' | null => {
  if (score1 > score2) return 'team1';
  if (score2 > score1) return 'team2';
  return null;
};

// --- Standard Round Strategy ---
export const StandardRoundStrategy: RoundStrategy = {
  process(input: RoundInput, context: GameStateContext): RoundResult {
    const { score1, score2, taker, belotTeam } = input;
    const { roundsPlayed, reservePoints } = context;

    let s1 = score1;
    let s2 = score2;
    let r1 = 0;
    let r2 = 0;
    let newReserve = reservePoints;
    let isLitige = false;
    let isCapot = false;
    let isDedans = false;
    let contestedPoints: number | undefined = undefined;

    // 1. Check for Capot (based on raw card points)
    if (score1 === 162 || score2 === 162) {
      isCapot = true;
      if (score1 === 162) {
        s1 = 252;
        s2 = 0;
      } else {
        s2 = 252;
        s1 = 0;
      }
    }

    // 2. Add Belot bonus
    if (belotTeam === 'team1') s1 += 20;
    if (belotTeam === 'team2') s2 += 20;

    // 3. Check for outcome (Win/Litige/Dedans) based on final s1, s2
    if (s1 === s2) {
      isLitige = true;
      contestedPoints = s1;
      if (taker === 'team1') {
        s1 = 0;
        // s2 remains as is (defender points)
        newReserve += contestedPoints;
      } else {
        s2 = 0;
        // s1 remains as is (defender points)
        newReserve += contestedPoints;
      }
    } 
    else if (isCapot) {
      if (s1 > s2) {
        r1 = reservePoints;
      } else {
        r2 = reservePoints;
      }
      newReserve = 0;
    }
    else if ((taker === 'team1' && s1 < s2) || (taker === 'team2' && s2 < s1)) {
      isDedans = true;
      const totalRoundPoints = 162 + (belotTeam ? 20 : 0);
      if (taker === 'team1') {
        s1 = 0;
        s2 = totalRoundPoints;
        r2 = reservePoints;
      } else {
        s2 = 0;
        s1 = totalRoundPoints;
        r1 = reservePoints;
      }
      newReserve = 0;
    }
    // 4. Normal Win
    else {
      if (s1 > s2) {
        r1 = reservePoints;
      } else {
        r2 = reservePoints;
      }
      newReserve = 0;
    }

    const newRound: Round = {
      id: crypto.randomUUID(),
      number: roundsPlayed + 1,
      team1Score: s1,
      team2Score: s2,
      team1Reserve: r1 > 0 ? r1 : undefined,
      team2Reserve: r2 > 0 ? r2 : undefined,
      taker,
      belotTeam,
      isLitige,
      isCapot,
      isDedans,
      contestedPoints,
    };

    let roundWinner: 'team1' | 'team2' | null = null;
    if (!isLitige) {
      if (s1 > s2) roundWinner = 'team1';
      else if (s2 > s1) roundWinner = 'team2';
    }

    return { newRound, newReserve, roundWinner };
  }
};

// --- Litige Resolution Strategy ---
export const LitigeResolutionStrategy: RoundStrategy = {
  process(input: RoundInput, context: GameStateContext): RoundResult {
    const { score1, score2, taker } = input;
    const { roundsPlayed, reservePoints } = context;

    const roundWinner = determineRoundWinner(score1, score2);
    let awardedReserve1 = 0;
    let awardedReserve2 = 0;
    let newReserve = 0;

    if (roundWinner === 'team1') {
      awardedReserve1 = reservePoints;
      newReserve = 0;
    } else if (roundWinner === 'team2') {
      awardedReserve2 = reservePoints;
      newReserve = 0;
    } else {
      // Tie during resolution -> Keep reserve
      newReserve = reservePoints;
    }

    const newRound: Round = {
      id: crypto.randomUUID(),
      number: roundsPlayed + 1,
      team1Score: 0,
      team2Score: 0,
      team1Reserve: awardedReserve1 > 0 ? awardedReserve1 : undefined,
      team2Reserve: awardedReserve2 > 0 ? awardedReserve2 : undefined,
      taker,
      isLitige: roundWinner === null,
      isCapot: false,
      isDedans: false,
      isTieBreaker: false,
      isLitigeResolution: true,
    };

    return { newRound, newReserve, roundWinner };
  }
};

// --- Tie Breaker Strategy ---
export const TieBreakerStrategy: RoundStrategy = {
  process(input: RoundInput, context: GameStateContext): RoundResult {
    const { score1, score2, taker } = input;
    const { roundsPlayed } = context;

    const roundWinner = determineRoundWinner(score1, score2);

    const newRound: Round = {
      id: crypto.randomUUID(),
      number: roundsPlayed + 1,
      team1Score: 0,
      team2Score: 0,
      taker,
      isLitige: roundWinner === null,
      isCapot: false,
      isDedans: false,
      isTieBreaker: true,
      isLitigeResolution: false,
    };

    return { newRound, newReserve: 0, roundWinner };
  }
};

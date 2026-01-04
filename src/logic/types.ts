import { Round } from '@/types/Round';

export interface GameStateContext {
  team1Score: number;
  team2Score: number;
  reservePoints: number;
  targetScore: number;
  roundsPlayed: number;
}

export interface RoundInput {
  score1: number;
  score2: number;
  taker: 'team1' | 'team2';
  belotTeam?: 'team1' | 'team2';
}

export interface RoundResult {
  newRound: Round;
  newReserve: number;
  roundWinner: 'team1' | 'team2' | null;
}

export interface RoundStrategy {
  process(input: RoundInput, context: GameStateContext): RoundResult;
}

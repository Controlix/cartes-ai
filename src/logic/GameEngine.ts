import { GameStateContext, RoundInput, RoundResult } from './types';
import { 
  StandardRoundStrategy, 
  LitigeResolutionStrategy, 
  TieBreakerStrategy 
} from './strategies';

export enum GameState {
  STANDARD = 'STANDARD',
  LITIGE_RESOLUTION = 'LITIGE_RESOLUTION',
  TIE_BREAKER = 'TIE_BREAKER',
}

export const determineGameState = (context: GameStateContext): GameState => {
  const { team1Score, team2Score, reservePoints, targetScore } = context;

  // 1. Tie Breaker: Both >= Target AND Equal
  if (team1Score >= targetScore && team2Score >= targetScore && team1Score === team2Score) {
    return GameState.TIE_BREAKER;
  }

  // 2. Litige Resolution: Anyone >= Target OR (Score + Reserve) >= Target AND Reserve > 0
  if (
    (team1Score >= targetScore || 
     team2Score >= targetScore || 
     (team1Score + reservePoints >= targetScore) || 
     (team2Score + reservePoints >= targetScore)) && 
    reservePoints > 0
  ) {
    return GameState.LITIGE_RESOLUTION;
  }

  // 3. Standard
  return GameState.STANDARD;
};

export const processRound = (context: GameStateContext, input: RoundInput): RoundResult & { gameState: GameState } => {
  const gameState = determineGameState(context);
  let result: RoundResult;

  switch (gameState) {
    case GameState.TIE_BREAKER:
      result = TieBreakerStrategy.process(input, context);
      break;
    case GameState.LITIGE_RESOLUTION:
      result = LitigeResolutionStrategy.process(input, context);
      break;
    case GameState.STANDARD:
    default:
      result = StandardRoundStrategy.process(input, context);
      break;
  }

  return { ...result, gameState };
};

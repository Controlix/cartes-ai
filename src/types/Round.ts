export interface Round {
  id: string;
  number: number;
  team1Score: number;
  team2Score: number;
  team1Reserve?: number;
  team2Reserve?: number;
  taker?: 'team1' | 'team2';
  isLitige?: boolean;
  isCapot?: boolean;
  isDedans?: boolean;
    isTieBreaker?: boolean;
    isLitigeResolution?: boolean;
    awardedReserve?: number;
    contestedPoints?: number;
  }
  
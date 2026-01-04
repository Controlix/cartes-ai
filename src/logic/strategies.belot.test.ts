import { StandardRoundStrategy } from './strategies';
import { GameStateContext, RoundInput } from './types';

describe('StandardRoundStrategy with Belot', () => {
  const baseContext: GameStateContext = {
    team1Score: 0,
    team2Score: 0,
    reservePoints: 0,
    targetScore: 1000,
    roundsPlayed: 0,
  };

  it('adds 20 points to team1 when team1 has Belot and wins', () => {
    const input: RoundInput = {
      score1: 100,
      score2: 62,
      taker: 'team1',
      belotTeam: 'team1',
    };
    const result = StandardRoundStrategy.process(input, baseContext);
    expect(result.newRound.team1Score).toBe(120);
    expect(result.newRound.team2Score).toBe(62);
    expect(result.roundWinner).toBe('team1');
    expect(result.newRound.isDedans).toBe(false);
    expect(result.newRound.isLitige).toBe(false);
  });

  it('triggers Litige at 91-91 when team1 has Belot', () => {
    // Team 1: 71 card points + 20 Belot = 91
    // Team 2: 91 card points = 91
    const input: RoundInput = {
      score1: 71,
      score2: 91,
      taker: 'team1',
      belotTeam: 'team1',
    };
    const result = StandardRoundStrategy.process(input, baseContext);
    expect(result.newRound.isLitige).toBe(true);
    expect(result.newRound.team1Score).toBe(0);
    expect(result.newRound.team2Score).toBe(91);
    expect(result.newReserve).toBe(91);
  });

  it('triggers Dedans when taker has Belot but total is < 91', () => {
    // Team 1: 70 card points + 20 Belot = 90
    // Team 2: 92 card points
    const input: RoundInput = {
      score1: 70,
      score2: 92,
      taker: 'team1',
      belotTeam: 'team1',
    };
    const result = StandardRoundStrategy.process(input, baseContext);
    expect(result.newRound.isDedans).toBe(true);
    expect(result.newRound.team1Score).toBe(0);
    // Total should be 162 + 20 = 182
    expect(result.newRound.team2Score).toBe(182);
  });

  it('triggers Dedans when defender has Belot and taker fails to beat them', () => {
    // Taker (Team 1): 90
    // Defender (Team 2): 72 + 20 Belot = 92
    const input: RoundInput = {
      score1: 90,
      score2: 72,
      taker: 'team1',
      belotTeam: 'team2',
    };
    const result = StandardRoundStrategy.process(input, baseContext);
    expect(result.newRound.isDedans).toBe(true);
    expect(result.newRound.team1Score).toBe(0);
    expect(result.newRound.team2Score).toBe(182);
  });

  it('handles Capot with Belot correctly', () => {
    // Team 1 gets all 162 card points + Belot
    const input: RoundInput = {
      score1: 162,
      score2: 0,
      taker: 'team1',
      belotTeam: 'team1',
    };
    const result = StandardRoundStrategy.process(input, baseContext);
    expect(result.newRound.isCapot).toBe(true);
    expect(result.newRound.team1Score).toBe(272); // 252 + 20
    expect(result.newRound.team2Score).toBe(0);
  });
});

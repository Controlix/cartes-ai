import { renderHook, act } from '@testing-library/react';

import { useGameLogic } from './useGameLogic';

// Mock crypto.randomUUID
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => 'test-uuid'
  }
});

describe('useGameLogic', () => {
  it('updates total score when a valid non-litige round is submitted', () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.handleRoundSubmit(100, 62, 'team1');
    });

    expect(result.current.team1Score).toBe(100);
    expect(result.current.team2Score).toBe(62);
  });

  it('handles Litige scenario correctly and awards reserve on next round', () => {
    const { result } = renderHook(() => useGameLogic());

    // --- Round 1: Litige (81-81), Taker Team 2 ---
    act(() => {
      result.current.handleRoundSubmit(81, 81, 'team2');
    });

    // Reserve should be 81
    expect(result.current.reservePoints).toBe(81);
    // Team 1 is defender and gets points (81), Team 2 is taker and gets 0
    expect(result.current.team1Score).toBe(81);
    expect(result.current.team2Score).toBe(0);

    // --- Round 2: Normal (100-62), Taker Team 1 ---
    act(() => {
      result.current.handleRoundSubmit(100, 62, 'team1');
    });

    // Verify Final Totals
    // Team 1: 81 (round 1) + 100 (round 2) + 81 (reserve) = 262
    expect(result.current.team1Score).toBe(262);
    // Team 2: 0 (round 1) + 62 (round 2) = 62
    expect(result.current.team2Score).toBe(62);
    
    // Reserve should be gone
    expect(result.current.reservePoints).toBe(0);
  });

  it('auto-detects Capot (162 -> 252)', () => {
    const { result } = renderHook(() => useGameLogic());

    // Team 1 gets 162, should be 252
    act(() => {
      result.current.handleRoundSubmit(162, 0, 'team1');
    });

    expect(result.current.team1Score).toBe(252);
    expect(result.current.team2Score).toBe(0);
  });

  it('auto-detects Dedans (Taker fails to reach 82)', () => {
    const { result } = renderHook(() => useGameLogic());

    // Team 1 is taker but gets 80, Team 2 gets 82
    // Team 1 should get 0, Team 2 should get 162
    act(() => {
      result.current.handleRoundSubmit(80, 82, 'team1');
    });

    expect(result.current.team1Score).toBe(0);
    expect(result.current.team2Score).toBe(162);
  });

  it('preserves Capot indicator when reserve is added', () => {
    const { result } = renderHook(() => useGameLogic());

    // 1. Litige (81 reserve)
    act(() => {
      result.current.handleRoundSubmit(81, 81, 'team1');
    });

    // 2. Capot (162 points + 81 reserve = 333)
    act(() => {
      result.current.handleRoundSubmit(162, 0, 'team1');
    });

    const lastRound = result.current.rounds[result.current.rounds.length - 1];
    expect(lastRound.team1Score).toBe(252);
    expect(lastRound.team1Reserve).toBe(81);
  });

  it('handles win with 1-point lead at target score', () => {
    const { result } = renderHook(() => useGameLogic());

    // Team 1 reaches 1008 (4 Capots * 252)
    for (let i = 0; i < 4; i++) {
      act(() => {
        result.current.handleRoundSubmit(162, 0, 'team1');
      });
    }

    // Team 2 scores some points but less than 1008
    act(() => {
      result.current.handleRoundSubmit(0, 162, 'team2'); // 252 for Team 2 (Capot)
    });

    expect(result.current.gameStatus).toBe('finished');
    expect(result.current.winner).toBe(result.current.team1Name);
  });

  // --- End Game Logic Tests ---

  it('continues game if a litige occurs at target score', () => {
    const { result } = renderHook(() => useGameLogic());

    // 1. Setup: Reach ~937 - 62
    // T1: 3 rounds of 252 (756)
    for (let i = 0; i < 3; i++) {
      act(() => result.current.handleRoundSubmit(162, 0, 'team1'));
    }
    // T1: 756 + 100 = 856. T2: 62.
    act(() => result.current.handleRoundSubmit(100, 62, 'team1'));

    // 2. Round: 81-81 (Litige). Taker 1.
    // T1 stays 856. T2 gets 81 -> 143. Reserve: 81.
    act(() => result.current.handleRoundSubmit(81, 81, 'team1'));

    // 3. Round: 81-81 (Litige again).
    // T1 stays 856. T2 gets 81 -> 224. Reserve: 81 + 81 = 162.
    act(() => result.current.handleRoundSubmit(81, 81, 'team1'));

    // Now Team 1 reaches 1000+ via normal round
    // T1: 856 + 252 + 162 = 1270.
    act(() => result.current.handleRoundSubmit(162, 0, 'team1'));

    expect(result.current.gameStatus).toBe('finished');
  });

  it('validates 1071-1071 tie scenario and tie-breaker behavior', () => {
    const { result } = renderHook(() => useGameLogic());

    // 1-2. T1: 504
    act(() => { result.current.handleRoundSubmit(162, 0, 'team1'); });
    act(() => { result.current.handleRoundSubmit(162, 0, 'team1'); });
    // 3-4. T2: 504
    act(() => { result.current.handleRoundSubmit(0, 162, 'team2'); });
    act(() => { result.current.handleRoundSubmit(0, 162, 'team2'); });
    
    // 5-6. T2 Taker, wins. 62-100.
    act(() => { result.current.handleRoundSubmit(62, 100, 'team2'); });
    act(() => { result.current.handleRoundSubmit(62, 100, 'team2'); });
    // T1: 504 + 62 + 62 = 628.
    // T2: 504 + 100 + 100 = 704.

    // 7-9. T1 Taker, wins. 100-62.
    act(() => { result.current.handleRoundSubmit(100, 62, 'team1'); });
    act(() => { result.current.handleRoundSubmit(100, 62, 'team1'); });
    act(() => { result.current.handleRoundSubmit(100, 62, 'team1'); });
    // T1: 628 + 300 = 928.
    // T2: 704 + 186 = 890.

    // 10. T2 Taker, wins. 60-102.
    act(() => { result.current.handleRoundSubmit(60, 102, 'team2'); });
    // T1: 928 + 60 = 988.
    // T2: 890 + 102 = 992.

    // 11. T1 Taker, wins. 83-79.
    act(() => { result.current.handleRoundSubmit(83, 79, 'team1'); });
    // T1: 988 + 83 = 1071.
    // T2: 992 + 79 = 1071.

    // Check Tie
    expect(result.current.team1Score).toBe(1071);
    expect(result.current.team2Score).toBe(1071);
    expect(result.current.gameStatus).toBe('playing');

    // 12. Tie Breaker Round: T1 wins
    act(() => { result.current.handleRoundSubmit(100, 62, 'team1'); });

    expect(result.current.gameStatus).toBe('finished');
    expect(result.current.winner).toBe('Wij');
    // Scores shouldn't change in Tie Breaker (points ignored)
    expect(result.current.team1Score).toBe(1071);
  });

  it('validates 1029-951 Litige Resolution scenario (Potential Winner)', () => {
    const { result } = renderHook(() => useGameLogic());
    
    // Setup to reach 948 - 870
    act(() => result.current.handleRoundSubmit(162, 0, 'team1')); // 252 - 0
    act(() => result.current.handleRoundSubmit(162, 0, 'team1')); // 504 - 0
    act(() => result.current.handleRoundSubmit(0, 162, 'team2')); // 504 - 252
    act(() => result.current.handleRoundSubmit(0, 162, 'team2')); // 504 - 504
    act(() => result.current.handleRoundSubmit(62, 100, 'team2')); // 566 - 604
    act(() => result.current.handleRoundSubmit(62, 100, 'team2')); // 628 - 704
    act(() => result.current.handleRoundSubmit(100, 62, 'team1')); // 728 - 766
    act(() => result.current.handleRoundSubmit(100, 62, 'team1')); // 828 - 828
    act(() => result.current.handleRoundSubmit(120, 42, 'team1')); // 948 - 870

    // Litige Round: 81-81. T1 Preneur.
    // T1 stays 948. T2 gets 81 -> 951. Res 81.
    act(() => result.current.handleRoundSubmit(81, 81, 'team1'));
    
    expect(result.current.team1Score).toBe(948);
    expect(result.current.team2Score).toBe(951);
    expect(result.current.reservePoints).toBe(81);

    // Next round: 112 - 50 (T1 Wins)
    // Should be Resolution Round because scores + reserve near target?
    // 948 + 81 > 1000? Yes.
    act(() => result.current.handleRoundSubmit(112, 50, 'team1'));

    // T1 gets reserve: 948 + 81 = 1029.
    // T2 stays 951.
    expect(result.current.team1Score).toBe(1029);
    expect(result.current.team2Score).toBe(951);
    expect(result.current.gameStatus).toBe('finished');
  });

  it('validates Recursive Litige Resolution (Tie in extra round)', () => {
    const { result } = renderHook(() => useGameLogic());

    // Setup same as above (948-870)
    act(() => result.current.handleRoundSubmit(162, 0, 'team1')); 
    act(() => result.current.handleRoundSubmit(162, 0, 'team1')); 
    act(() => result.current.handleRoundSubmit(0, 162, 'team2')); 
    act(() => result.current.handleRoundSubmit(0, 162, 'team2')); 
    act(() => result.current.handleRoundSubmit(62, 100, 'team2')); 
    act(() => result.current.handleRoundSubmit(62, 100, 'team2')); 
    act(() => result.current.handleRoundSubmit(100, 62, 'team1')); 
    act(() => result.current.handleRoundSubmit(100, 62, 'team1')); 
    act(() => result.current.handleRoundSubmit(120, 42, 'team1')); 
    // Litige
    act(() => result.current.handleRoundSubmit(81, 81, 'team1'));

    // Play TIED Resolution Round (81-81)
    act(() => result.current.handleRoundSubmit(81, 81, 'team2'));

    // Game NOT finished
    expect(result.current.gameStatus).toBe('playing');
    // Scores UNCHANGED
    expect(result.current.team1Score).toBe(948);
    expect(result.current.team2Score).toBe(951);
    // Reserve UNCHANGED (81)
    expect(result.current.reservePoints).toBe(81);

    // Play Winner Round
    act(() => result.current.handleRoundSubmit(100, 62, 'team1'));

    expect(result.current.gameStatus).toBe('finished');
    expect(result.current.team1Score).toBe(1029);
  });
});
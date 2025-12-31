# Task Breakdown: Game Finalization & Winner Declaration

## Overview
Total Tasks: 8

## Task List

### Frontend Logic & State

#### Task Group 1: Win Detection & Tie-Breaker Logic
**Dependencies:** None

- [ ] 1.0 Implement Enhanced Win Detection
  - [ ] 1.1 Write 2-4 focused tests for win detection logic in `Home` page
    - Test winning with 1-point lead at target score
    - Test tie at target score (game continues)
    - Test sudden death (tie-breaker round points not added)
    - Test winner declaration after tie-breaker
  - [ ] 1.2 Update `src/app/page.tsx` state
    - Add `tieBreakerWinner` state (`'team1' | 'team2' | null`) to track sudden death winner
  - [ ] 1.3 Update `handleRoundSubmit` in `src/app/page.tsx`
    - Implement check for existing tie at/above target score
    - If tie-breaker round: Determine winner but do NOT update `rounds` scores (set to 0) or add to total
    - Update `gameStatus` based on new conditions
  - [ ] 1.4 Update `winner` derivation
    - If `tieBreakerWinner` is set, use it; otherwise, use score comparison
  - [ ] 1.5 Ensure Win Detection tests pass
    - Run ONLY the tests written in 1.1

**Acceptance Criteria:**
- Game ends automatically on clear win >= 1000.
- Game continues on exact tie >= 1000.
- Tie-breaker round points do not affect total scores.
- Winner is correctly identified in all cases.

#### Task Group 2: UI Updates & Verification
**Dependencies:** Task Group 1

- [ ] 2.0 Refine Game Over UI
  - [ ] 2.1 Write 1-2 focused tests for UI state
    - Verify input form is disabled when game is finished
    - Verify winner name is displayed correctly
  - [ ] 2.2 Verify `RoundInputForm` disabling
    - Ensure `disabled` prop in `src/app/page.tsx` correctly locks the form
  - [ ] 2.3 Ensure UI tests pass
    - Run ONLY the tests written in 2.1

**Acceptance Criteria:**
- Input form is locked after game ends.
- Resetting the game clears all finalization states.

### Testing

#### Task Group 3: Final Verification
**Dependencies:** Task Groups 1-2

- [ ] 3.0 Review and Gap Analysis
  - [ ] 3.1 Review tests from Task Groups 1-2
  - [ ] 3.2 Add 1-2 integration tests for full tie-breaker flow
  - [ ] 3.3 Run all feature-specific tests
    - Verify all win/tie/sudden-death scenarios pass together

**Acceptance Criteria:**
- All feature-specific tests pass.
- Tie-breaker requirement (no points added) is strictly followed.

## Execution Order
1. Win Detection & Tie-Breaker Logic (Task Group 1)
2. UI Updates & Verification (Task Group 2)
3. Final Verification (Task Group 3)

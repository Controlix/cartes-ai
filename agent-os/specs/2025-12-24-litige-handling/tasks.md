# Task Breakdown: Litige Handling

## Overview
Total Tasks: 12

## Task List

### Frontend Logic & State

#### Task Group 1: State Management & Types
**Dependencies:** None

- [x] 1.0 Update State & Types
  - [x] 1.1 Write 2-4 focused tests for new `Home` state logic
    - Test detecting a litige (equal scores)
    - Test that defender gets points immediately
    - Test that taker gets 0 and points go to reserve
    - Test that next winner gets reserve
  - [x] 1.2 Update `src/types/Round.ts`
    - Add `taker: 'team1' | 'team2'`
    - Add `isLitige: boolean`
  - [x] 1.3 Refactor `src/app/page.tsx` state
    - Add `reservePoints` state (number)
    - Update `handleRoundSubmit` to implement litige logic:
      - Check if `score1 === score2`
      - If litige: Award defender score, add taker score to `reservePoints`
      - If normal: Award scores + `reservePoints` to winner, reset `reservePoints`
  - [x] 1.4 Ensure State tests pass
    - Run ONLY the tests written in 1.1

**Acceptance Criteria:**
- Litige logic correctly calculates scores and reserve points.
- Reserve points accumulate if multiple litiges occur.
- Reserve points are correctly awarded to the next winner.

### UI Components

#### Task Group 2: Input Form Updates
**Dependencies:** Task Group 1

- [x] 2.0 Update Input Form
  - [x] 2.1 Write 2-4 focused tests for `RoundInputForm`
    - Test rendering of Taker selector
    - Test that Taker selection is required or defaults
    - Test that Taker selection is passed to `onSubmit`
  - [x] 2.2 Update `src/components/RoundInputForm.tsx`
    - Add "Who took?" toggle/radio group (Team 1 vs Team 2)
    - Use `team1Name` and `team2Name` props for labels
    - Default to Team 1 or persist last choice
    - Pass `taker` argument to `onSubmit` callback
  - [x] 2.3 Update usage in `src/app/page.tsx`
    - Pass `team1Name` and `team2Name` to `RoundInputForm`
    - Update `handleRoundSubmit` signature to accept `taker`
  - [x] 2.4 Ensure Input Form tests pass
    - Run ONLY the tests written in 2.1

**Acceptance Criteria:**
- Users can select which team took the bid.
- Selection works and is passed to the parent component.

#### Task Group 3: Visual Indicators
**Dependencies:** Task Group 2

- [x] 3.0 Add Visual Indicators
  - [x] 3.1 Write 1-2 focused tests for Reserve Display
    - Test that reserve badge appears when `reservePoints > 0`
    - Test that it shows the correct amount
  - [x] 3.2 Implement Reserve Display in `src/app/page.tsx`
    - Add a visual badge (e.g., orange pill) showing "📦 Reserve: X" when `reservePoints > 0`
    - Place it centrally, likely near the ScoreHeader
  - [x] 3.3 Update `src/components/GameHistory.tsx`
    - Add indicator for Litige rounds (e.g., specific icon or text style)
    - Maybe use a "Scale" icon or "Alert" icon
  - [x] 3.4 Ensure Visual tests pass
    - Run ONLY the tests written in 3.1

**Acceptance Criteria:**
- Reserve points are clearly visible when active.
- Litige rounds are distinguishable in the history.

### Testing

#### Task Group 4: Final Verification
**Dependencies:** Task Groups 1-3

- [x] 4.0 Review and Gap Analysis
  - [x] 4.1 Review tests from Task Groups 1-3
  - [x] 4.2 Write up to 2 integration tests for full game flow
    - Test a sequence: Normal -> Litige -> Litige -> Normal (Winner takes all)
  - [x] 4.3 Run feature-specific tests only
    - Verify all new logic and UI components work together

**Acceptance Criteria:**
- All feature-specific tests pass.
- User stories regarding litige handling are satisfied.

## Execution Order
1. State Management & Types (Task Group 1)
2. Input Form Updates (Task Group 2)
3. Visual Indicators (Task Group 3)
4. Final Verification (Task Group 4)
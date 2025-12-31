# Task Breakdown: Real-time Game Calculation Logic

## Overview
Total Tasks: 12

## Task List

### Frontend Components

#### Task Group 1: Component Updates (ScoreHeader & InputForm)
**Dependencies:** None

- [x] 1.0 Update UI components for Game Logic
  - [x] 1.1 Write 2-4 focused tests for ScoreHeader lead indicator
    - Test it highlights the correct team when scores differ
    - Test no highlight on tie
  - [x] 1.2 Update `ScoreHeader.tsx`
    - Add `leadingTeam` prop (optional, or derived internally if simpler)
    - Implement visual indicator (e.g., crown icon or bold text)
  - [x] 1.3 Update `RoundInputForm.tsx`
    - Add `disabled` prop
    - Disable inputs and submit button when `disabled` is true
  - [x] 1.4 Ensure component tests pass
    - Run only the 2-4 tests from 1.1

**Acceptance Criteria:**
- ScoreHeader visually indicates who is winning
- RoundInputForm can be completely disabled via prop

#### Task Group 2: Game State Logic & Integration
**Dependencies:** Task Group 1

- [x] 2.0 Implement Game Logic in Main Page
  - [x] 2.1 Write 2-4 focused integration tests for Game Logic
    - Test winning condition (reaching target stops game)
    - Test reset game functionality
  - [x] 2.2 Update `src/app/page.tsx` state
    - Add `gameStatus`, `winner`, `targetScore` states
    - Add "Game Over" UI section (shows winner, hides input)
    - Add "Target Score" selector (1000/1500)
    - Add "New Game" button logic
  - [x] 2.3 Implement Win Detection in `handleRoundSubmit`
    - Check scores against target after update
    - Set game status to finished if target reached
  - [x] 2.4 Ensure integration tests pass
    - Run only the tests from 2.1

**Acceptance Criteria:**
- Reaching 1000 (or 1500) points triggers Game Over state
- Input form is hidden/disabled when game ends
- Winner is displayed clearly
- User can start a new game

### Testing

#### Task Group 3: Verification
**Dependencies:** Task Groups 1-2

- [x] 3.0 Verify Full Game Flow
  - [x] 3.1 Review tests from Groups 1-2
  - [x] 3.2 Add end-to-end integration test
    - Simulate a full game flow (shortened target for test if possible)
    - Verify lead changes visually
    - Verify game end state blocks input
    - Verify restart works
  - [x] 3.3 Run all feature tests
    - Run tests for `ScoreHeader`, `RoundInputForm`, and `Home` page logic

**Acceptance Criteria:**
- All new logic is covered by tests
- Manual verification confirms the "Lead" indicator is visible

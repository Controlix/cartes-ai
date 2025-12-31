# Task Breakdown: End Game Tie Handling

## Overview
Total Tasks: 3 Groups

## Task List

### Data Model & Logic Layer

#### Task Group 1: Types and Core Logic Setup
**Dependencies:** None

- [x] 1.0 Update Data Models and Logic Tests
  - [ ] 1.1 Write focused tests for Game Logic Scenarios
    - [x] Test Case 1: Game does not end if scores tied >= 1000
    - [x] Test Case 2: Game does not end if active litige exists >= 1000
    - [x] Test Case 3: "Tie-Breaker" round does not add points to total
    - [x] Test Case 4: 1071-1071 tie scenario (User specified)
    - [x] Test Case 5: 1029-951 Litige Resolution scenario (Potential Winner)
    - [ ] Test Case 6: Recursive Litige Resolution (Tie during resolution, fixed reserve)
  - [x] 1.2 Update `Round` interface
  - [x] 1.3 Ensure logic tests fail (TDD) or pass if simple

**Acceptance Criteria:**
- `Round` type supports new flags
- Tests exist describing the required game loop behavior

### Feature Implementation

#### Task Group 2: Game Loop Implementation
**Dependencies:** Task Group 1

- [x] 2.0 Implement Extended Game Logic
  - [x] 2.1 Write 2-8 focused tests for `handleRoundSubmit` integration
  - [x] 2.2 Implement "Tie-Breaker" Logic in `page.tsx`
  - [x] 2.3 Implement "Litige Resolution" Logic in `page.tsx`
  - [x] 2.4 Refine End Game Conditions
  - [x] 2.5 Ensure all logic tests pass

**Acceptance Criteria:**
- Game continues when tied >= 1000
- Game continues when litige exists >= 1000
- Tie-breaker round correctly determines winner without adding points
- Litige resolution round correctly awards reserve and ignores round points

### UI Components

#### Task Group 3: History Display & Polish
**Dependencies:** Task Group 2

- [x] 3.0 Update Game History Display
  - [x] 3.1 Write 2-8 focused tests for `GameHistory` component
  - [x] 3.2 Update `GameHistory.tsx`
  - [x] 3.3 Verify Total Score Display
  - [x] 3.4 Ensure UI tests pass

**Acceptance Criteria:**
- History clearly distinguishes these special rounds
- Total score matches the logic (no points from extra rounds, only reserves)
- Visuals are clean and understandable

### Testing

#### Task Group 4: Test Review & Gap Analysis
**Dependencies:** Task Groups 1-3

- [x] 4.0 Review existing tests and fill critical gaps only
  - [x] 4.1 Review tests from Task Groups 1-3
  - [x] 4.2 Analyze test coverage gaps for THIS feature only
  - [x] 4.3 Write up to 10 additional strategic tests maximum
  - [x] 4.4 Run feature-specific tests only

**Acceptance Criteria:**
- Complex end-game scenarios are covered
- Logic holds up under repeated ties/litiges
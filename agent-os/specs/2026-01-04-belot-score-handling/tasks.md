# Task Breakdown: Belot Score Handling

## Overview
Total Tasks: 4 Task Groups

## Task List

### Data & Logic Layer

#### Task Group 1: Data Model and Strategy Updates
**Dependencies:** None

- [x] 1.0 Complete Data Model & Strategy updates
  - [x] 1.1 Write 2-8 focused tests for Belot logic
  - [x] 1.2 Update Data Models
  - [x] 1.3 Update StandardRoundStrategy
  - [x] 1.4 Ensure logic tests pass

**Acceptance Criteria:**
- The new tests from 1.1 pass.
- `Round` objects correctly persist the `belotTeam` information.
- Strategy correctly identifies Winner, Litige, and Dedans in Belot scenarios.

### Frontend Components

#### Task Group 2: Round Input Form
**Dependencies:** Task Group 1

- [x] 2.0 Complete Round Input Form updates
  - [x] 2.1 Write 2-8 focused tests for RoundInputForm
  - [x] 2.2 Update RoundInputForm Component
  - [x] 2.3 Integrate with GameEngine
  - [x] 2.4 Ensure RoundInputForm tests pass

**Acceptance Criteria:**
- The new tests from 2.1 pass.
- Users can select Belot for either team (or neither).
- Selection is mutually exclusive.
- Correct data is submitted.

#### Task Group 3: Game History Display
**Dependencies:** Task Group 1

- [x] 3.0 Complete Game History updates
  - [x] 3.1 Write 2-8 focused tests for GameHistory
  - [x] 3.2 Update GameHistory Component
  - [x] 3.3 Ensure GameHistory tests pass

**Acceptance Criteria:**
- The new tests from 3.1 pass.
- Belot is visually distinguishable in the history list.
- Layout remains responsive and aligned.

### Testing

#### Task Group 4: Test Review & Gap Analysis
**Dependencies:** Task Groups 1-3

- [x] 4.0 Review existing tests and fill critical gaps only
  - [x] 4.1 Review tests from Task Groups 1-3
  - [x] 4.2 Analyze test coverage gaps for THIS feature only
  - [x] 4.3 Write up to 10 additional strategic tests maximum
  - [x] 4.4 Run feature-specific tests only

**Acceptance Criteria:**
- All feature-specific tests pass.
- Critical user workflows (Enter Score with Belot -> Verify Result) are covered.
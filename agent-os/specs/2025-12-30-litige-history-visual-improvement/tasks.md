# Task Breakdown: Litige History Visual Improvement

## Overview
Total Tasks: 3

## Task List

### Data & Logic
- [ ] 1.0 Update Data Model and Capture Logic
  - [ ] 1.1 Add `contestedPoints?: number` to `Round` interface in `src/types/Round.ts`
  - [ ] 1.2 Update `handleRoundSubmit` in `src/app/page.tsx` to store the taker's score in `contestedPoints` when a litige occurs.

### UI Implementation
- [ ] 2.0 Update History UI
  - [ ] 2.1 Modify `GameHistory.tsx` to accept and display `contestedPoints` in brackets for litige rounds.
  - [ ] 2.2 Style the bracketed points (e.g., smaller text, grayed out).

### Verification
- [ ] 3.0 Verify Implementation
  - [ ] 3.1 Create a test in `src/app/page.test.tsx` (or a new test file) that verifies the bracketed score appears in the history row after a litige round.
  - [ ] 3.2 Run all tests.

**Acceptance Criteria:**
- History shows `0 (XX)` for the taker in a litige round.
- Logic correctly identifies the taker's score to put in brackets.
- Styling is clean and consistent with the existing UI.

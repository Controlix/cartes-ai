# Implementation Report: State Management Refactoring

- Refactored `src/app/page.tsx` to use a `rounds` array state.
- Implemented derived state for `team1Score` and `team2Score` using `useMemo`.
- Updated `handleRoundSubmit` to append new rounds with unique IDs (using crypto.randomUUID).
- Polyfilled `crypto.randomUUID` in `jest.setup.ts` for test compatibility.
- Updated integration tests in `src/app/page.test.tsx` to verify history list updates.

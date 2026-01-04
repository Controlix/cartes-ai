# Specification: Litige History Visual Improvement

## Goal
Improve the game history's clarity by showing the contested points (in brackets) next to the 0 score during a litige round.

## User Stories
- As a player, I want to see how many points were contested during a litige in the history, so I can remember what happened in that round even though the points weren't added yet.

## Specific Requirements

**Update Round Data Model**
- Extend `Round` interface in `src/types/Round.ts` to include an optional `contestedPoints?: number` field.

**Capture Contested Points**
- Update `handleRoundSubmit` in `src/app/page.tsx`.
- When `isLitige` is true, save the preneur's original score into the `contestedPoints` field of the `newRound` object.
- Apply this logic also for "Recursive Litige" (ties during Tie-Breaker or Litige Resolution rounds).

**Update Game History Display**
- Update `GameHistory.tsx`.
- If a round is a litige, display the `contestedPoints` in brackets (e.g., `0 (81)`) next to the team that was the taker.
- Ensure the brackets are styled subtly so they don't distract from the actual round result (0).

## Existing Code to Leverage

**`src/app/page.tsx`**
- Modify `handleRoundSubmit` to set `contestedPoints`.

**`src/components/GameHistory.tsx`**
- Update `renderScore` to show the bracketed points.

## Out of Scope
- Displaying contested points for non-litige rounds.
- Modifying the reserve points display at the top of the screen.

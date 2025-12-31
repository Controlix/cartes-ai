# Spec Requirements: Real-time Game Calculation Logic

## Initial Description
Real-time Game Calculation Logic — Implement the logic to sum round scores and update the total game score dynamically as rounds are added.

## Requirements Discussion

### First Round Questions

**Q1:** I assume we need to store the history of all rounds to recalculate the total score accurately. Is that correct, or should we just maintain a running total?
**Answer:** A running total is sufficient, we assume the score calculation is correct.

**Q2:** I assume "real-time" here means "update totals instantly upon submission". Is that correct?
**Answer:** [Implied Yes]

**Q3:** Should we implement a "Winning Score" check now (e.g., first to 1000 points)? If so, what is the default target score?
**Answer:** I want a winning score too. The first to 1000 wins (make that configurable).

**Q4:** If a game is finished (target reached), should the input form be disabled or hidden automatically?
**Answer:** Yes, then no further input is allowed.

**Q5:** I want to see which team is in the lead after each round.
**Answer:** Yes, implementing a lead indicator.

### Existing Code to Reference
- `src/app/page.tsx`: Currently manages state `team1Score`, `team2Score`. Needs expansion for game status.
- `src/components/ScoreHeader.tsx`: Needs update to show the lead indicator.
- `src/components/RoundInputForm.tsx`: Needs to be disabled when game ends.

### Follow-up Questions

**Follow-up 1:** Lead Indicator style?
**Answer:** "Just pick" (Will implement a sensible default, e.g., highlighting the leading score text or adding a small icon).

## Visual Assets

### Files Provided:
No visual files found.

## Requirements Summary

### Functional Requirements
- **Running Total:** Continue to update the running total when a round is submitted (already partially in place, needs formalizing).
- **Winning Condition:**
  - Configurable target score (default: **1000**).
  - Check after every round submission.
  - If `TeamScore >= Target`: Game Ends.
- **Game End State:**
  - Visual indication that the game is over.
  - `RoundInputForm` must be disabled or hidden.
  - Option to see who won (Winner declaration).
- **Lead Indicator:**
  - Visually distinguish the team currently in the lead in the `ScoreHeader`.
- **Configurability:**
  - Simple UI or state variable to change the target score (e.g., 1000, 1500).

### Reusability Opportunities
- Reuse `ScoreHeader` prop updates for the lead indicator.
- Reuse `RoundInputForm` disabled state prop (need to add it).

### Scope Boundaries
**In Scope:**
- Score update logic.
- Win detection logic.
- "Game Over" UI state.
- Leading team visual indicator.
- Setting the target score (simple selector or default).

**Out of Scope:**
- Storing full round history (for now, just running total).
- Editing past rounds.
- Complex "End Game" animations (confetti, etc. - keep it simple).

### Technical Considerations
- State management: Need to track `gameStatus` (playing, finished).
- Lead calculation: Simple comparison `score1 > score2`.

# Spec Requirements: Game Finalization & Winner Declaration

## Initial Description
Game Finalization & Winner Declaration — Add functionality to detect when a game ends (e.g., reaching a target score) or allow manual finish to display the winner.

## Requirements Discussion

### First Round Questions

**Q1:** Target Score Selection: I'm assuming we want to allow the user to choose between 1000 and 1500 points. Should this be selectable only at the start of a new game, or can it be changed during an active game?
**Answer:** Not needed.

**Q2:** Manual Finish: I'm assuming we should provide a "Finish Game" button for situations where players want to stop early. Should this be prominently displayed next to the "Add Round" form, or tucked away in a settings/options menu?
**Answer:** Not needed.

**Q3:** Winner Display: The current implementation shows a simple "Game Over" box. Would you like a more celebratory full-screen overlay or animation (e.g., confetti) when a winner is declared?
**Answer:** Not needed.

**Q4:** Tie-Breaker: In the rare event of an exact tie at or above the target score, should the game end in a draw, or should we prompt for one "sudden death" round?
**Answer:** We need to elaborate that case.

**Q5:** Persistence: I'm assuming we want to save the final results to LocalStorage so the winner remains visible even if the page is refreshed. Is that correct?
**Answer:** Not needed.

**Q6:** Game Submission: The roadmap mentions "Game Submission". Should this trigger a real API call (mocked for now), or is the current local "Success" message sufficient for this stage?
**Answer:** Not needed.

**Q7:** Exclusions: Are there any specific finalization rules (like "winning by at least 2 points") that we should NOT implement?
**Answer:** Not needed.

### Existing Code to Reference
- `src/app/page.tsx`: Contains basic `gameStatus` and `targetScore` logic.
- `src/config/translations.ts`: Contains `game` labels.
- `ScoreHeader.tsx`: Current score display.

**Similar Features Identified:**
- Feature: Real-time Game Calculation Logic - Path: `agent-os/specs/2025-12-20-real-time-game-calculation-logic/`

### Follow-up Questions

**Follow-up 1:** Exact Tie Condition: If both teams cross the target score (e.g., 1000) and have the exact same total score (e.g., 1020 - 1020), I assume the game should continue for more rounds until one team has a higher total score. Is that correct?
**Answer:** yes, the game should just continue. But the score of the next round should not be added anymore, it will just decide who is the winner.

**Follow-up 2:** Winning Margin: Is there a requirement to "win by 2 points" or any other margin, or is a 1-point lead sufficient to end the game once the target is reached?
**Answer:** there is no margin to win, 1 point is enough.

**Follow-up 3:** UI Feedback: In a tie-breaker situation, should we show a special message (e.g., "Equal scores! Next round decides...") or just keep the input form active as usual?
**Answer:** no other feedback needed.

## Visual Assets
No visual assets provided.

## Requirements Summary

### Functional Requirements
- **Automatic Win Detection**: Trigger "Game Over" state when a team reaches or exceeds the target score (`1000` by default).
- **Tie-Breaker Logic**: If both teams are equal and above the target score, the game continues for one more "Sudden Death" round.
- **Sudden Death Resolution**: The points from the tie-breaking round are NOT added to the total scores. The winner of that round is declared the winner of the game.
- **Final Scores**: In a tie-breaker, the final displayed scores for both teams remain equal.
- **Simple Winner Declaration**: Use existing UI to show the winner and disable inputs.

### Reusability Opportunities
- Reuse existing `handleRoundSubmit` logic for win detection.
- Reuse `translations.game` for labels.

### Scope Boundaries
**In Scope:**
- Detection of winner based on target score.
- Handling of exact ties at/above target score (continue playing).
- 1-point lead requirement to end game.

**Out of Scope:**
- Target score selection UI (postponed).
- Manual finish button.
- Advanced animations or celebratory overlays.
- Winning margins (e.g., "win by 2").

### Technical Considerations
- Logic must be updated in `src/app/page.tsx`.
- Ensure `handleRoundSubmit` correctly evaluates the tie condition after calculating effective scores and reserves.

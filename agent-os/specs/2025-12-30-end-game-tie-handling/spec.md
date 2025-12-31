# Specification: End Game Tie Handling

## Goal
Implement logic to extend the game when an end-game condition is met but a valid winner cannot be declared due to a tie or an unresolved litige (dispute).

## User Stories
- As a player, I want the game to continue if both teams reach the target score (1000) with the exact same score, so that a clear winner is determined.
- As a player, I want the game to continue if a round ends in a litige while a team reaches the target score, so that the reserved points are fairly awarded before ending.
- As a player, I want "Sudden Death" or "Resolution" rounds to count only for determining the winner or awarding reserves, without inflating the total score with the round's own points.

## Specific Requirements

**End Game Condition Check**
- Update `handleRoundSubmit` in `src/app/page.tsx` to prevent setting `gameStatus` to `finished` if:
    - Both teams have equal scores AND both are >= `targetScore`.
    - The current round resulted in a `litige` (active reserve points generated from this round), even if a team passed the `targetScore`.
    - There are unawarded `reservePoints` while a team is >= `targetScore` (implies need for resolution).

**Tie-Breaker Logic (Equal Scores >= 1000)**
- Detect condition: `team1Score === team2Score` AND `team1Score >= targetScore`.
- If detected, the NEXT round submitted is a "Tie-Breaker Round".
- **Logic:**
    - Calculate round winner based on raw input.
    - **Do NOT add** the round's points to `team1Score` or `team2Score`.
    - The winner of this round is immediately declared the **Game Winner**.
    - Set `gameStatus` to `finished`.
- **History Display:** Show this round in history with 0 points for both teams (or visual indicator), but preserve the record that it happened.

**Litige Resolution Logic (Game Ending with Active Reserve)**
- Detect condition: (`team1Score >= targetScore` OR `team2Score >= targetScore`) AND `reservePoints > 0`.
- If detected, the NEXT round submitted is a "Resolution Round".
- **Logic:**
    - Calculate round winner based on raw input.
    - **Do NOT add** the round's points to the totals.
    - ADD the current `reservePoints` to the round winner's Total Score.
    - Reset `reservePoints` to 0.
    - Re-evaluate Game Winner:
        - If scores are now unequal and >= target: Declare Winner.
        - If scores are tied >= target: Enter "Tie-Breaker" mode (continue game).
- **History Display:** Show this round in history. The winner's column shows `[ReserveAmount]`, loser shows `0`. The round's raw points are ignored/hidden in the total calculation.

**Game History Updates**
- Update `GameHistory` component to handle these special rounds.
- Ensure "Tie-Breaker" rounds don't visually inflate the score column confusingly (e.g., explicitly show +0).
- Ensure "Resolution" rounds show the awarded reserve points clearly.

## Visual Design

*No visual assets provided. Use standard UI.*

## Existing Code to Leverage

**`src/app/page.tsx` (Home Component)**
- Modify `handleRoundSubmit` to include the new conditional checks (Is Tie? Is Litige?).
- update `rounds` state management to support rounds that don't add their own score (perhaps add a flag to `Round` type).

**`src/types/Round.ts`**
- Extend `Round` interface if necessary to store "resolution" metadata (e.g., `isTieBreaker`, `awardedReserve`).

**`src/components/GameHistory.tsx`**
- Adapt rendering to check for `isTieBreaker` or `awardedReserve` flags and display scores accordingly (e.g., show `+0` or `+81 (Reserve)`).

## Out of Scope
- Changing the input form UI (inputs remain standard).
- New animations for winning.
- "Win by 2" logic (explicitly excluded by user).
- Changing logic for rounds below the target score.

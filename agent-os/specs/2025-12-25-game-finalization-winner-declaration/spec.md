# Specification: Game Finalization & Winner Declaration

## Goal
Implement robust win detection logic that accounts for target scores and tie-breaker scenarios, ensuring a game only ends when a clear winner is identified.

## User Stories
- As a scorekeeper, I want the game to automatically end when a team reaches the target score so that I don't have to manually declare the winner.
- As a player, I want the game to continue if there is a tie at the target score so that we can play until a winner is decided.

## Specific Requirements

**Improved Win Detection Logic**
- Update `handleRoundSubmit` in `src/app/page.tsx` to evaluate game completion after all score calculations (including reserves, capots, and dedans).
- A game is considered "finished" ONLY IF:
    - At least one team has reached or exceeded the `targetScore` (default 1000).
    - AND the scores are NOT equal (`team1Score !== team2Score`).
- If both teams are above the target score but tied, the `gameStatus` must remain `'playing'`.

**Sudden Death/Tie-Breaker Resolution**
- If a round is submitted while the total scores are tied AND at/above the target score:
    - Determine which team won the round (more points).
    - Set `gameStatus` to `'finished'`.
    - DO NOT add the points from this round to the total scores (the round can be added to history with 0 points or handled via a specific flag, but total scores must not change).
    - The winner of the game is the winner of this "sudden death" round.
- The final scores displayed in the header will be identical for both teams.

**Winner Determination**
- Update the `winner` derivation in `Home` component to correctly identify the winner. 
- In case of a finished game with equal scores, the winner is determined by the last round's "winner" status (may require a new state like `tieBreakerWinner`).

**Input Locking**
- Ensure that once a winner is declared (`gameStatus === 'finished'`), the `RoundInputForm` remains disabled to prevent further score entries.
- The only way to resume play or start a new game should be through the `resetGame` functionality.

**Sudden Death/Tie-Breaker Flow**
- No special UI feedback is required for a tie-breaker; the app should simply continue to allow score entries until the next round result breaks the tie.

## Existing Code to Leverage

**`src/app/page.tsx`**
- Modify `handleRoundSubmit` to implement the new termination condition: `(newTotal1 >= targetScore || newTotal2 >= targetScore) && newTotal1 !== newTotal2`.
- Update the `winner` constant to use a simple comparison: `team1Score > team2Score ? team1Name : team2Name`.

**`src/config/appConfig.ts`**
- Reference the existing `targetScore` (1000) for logic consistency.

**`src/components/ScoreHeader.tsx`**
- The lead indicator (Crown icon) already works based on `score1 > score2`, which aligns with the 1-point lead requirement.

## Out of Scope
- UI for selecting different target scores (e.g., toggle between 1000/1500).
- "Win by 2" or other margin requirements.
- Manual "Finish" or "Force End" button.
- Advanced "Winner" overlays or animations.
- Persisting historical game winners to LocalStorage (outside the current session).

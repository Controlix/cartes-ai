# Specification: Litige Handling

## Goal
Implement automatic detection and handling of "litige" (tied scores) scenarios, including a mechanism to select the bid taker, immediately award points to the defender, and stack the taker's points in a reserve to be won in a subsequent round.

## User Stories
- As a scorekeeper, I want to specify which team "took" the bid so the app can correctly assign points in case of a tie.
- As a player, I want the app to automatically detect a litige (e.g., 81-81 score) and handle the points according to Belot rules (defender gets points immediately, taker's points are reserved).
- As a player, I want to see how many points are currently "in reserve" so I know the stakes of the next round.
- As a player, I want the winner of the next valid round to automatically receive the accumulated reserve points.

## Specific Requirements

**Taker Selection**
- Update `RoundInputForm` to include a required selection for "Who took?" (Team 1 or Team 2).
- Default to "Team 1" or maintain the last selection to speed up entry? (Better to require explicit choice or default to none to avoid errors, but for speed maybe default Team 1). *Decision: Default to Team 1 to keep it fast, but allow easy toggle.*

**Litige Detection & Logic**
- **Detection**: Triggered when `score1 === score2` (typically 81-81 or 126-126 with declarations, but general rule is equality).
- **Point Allocation (Litige Round)**:
    - **Defender**: Receives their score immediately.
    - **Taker**: Receives 0 points immediately. Their points are added to `reservePoints`.
- **Point Allocation (Next Non-Litige Round)**:
    - **Winner**: Receives their round score + ALL accumulated `reservePoints`.
    - **Loser**: Receives their round score.
    - **Reserve**: Resets to 0.
- **Stacking**: If consecutive rounds are litiges, `reservePoints` accumulate (e.g., 81 -> 162).

**State Management**
- Track `reservePoints` (number) in the main game state.
- Update `Round` type to include `taker` (teamId) and `isLitige` (boolean) for history tracking.

**Visual Indicators**
- **Reserve Display**: Show a "Reserve: X points" indicator on the main screen (e.g., near the header or input form) ONLY when `reservePoints > 0`.
- **History**: Mark litige rounds clearly (e.g., with a specific icon or text) in the history list.

## Visual Design

**Reserve Display**
- A small, distinct badge or banner (e.g., "📦 Reserve: 81 pts") placed centrally, perhaps below the ScoreHeader or above the History list.
- Color: Neutral or "at risk" color (e.g., orange/amber) to indicate pending points.

**Input Form**
- Add two radio buttons or a toggle switch above/between the score inputs labeled "Taker" ("Preneur").
- Use team names (dynamic) for the labels.

## Existing Code to Leverage

**`src/components/RoundInputForm.tsx`**
- Modify to accept `team1Name` and `team2Name` props.
- Add state for `taker`.
- Pass `taker` back in `onSubmit`.

**`src/app/page.tsx`**
- Refactor `handleRoundSubmit` to implement the litige logic (compare scores, check taker, update reserve).
- Pass `reservePoints` to a new display component or render inline.

**`src/types/Round.ts`**
- Add `taker: 'team1' | 'team2'` and `isLitige: boolean`.

## Out of Scope
- "Annonces" logic (Belot, Tierce) - we strictly handle score equality based on the input numbers.
- Manual "Litige" override button (system should auto-detect based on equality).

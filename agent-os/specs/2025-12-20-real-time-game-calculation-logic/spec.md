# Specification: Real-time Game Calculation Logic

## Goal
Implement game logic to track the winning score (default 1000), declare a winner, disable input when the game ends, and visually indicate the leading team.

## User Stories
- As a player, I want to see clearly who is currently in the lead so I know the game status.
- As a player, I want the game to automatically stop allowing inputs when a team reaches the target score (e.g., 1000).
- As a player, I want to be able to change the target score (e.g., to 1500) if we are playing a longer game.

## Specific Requirements

**Game State Management**
- Track `targetScore` (default: 1000).
- Track `gameStatus`: 'playing' | 'finished'.
- Track `winner`: 'team1' | 'team2' | null.

**Win Detection Logic**
- After every score update, check if `teamScore >= targetScore`.
- If condition met:
  - Set `gameStatus` to 'finished'.
  - Set `winner` to the team with the higher score.
  - Disable further score inputs.

**Lead Indicator (ScoreHeader)**
- Update `ScoreHeader` to accept a `leadingTeam` prop or derive it from scores.
- Visually highlight the leading team's score (e.g., bold text, crown icon, or distinct color).
- If scores are tied, no lead indicator.

**Game Over UI**
- When `gameStatus` is 'finished':
  - Hide or Disable `RoundInputForm`.
  - Display a "Game Over" message.
  - Show the Winner's name prominently.
  - Provide a way to "Start New Game" (reset scores and status).

**Target Score Configuration**
- Add a simple selector or toggle (e.g., "1000" vs "1500") to set `targetScore`.
- Allow changing this only when the game is in progress (or restricted if preferred, but usually flexible).

## Visual Design
No specific mockups provided.
- **Lead Indicator:** Use a simple visual cue (e.g., a "👑" icon next to the score).
- **Game Over:** A clean banner or modal-like overlay replacing the input form.
- **Target Selector:** A small dropdown or toggle switch, perhaps near the header or footer.

## Existing Code to Leverage

**`src/app/page.tsx`**
- Centralize the new state (`gameStatus`, `targetScore`) here.
- Update `handleRoundSubmit` to include the win check logic.

**`src/components/ScoreHeader.tsx`**
- Update props to support visual highlighting for the leader.

**`src/components/RoundInputForm.tsx`**
- Add a `disabled` prop to prevent input when the game is over.

## Out of Scope
- Storing full history of rounds (just running total for now).
- editing previous rounds.
- Complex animations for winning.

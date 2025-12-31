# Specification: Game History Display

## Goal
Implement a scrollable game history list that displays past rounds with team scores, mimicking a paper score sheet layout while optimizing for mobile usability.

## User Stories
- As a player, I want to see a list of previous rounds so I can verify the game progress.
- As a player, I want to see the specific scores for each team in every round to understand how the total was reached.
- As a mobile user, I want the history list to be scrollable while keeping the score header and input form fixed, so I can easily enter new scores without losing context.

## Specific Requirements

**Game State Management**
- Refactor the main `Home` component state to track an array of `Round` objects instead of just flat total scores.
- Define a `Round` interface: `{ id: string; number: number; team1Score: number; team2Score: number; }`.
- Ensure adding a new round updates both the history array and the calculated total scores.

**GameHistory Component**
- Create a new component `GameHistory` to render the list of rounds.
- Display "Round #" (or just the number), "Team 1 Score", and "Team 2 Score" for each item.
- Use a clean, table-like or list-based layout with clear separation between rows.
- Style the list to be legible with adequate spacing (touch-friendly target sizes, though interactions aren't required yet).

**Responsive Layout**
- Update the main page structure to a flex column layout:
    - Top: `ScoreHeader` (Fixed/Sticky)
    - Middle: `GameHistory` (Flex-1, Overflow-y-auto)
    - Bottom: `RoundInputForm` (Fixed/Sticky)
- Ensure the layout prevents the page from scrolling as a whole; only the history section should scroll.
- Verify visibility of the input form on mobile devices when the virtual keyboard might be active (though standard fixed positioning usually handles this, layout structure is key).

## Visual Design

**Reference: Paper Score Sheet Metaphor**
- **List Items:** Simple rows with three columns: Round Number (Left/Center), Team 1 Score (Left/Center alignment with header), Team 2 Score (Right/Center alignment with header).
- **Typography:** Consistent with existing app fonts (Inter/Sans), maybe slightly smaller than the main total score but readable.
- **Colors:** Alternating row colors (zebra striping) or dividers for readability.

## Existing Code to Leverage

**`src/app/page.tsx`**
- Refactor existing state (`team1Score`, `team2Score`) to be derived from the new `rounds` array (or kept in sync).
- Reuse the `TeamSection` styling cues (colors `bg-blue-50` / `bg-red-50`) to color-code the history columns if helpful.

**`src/components/ScoreHeader.tsx`**
- Keep this as the fixed top element.

**`src/components/RoundInputForm.tsx`**
- Keep this as the fixed bottom element.

## Out of Scope
- Editing or deleting past rounds (read-only for now).
- Persisting game history to LocalStorage (unless trivial hook implementation, but not a primary requirement).
- "Declarations" (Belot, Tierce, etc.) display.
- Complex animations for new rows.

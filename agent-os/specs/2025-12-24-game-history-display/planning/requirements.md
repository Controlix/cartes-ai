# Spec Requirements: 2025-12-24-game-history-display

## Initial Description
Game History Display — Show a scrollable list of past rounds and their respective scores on the main game screen.

## Requirements Discussion

### First Round Questions

**Q1:** I assume the history list should be displayed **below the team scores/headers** and **above the current round input form**, mimicking a paper score sheet. Is that correct?
**Answer:** Yes, implied by "no edit needed yet" and standard scorekeeping flow. User confirmed general approach.

**Q2:** I'm thinking the list should display **Round Number**, **Team A Score**, and **Team B Score** for each row. Should we include any other details (e.g., declarations like 'Belot', 'Tierce')?
**Answer:** "no declarations needed"

**Q3:** I assume users might need to **edit or delete** a previous round if they made a mistake. Should this feature be included now, or should the history be read-only for this iteration?
**Answer:** "no edit needed yet"

**Q4:** I'm thinking of making the **history section itself scrollable** while keeping the header (team names) and footer (input form/totals) fixed, so the input is always accessible.
**Answer:** "for scrollable part, do as you think best for mobile"

**Q5:** I assume the history should represent the **current active game** stored in LocalStorage.
**Answer:** (Implied yes, aligned with existing roadmap/tech stack)

### Existing Code to Reference
No similar list components identified in `src/components`.
`src/app/page.tsx` currently manages state but only tracks total scores, not history.

### Follow-up Questions

**Follow-up 1:** State refactoring to store array of past rounds.
**Answer:** "ok with this"

**Follow-up 2:** Create `Round` interface.
**Answer:** (Implied approval)

**Follow-up 3:** Layout adjustment for scrollable history section (`flex-1`, `overflow-y-auto`).
**Answer:** "ok with this"

## Visual Assets

### Files Provided:
No visual assets provided.

### Visual Insights:
- **Layout:** "Paper score sheet" metaphor.
- **Mobile-first:** Fixed header (totals) and footer (input), scrollable middle content (history).
- **Simplicity:** Minimalist list items (Round #, Score A, Score B).

## Requirements Summary

### Functional Requirements
- **State Management:** Refactor `Home` component to track an array of `Round` objects (round number, team 1 score, team 2 score) instead of just total scores.
- **Display:** Render a list of past rounds.
- **Layout:**
    - **Header:** Total scores (already exists).
    - **Middle:** Scrollable list of rounds.
    - **Bottom:** Input form (already exists, but needs to be "sticky" or fixed at bottom).
- **Data Flow:** When a round is submitted via `RoundInputForm`, add it to the history array and update totals.

### Reusability Opportunities
- **Tailwind:** Use existing styling patterns (colors, fonts).
- **Config:** Use `appConfig` for any constants.

### Scope Boundaries
**In Scope:**
- Displaying the list of rounds.
- Refactoring state to support round history.
- Scrollable layout implementation.

**Out of Scope:**
- Editing or deleting past rounds.
- Declarations (Belot, Tierce, etc.).
- Persistent storage (LocalStorage) - though mentioned in roadmap, sticking strictly to display logic first unless it breaks "State Management". *Self-correction: The prompt didn't explicitly ask for persistence implementation, but the "roadmap" says "LocalStorage (for saving game state)". I will implement the state in React first; persistence might be a separate task or implicit if simple.* (Sticking to simple React state for now to match specific feature request).

### Technical Considerations
- **Component:** Create a new `GameHistory` component.
- **Type:** Define `Round` type: `{ id: string; number: number; team1Score: number; team2Score: number; }`.
- **CSS:** Use `flex-col`, `flex-1`, `overflow-y-auto` for the container to ensure the input form remains visible on mobile keyboards.

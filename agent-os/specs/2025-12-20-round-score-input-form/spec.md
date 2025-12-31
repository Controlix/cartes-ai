# Specification: Round Score Input Form

## Goal
Implement a dedicated form section for entering round scores for both teams, ensuring the total sum adheres to strict Belot rules (162 total or 252 Capot) before allowing submission.

## User Stories
- As a player, I want to enter the score for my team and the opposing team manually.
- As a player, I want to be blocked from submitting if the scores don't sum to exactly 162 or 252.
- As a player, I want visual feedback if I try to enter a split 252 score (e.g., 120-132) which is invalid, as 252 requires one team to have 0.

## Specific Requirements

**Input Form Component**
- Create `RoundInputForm` to handle score entry.
- Provide two numeric input fields (`type="number"`), one for each team.
- Align inputs visually with the corresponding team columns in the UI.

**Validation Logic**
- **Standard Round:** The sum of both scores MUST be exactly **162**.
- **Capot:** The sum MUST be **252** AND one of the scores MUST be **0**.
- **Invalid:** Any other sum, or a sum of 252 where both teams have > 0 points (split score).
- Negative numbers are not allowed.

**Submission Flow**
- Button labeled "Submit Round".
- Only proceed if validation passes.
- On success: emit scores to parent, clear inputs, and remove error messages.
- On failure: display a clear error message explaining the rule violation.

**Responsive Design**
- Inputs should be touch-friendly (large hit areas).
- Layout should adapt to the existing `TeamSection` columns (stacked on mobile, side-by-side on desktop).

## Visual Design
No specific mockups provided.
- Use a minimalist card style consistent with `TeamSection`.
- Use a large, full-width "Submit" button for easy mobile access.
- Error messages should be red and distinct.

## Existing Code to Leverage

**`src/components/RoundInputForm.tsx`**
- Existing implementation includes validation logic and UI structure.
- Reuse or refine this component to match any new specific styling needs.

**`src/components/ScoreHeader.tsx`**
- Leverage global Tailwind theme colors (e.g., `bg-blue-500`, `text-gray-700`).

## Out of Scope
- Automatic calculation of the second score (auto-fill).
- Declaration points (tierce, fifty, belote).
- "Clear" button (manual backspacing is sufficient).
- History persistence (database/local storage).
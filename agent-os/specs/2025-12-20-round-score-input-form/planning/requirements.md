# Spec Requirements: Round Score Input Form

## Initial Description
Round Score Input Form — Create a form to input scores for a single round for both teams, including basic validation (e.g., non-negative numbers).

## Requirements Discussion

### First Round Questions

**Q1:** I assume we should provide two input fields (one for each team). If the user enters points for one team, should we automatically calculate the remaining points for the other team?
**Answer:** We let both teams enter their score; that should sum up to 162 (or 252). If the sum is wrong, that should prevent from continuing until the scores are corrected.

**Q2:** How should we handle "Capot" (252 points)?
**Answer:** Handled via the validation rule (sum can be 252).

**Q3:** I'm thinking the form should appear as a modal or a dedicated section below the total scores. Which placement do you prefer?
**Answer:** A dedicated location is fine.

**Q4:** I assume we need a "Submit Round" button that adds the points to the total score. Should we also include a "Cancel" or "Clear" button?
**Answer:** There should be a submit button in case the sum is correct. No fancy cancel or clear is needed, as we will automate that in a later stage.

**Q5:** For validation, should we prevent submission if the total doesn't equal a valid Belot round sum?
**Answer:** Yes, strict validation. Sum must be 162 OR 252.

**Q6:** Are there any other specific "declarations" (like "tierce", "fifty", etc.) that need to be part of this input form now?
**Answer:** No, we will not count any declaration for now.

### Existing Code to Reference
- We can reuse the `TeamSection` or general container styles from the main page.
- `src/components/ScoreHeader.tsx` (for sticky header context).
- `src/components/EditableName.tsx` (input styling patterns).

### Follow-up Questions

**Follow-up 1:** Placement assumption: Dedicated section below team scores.
**Answer:** Confirmed.

**Follow-up 2:** Declarations assumption: Out of scope.
**Answer:** Confirmed.

## Visual Assets

### Files Provided:
No visual files found.

## Requirements Summary

### Functional Requirements
- **Input Fields:** Two number input fields, one for each team.
- **Validation:**
  - Inputs must be non-negative integers.
  - The sum of both inputs MUST be exactly **162** OR **252** (for Capot).
  - Submit button should be disabled or show an error if validation fails.
- **Submission:**
  - Clicking "Submit" (when valid) should trigger an action to update the game state (to be handled by the parent component).
- **Placement:** Displayed as a dedicated section on the main game board, likely below the team name/score sections.

### Reusability Opportunities
- Use `Tailwind` classes existing in `ScoreHeader` for consistent spacing/typography.
- Use `TeamSection` concepts for layout alignment (inputs aligned with team columns).

### Scope Boundaries
**In Scope:**
- The UI form (inputs + submit button).
- Client-side validation logic (Sum == 162 || 252).
- Error state display (visual feedback if sum is wrong).

**Out of Scope:**
- Automatic calculation of the second score based on the first.
- Handling declarations (tierce, belote, etc.).
- "Clear" or "Reset" button for the form.
- Persisting the round to a database/history (just passing the data up to the parent).

### Technical Considerations
- Ensure inputs are `type="number"` with `pattern="\d*"` for mobile numeric keypads.
- Validation should probably happen in real-time or on blur to give immediate feedback.

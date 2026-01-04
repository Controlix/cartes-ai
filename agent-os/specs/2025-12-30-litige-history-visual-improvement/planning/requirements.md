# Spec Requirements: Litige History Visual Improvement

## Initial Description
When a litige occurs, put the points of the playing team for that round between brackets in the game history. Visually the zero points can remain as-is, but the scored points should be visible in the history.

## Requirements Summary

### Functional Requirements
- **Display Preneur Score in Litige**: In the game history, for rounds where a litige occurred, the preneur's original score (which is effectively 0 in the total) should be displayed in brackets.
- **Visual Consistency**: The actual score (0) should remain prominent, with the bracketed score as supplementary information.

### Technical Considerations
- **Data Persistence**: The `Round` object needs to store the preneur's original score since it's currently discarded/replaced by 0 during submission logic.
- **UI Component Update**: `GameHistory.tsx` needs to be updated to render this bracketed score if it exists and if the round was a litige.

### Scope Boundaries
**In Scope:**
- Updating `Round` type.
- Updating `handleRoundSubmit` to save the preneur score during litige.
- Updating `GameHistory` rendering.
- Handling recursive litige in extra rounds (Tie-Breaker/Resolution) by showing contested points as well.

**Out of Scope:**
- Changes to non-litige rounds.
- Changes to the total score calculation.

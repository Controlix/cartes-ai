# Spec Requirements: Belot Score Handling

## Initial Description
add the ability to enter the "belot" for a team and use it in the score calculation

## Requirements Discussion

### First Round Questions

**Q1:** I assume we should add a checkbox or toggle for "Belote-Rebelote" (+20 points) in the `RoundInputForm` for the team that declares it. Is that correct?
**Answer:** yes

**Q2:** I'm thinking we should enforce that only one team can declare "Belot" per round (since there is only one trump suit). Should the UI automatically disable the option for the other team when one is selected?
**Answer:** yes but as users can make errors, the choice should be editable, as long as the round scores are not submitted

**Q3:** I assume the "Belot" points (20) should be added directly to the team's round score total, but should it also be visually distinguished in the `GameHistory` (e.g., with a small icon or text indicator)?
**Answer:** yes i'd like a small visual indicator e.g. a king + queen card

**Q4:** Does this declaration affect the "Litige" (tie) calculation logic, or is it simply added to the final points?
**Answer:** yes it affects the litige, since now the total points add up to 182 so the preneur team must score at least 92 to win, 91 is a litige, less that 91 is dedans

**Q5:** Are there any other bonuses we should consider now (like "Tierce", "Carre"), or is this exclusively for the 20-point Belot?
**Answer:** not yet

### Existing Code to Reference
- `src/components/RoundInputForm.tsx`
- `src/logic/GameEngine.ts` (and `strategies.ts`, `types.ts`)

### Follow-up Questions
No follow-up questions needed.

## Visual Assets

### Files Provided:
No visual assets provided.

## Requirements Summary

### Functional Requirements
- **Round Input:**
  - Add a way to select "Belot" (+20 points) for one of the teams in `RoundInputForm`.
  - Only one team can have Belot per round.
  - The selection should be mutually exclusive but editable before submission.
  - Input validation (sum of card points = 162) should remain, with Belot being treated as a bonus.

- **Game Logic:**
  - Update score calculation to include the +20 Belot bonus.
  - Update "Litige" / "Dedans" / "Win" logic to account for the new total of 182 points when Belot is present.
    - Preneur needs > (182/2) = 91 points (i.e., >= 92) to win.
    - 91 points is a litige (tie).
    - < 91 points is dedans (loss).

- **Game History:**
  - Display a visual indicator (King + Queen icon) next to the round score for the team that had the Belot.
  - Ensure the displayed score reflects the total (card points + belot).

### Reusability Opportunities
- Reuse existing `RoundInputForm` structure.
- Reuse existing strategy pattern in `strategies.ts`.

### Scope Boundaries
**In Scope:**
- Belot (20 points) handling.
- UI updates for input and history.
- Logic updates for score and game outcome determination.

**Out of Scope:**
- Other announcements (Tierce, Carre, etc.).
- Changes to PWA configuration or other roadmap items.

### Technical Considerations
- The `Round` interface in `types/Round.ts` and internal types in `logic/types.ts` will need to store who had the Belot.
- `StandardRoundStrategy` in `logic/strategies.ts` needs to be updated.


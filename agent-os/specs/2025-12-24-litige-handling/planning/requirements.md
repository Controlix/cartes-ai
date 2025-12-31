# Spec Requirements: Litige Handling

## Initial Description
Le litige est un cas de figure rare où chacune des équipes totalise exactement le même nombre de points. L'équipe qui défend marque immédiatement ses points. Ceux de l'équipe du preneur seront acquis par le vainqueur de la donne suivante.

## Requirements Discussion

### First Round Questions

**Q1:** I assume "Le litige" should be an option the user selects during score entry. Is that correct, or should the app automatically detect a litige when scores are equal?
**Answer:** The app should automatically detect this.

**Q2:** I'm thinking that when a litige is active, we need to track the "pending points". Is the rule strictly: In a litige (e.g., 81-81), the defending team gets their 81 immediately, and the taker's 81 are put 'in reserve' for the next round?
**Answer:** Winner takes points immediately, reserve remains. (Clarification: Defender is the "winner" in terms of getting points immediately in a litige).

**Q3:** I assume we need a visual indicator for the "litige points" currently in reserve (e.g., "+81 for next winner") on the main screen. Is that correct?
**Answer:** Yes.

**Q4:** Do we need to add a "Who took?" selector to the input form?
**Answer:** Yes.

**Q5:** If the next round also results in a litige, do the points stack (e.g., 81 + 81 pending)?
**Answer:** Litiges can indeed stack.

### Existing Code to Reference
- `src/components/RoundInputForm.tsx`: Needs to be modified to add the "Taker" selection.
- `src/app/page.tsx`: State management needs refactoring to handle `reservePoints` and the new litige logic.
- `src/components/GameHistory.tsx`: Should ideally indicate if a round was a litige.

### Follow-up Questions
No follow-up questions needed at this stage.

## Visual Assets

### Files Provided:
No visual files found.

## Requirements Summary

### Functional Requirements
- **Taker Selection**: Users must specify which team "took" the bid for each round.
- **Automatic Litige Detection**: When scores in a round are equal (e.g., 81-81), the system identifies a "litige".
- **Point Allocation (Litige)**:
    - The "defender" (team that didn't take) is immediately awarded their points.
    - The "taker's" points are added to a global `reservePoints` pool.
- **Reserve Awarding**: The winner of the first subsequent non-litige round is awarded all accumulated `reservePoints` in addition to their round score.
- **Reserve Stacking**: If multiple litiges occur in a row, the `reservePoints` continue to accumulate.
- **Reserve Display**: The current total of `reservePoints` must be visible on the main screen if it's greater than 0.

### Reusability Opportunities
- Modify `RoundInputForm` to include a toggle or radio group for "Who took?".
- Update the main game state in `page.tsx` to include `reservePoints`.

### Scope Boundaries
**In Scope:**
- Updating input form for taker selection.
- Implementing litige calculation logic.
- Stacking reserve points.
- Displaying current reserve.
- Updating history to reflect litige status.

**Out of Scope:**
- Complex "annonces" (Belot, etc.) that might change the standard 162 total (User previously specified no declarations needed).

### Technical Considerations
- **State**: `reservePoints: number` added to `Home` component state.
- **Round Data**: Update `Round` interface to include `taker: 'team1' | 'team2'` and `isLitige: boolean`.
- **Logic**: In `handleRoundSubmit`, if `score1 === score2`:
    - Award points to defender immediately.
    - Add taker's points to `reservePoints`.
- If `score1 !== score2`:
    - Award points as usual.
    - Award ALL `reservePoints` to the winner of this round.
    - Reset `reservePoints` to 0.

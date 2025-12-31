# Spec Requirements: End Game Tie Handling

## Initial Description
Sometimes a game should continue, even if a team has over 1000 points. This happens when
- both teams have the same score or,
- the last round ends with a litige
In the first case, an extra round must decide which teams wins. However no score will be added, both teams end with the same score.
I the second case, an extra round must decide to what team the reserve points should go. The points of the extra game must not be added to the score.

## Requirements Discussion

### First Round Questions

**Q1:** Tie-Breaker Logic: Does the target score matter for this tie-breaker? Or only when *both* are >= 1000 and equal?
**Answer:** Assumption Correct (Only when >= 1000).

**Q2:** Litige at End Game Logic: Does this "no score added" rule apply to *any* litige resolution at the end of the game?
**Answer:** Assumption Correct.

**Q3:** Winning Condition with Litige: This implies that *any* litige prevents the game from ending, even if one team is way ahead. Is that correct?
**Answer:** Assumption Correct.

**Q4:** Displaying the "Extra Round": How should this round appear in the `GameHistory` list?
**Answer:** The extra round will show in the history and only the reserve points will be counted.

**Q5:** Allocating Reserve Points (Litige Case): Do these reserve points get added to their *Total Score*?
**Answer:** Reserve points are added, round points are ignored.

### Existing Code to Reference
- `src/app/page.tsx`: Main game loop and score calculation.

### Follow-up Questions

**Follow-up 1:** Litige "Reserve Points" Calculation Example clarification.
**Answer:** Example: Team A has 990, Team B 950, Team A plays and litige happens. then team B gets 81 points and 81 points are in reserve. an extra round must decide what team gets the 81 points from the reserve.

**Follow-up 2:** Displaying "Round Points Ignored": Users still enter raw points, but we display only reserve points in history and add only reserve points to total?
**Answer:** OK.

**Follow-up 3:** (Bug Report) Litige Resolution Triggering: 
**Issue:** If scores are 948-870 and a litige happens (81-81, T1 preneur), T2 reaches 951 but T1 stays at 948 with 81 in reserve. Since T1 *would have* reached 1029, the next round MUST be a resolution round where trick points (e.g. 112-50) are ignored and only the 81 reserve is awarded.
**Result:** Final score should be 1029-951, not 1141-1001.

## Visual Assets
No visual assets provided.

## Requirements Summary

### Functional Requirements
- **End Game Condition Check**:
    - Game does NOT end if:
        - Scores are TIED and >= Target Score (e.g. 1000).
        - The round that *would* have ended the game resulted in a LITIGE (points reserved).
- **Tie-Breaker Round (Equal Scores >= 1000)**:
    - Users play an extra round.
    - Input: Standard round points.
    - Logic: Determine winner of the round.
    - Outcome:
        - The winner of the round wins the game.
        - **Points from this round are IGNORED** (not added to Total Score).
        - **History Display**: Should likely show 0-0 or some indicator that points didn't count, but simply decided the winner. (User said "no score added, both teams end with same score").
- **Litige Resolution Round (Game Ending Litige)**:
    - Scenario: A round pushes scores such that game *could* end, but a litige occurred (points in reserve).
    - Action: Force an extra round.
    - Input: Standard round points.
    - Logic: Determine winner of the round to award the *pending reserve points*.
    - Outcome:
        - Winner gets the **Reserve Points** added to their Total Score.
        - **Points from this current round are IGNORED** (not added to Total Score).
        - **History Display**: Shows `[ReserveAmount]` for the winner, `0` for loser (and 0 for round points).

### Reusability Opportunities
- `src/app/page.tsx`: Update `handleRoundSubmit` and `gameStatus` logic.
- Reuse `GameHistory` component, might need slight tweak to show "0" or special styling for these resolution rounds.

### Scope Boundaries
**In Scope:**
- Logic to prevent "Game Over" if tied >= 1000 or active litige.
- Logic for "Extra Round" where round points are ignored.
- Logic to award *only* reserve points in the litige resolution scenario.

**Out of Scope:**
- Visual overhaul of the history (just minimal data changes).
- Changing the standard input form.

### Technical Considerations
- Need to track a "Game Ending Resolution" state.
- Distinct from normal rounds because points are treated differently.
- Be careful with the "Reserve" logic: standard litige logic adds reserve to the *next* round. Here, we must ensure the *next* round points themselves are discarded, but the reserve is kept/awarded.

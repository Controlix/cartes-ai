# Specification: Belot Score Handling

## Goal
Add functionality to declare "Belot-Rebelote" (20 points) during round score entry, ensuring it is correctly factored into score calculations, game logic (win/litige/dedans checks), and visually represented in the game history.

## User Stories
- As a player, I want to be able to select which team declared "Belot" when entering the round score, so that the extra 20 points are recorded.
- As a player, I want the "Belot" option to be exclusive (only one team can have it per round) but editable, so that I can correct mistakes before submitting.
- As a player, I want the game logic to automatically adjust the winning threshold (92 instead of 82) when Belot is involved, so that "Dedans" and "Litige" are calculated correctly.
- As a player, I want to see a visual indicator (like a King+Queen icon) in the game history next to the score of the team that had the Belot, so I can verify the score details.

## Specific Requirements

**Round Input Form Updates**
- Add a "Belot" selection mechanism (e.g., Checkbox or Radio button toggle) to `RoundInputForm` for both teams.
- Ensure mutually exclusive selection: selecting Team 1's Belot deselects Team 2's, and vice versa. Allow deselecting both.
- Keep the existing score validation logic (card points must sum to 162) independent of the Belot selection.
- Pass the selected `belotTeam` ('team1' | 'team2' | null) to the `onSubmit` handler.

**Data Model Updates**
- Update `RoundInput` interface in `src/logic/types.ts` to include optional `belotTeam`.
- Update `Round` interface in `src/types/Round.ts` to include optional `belotTeam`.

**Game Logic Updates (StandardRoundStrategy)**
- Update `StandardRoundStrategy` in `src/logic/strategies.ts` to handle `belotTeam`.
- Add 20 points to the `belotTeam`'s total score for the round.
- Update `Litige` logic: With Belot, total points = 182. Litige happens if score difference is 0 (both have 91).
- Update `Dedans` logic: Taker fails if their total score (including Belot if applicable) is < 91.
- Update `Win` logic: Taker wins if their total score (including Belot if applicable) is > 91.

**Game History Visualization**
- Update `GameHistory` component to display a visual indicator (e.g., `Crown` icon from `lucide-react`) next to the score of the team with Belot.
- Ensure the displayed score in history includes the Belot points.

## Visual Design

**No visual assets provided**
- Use existing `lucide-react` library for icons.
- Use `Crown` icon or similar to represent "Belot" (King + Queen).
- Align new input controls with existing Tailwind CSS styling in `RoundInputForm`.

## Existing Code to Leverage

**`src/components/RoundInputForm.tsx`**
- Reuse the existing form layout and state management.
- Add the new Belot toggle below or near the score inputs, matching the current design language (using `useState` for local state).

**`src/logic/strategies.ts`**
- Extend `StandardRoundStrategy.process` to accept the new `belotTeam` input.
- Reuse the existing structure for determining `isLitige`, `isDedans`, etc., but adjust the thresholds based on whether Belot is present (Total 182 vs 162).

**`src/components/GameHistory.tsx`**
- Reuse the existing list rendering logic.
- Add the Belot icon conditionally based on the `round.belotTeam` property.

## Out of Scope
- Adding support for other announcements (Tierce, Carre, etc.).
- Changing the persistence mechanism (LocalStorage updates happen automatically via existing hooks).
- "Surcoin" or other advanced Belot variants.

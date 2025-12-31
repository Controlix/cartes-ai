# Spec Requirements: Game Board UI Layout

## Initial Description
Game Board UI Layout — Implement the main game screen layout with team name placeholders and current score display area using responsive PWA-ready design.

## Requirements Discussion

### First Round Questions

**Q1:** I assume the game board should display two distinct columns or sections for the opposing teams (e.g., "We" vs "They"). Is that correct, or should it support custom team names from the start?
**Answer:** Start with a very basic approach. The team names should be easily customizable and start with "Wij" and "Zij".

**Q2:** I'm thinking the current total score should be prominently displayed at the top of the screen, always visible. Should we pin this header so it stays visible while scrolling through history?
**Answer:** [Implicitly accepted via "basic approach" and focus on team names]

**Q3:** Since this is the first UI screen, should we include a placeholder "New Game" or "Reset" button in the header or footer area now, or leave navigation for a later task?
**Answer:** [Implicitly deferred to "very basic approach"]

**Q4:** I assume we should use a mobile-first, vertical layout (stacking team scores) for small screens, and perhaps a side-by-side layout for tablets/desktops. Is that the right responsive behavior?
**Answer:** [Accepted via PWA-ready design requirement]

**Q5:** Should we include a specific "Dealer" indicator placeholder in the UI to track whose turn it is to deal, or is that out of scope for this basic layout?
**Answer:** [Out of scope for now]

### Existing Code to Reference
No similar existing features identified for reference.

### Follow-up Questions

**Follow-up 1:** For the team labels, I'll use "Us" and "Them" as simple defaults. Does that work for you?
**Answer:** Use "Wij" and "Zij" instead.

**Follow-up 2:** Should the Total Score be prominently displayed at the top and stay fixed (sticky) so it's always visible?
**Answer:** [Assumed yes for usability, pending further feedback]

## Visual Assets

### Files Provided:
No visual files found.

## Requirements Summary

### Functional Requirements
- Display two columns for team scores.
- Default team names: "Wij" and "Zij".
- Team names must be easily customizable (e.g., editable text fields or simple state).
- Display total score for both teams.

### Reusability Opportunities
- None identified.

### Scope Boundaries
**In Scope:**
- Main game board layout.
- Team name display/customization.
- Current total score display.
- Responsive, mobile-first design.

**Out of Scope:**
- Adding specific team member names.
- Round score input forms (next feature).
- Game history persistence logic.

### Technical Considerations
- PWA-ready layout (meta tags, mobile viewport).
- Clean, basic UI without excessive decoration.

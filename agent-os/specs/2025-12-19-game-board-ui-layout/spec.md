# Specification: Game Board UI Layout

## Goal
Implement the core visual layout for the Belot game board, providing a responsive, mobile-first interface that displays team names ("Wij" and "Zij") and their total scores.

## User Stories
- As a casual player, I want to see clearly distinguished areas for my team and the opposing team so I know who is winning.
- As a user, I want to be able to edit the default team names "Wij" and "Zij" to something custom if desired.
- As a mobile user, I want the total scores to be always visible at the top of the screen while I scroll through future game history.

## Specific Requirements

**PWA-Ready Scaffold**
- Initialize a Next.js page structure suitable for a PWA (meta tags for viewport, minimal chrome).
- Ensure the layout is responsive: single-column vertical stack for mobile, potential two-column layout for wider screens (tablet/desktop).
- Use Tailwind CSS for utility-first styling.

**Sticky Score Header**
- Create a fixed/sticky header bar at the top of the viewport.
- Display the current total score for both teams in this header.
- Ensure high contrast and large typography for readability.

**Team Columns/Sections**
- Create two distinct visual sections, one for each team.
- Default the left/top section to "Wij" and the right/bottom to "Zij".
- Use semantic HTML (e.g., `<section>`, `<h1>`, `<h2>`).

**Editable Team Names**
- Implement the team names as editable text inputs or click-to-edit labels.
- Initialize with "Wij" and "Zij" as default values.
- Persist the changes locally in component state for this version (persistence to storage is a future task, but structure state for it).

**Visual Separation**
- Use color or spacing to clearly separate the two teams' areas.
- Ensure the design is clean and minimal, focusing on the data (scores).

## Visual Design
No specific visual assets provided.
- Follow standard Material Design or system UI principles for cleanliness.
- Focus on large, touch-friendly touch targets (though interactivity is minimal in this step).

## Existing Code to Leverage
No existing application code identified (greenfield feature).
- Leverage standard Next.js project structure (pages/app directory).
- Use `tailwind.config.js` for consistent spacing and colors if already present.

## Out of Scope
- Round score input forms (entering new points).
- Persisting game history or team names to LocalStorage (state only for now).
- Adding specific individual player names.
- "New Game" or "Reset" functionality.
- Dealer indicator logic.

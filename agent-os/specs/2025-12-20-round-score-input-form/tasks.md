# Task Breakdown: Round Score Input Form

## Overview
Total Tasks: 13

## Task List

### Frontend Components

#### Task Group 1: Round Input Form Logic & Validation
**Dependencies:** None

- [x] 1.0 Implement Input Validation & Logic
  - [x] 1.1 Write 2-6 focused tests for validation logic
    - Test correct sums (162, 252) pass
    - Test incorrect sums fail
    - Test negative numbers fail
  - [x] 1.2 Create `RoundInputForm` structure
    - State management for `team1Input` and `team2Input`
    - Props: `onSubmit(s1, s2)`
  - [x] 1.3 Implement validation helper
    - Check if `sum == 162` OR `sum == 252`
    - Check if inputs are non-negative
  - [x] 1.4 Implement submit handler
    - Prevent default behavior
    - Call `onSubmit` only if valid
    - Clear inputs after submit
  - [x] 1.5 Ensure logic tests pass
    - Run only the 2-6 tests from 1.1

**Acceptance Criteria:**
- Component validates inputs correctly (162 or 252 sum required)
- Submit only fires on valid data
- Inputs clear on successful submit

#### Task Group 2: UI Implementation & Styling
**Dependencies:** Task Group 1

- [x] 2.0 Build UI & Responsiveness
  - [x] 2.1 Write 2-4 focused tests for rendering
    - Test inputs render with correct types
    - Test error message appears on invalid state
  - [x] 2.2 Implement Input Fields UI
    - Align with parent layout (flex/grid)
    - Use `type="number"` and `pattern="\d*"`
    - Style consistent with `EditableName` or `TeamSection`
  - [x] 2.3 Add Validation Feedback
    - Show error text (e.g., "Total must be 162 or 252") when invalid
    - Visual cues (red border/text)
  - [x] 2.4 Add Submit Button
    - Standard button styling (blue/primary)
    - Disabled state styling (optional, or just error feedback)
  - [x] 2.5 Ensure UI tests pass
    - Run only the 2-4 tests from 2.1

**Acceptance Criteria:**
- Inputs are visually aligned with team columns
- Error messages are clear and visible
- Mobile keyboard triggers numeric entry

#### Task Group 3: Integration
**Dependencies:** Task Groups 1 & 2

- [x] 3.0 Integrate with Main Game Board
  - [x] 3.1 Write 2-4 focused integration tests
    - Test filling form updates parent state (mocked)
    - Test form placement in `Home` page
  - [x] 3.2 Update `Home` page (`src/app/page.tsx`)
    - Add `RoundInputForm` below `TeamSection`s
    - Create handler to receive new scores (just logging or basic state update for now)
  - [x] 3.3 Ensure integration tests pass
    - Run only the tests from 3.1

**Acceptance Criteria:**
- Form appears correctly on the main page
- Submitting a round updates the console or temporary state
- Layout remains broken/responsive

### Testing

#### Task Group 4: Verification
**Dependencies:** Task Groups 1-3

- [x] 4.0 Verify Feature Completeness
  - [x] 4.1 Review tests from Groups 1-3
    - Verify coverage of validation edge cases (e.g., 0 + 162, 252 + 0)
  - [x] 4.2 Add end-to-end integration test
    - Simulate entering a valid round
    - Verify form clears
    - Simulate entering invalid round
    - Verify error shown
  - [x] 4.3 Run all feature tests
    - Run tests for `RoundInputForm` and `Home` integration

**Acceptance Criteria:**
- All new tests pass
- Manual verification (if possible via screenshot) confirms layout alignment

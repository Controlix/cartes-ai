# Product Roadmap

1. [x] Game Board UI Layout — Implement the main game screen layout with team name placeholders and current score display area using responsive PWA-ready design. `S`
2. [x] Round Score Input Form — Create a form to input scores for a single round for both teams, including basic validation (e.g., non-negative numbers). `S`
3. [x] Real-time Game Calculation Logic — Implement the logic to sum round scores and update the total game score dynamically as rounds are added. `S`
4. [x] Game History Display — Show a scrollable list of past rounds and their respective scores on the main game screen. `S`
5. [x] Litige Handling — Implement automatic detection and handling of tied scores, including bid taker selection and point reserves. `S`
6. [x] Game Finalization & Winner Declaration — Add functionality to detect when a game ends (e.g., reaching a target score) or allow manual finish to display the winner. `S`
7. [ ] PWA Configuration — Configure manifest.json and service workers to enable "Add to Home Screen" functionality and offline capabilities for iOS and Android. `XS`

> Notes
> - Order items by technical dependencies and product architecture
> - Each item should represent an end-to-end (frontend + backend) functional and testable feature

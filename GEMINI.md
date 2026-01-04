# UI Architecture Guidelines

When generating UI code for this project, follow a **Smart / Dumb Component** (Container / Presentational) architecture.

## Core Principle
Separate **business logic and state management** from **UI rendering**.

- **Smart components** handle logic and data.
- **Dumb components** handle presentation only.

---

## Dumb Components (Presentational)

Use dumb components by default.

**Rules**
- Receive all data via props
- Receive all callbacks via props
- Do NOT fetch data
- Do NOT manage application state
- Avoid side effects
- No direct dependency on global stores, APIs, or routing

**Allowed**
- Minimal local UI state (e.g. open/closed, hover)
- Styling and layout
- Rendering lists and formatting data

**Example**
```tsx
function UserCard({ name, email, onSelect }) {
  return (
    <div onClick={onSelect}>
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}
```
---

## Smart Components (Container)

Smart components coordinate behavior.

**Responsibilities**
- Fetch data
- Manage state
- Handle business logic
- Connect to stores, APIs, or routing
- Pass data and callbacks to dumb components

**Rules**
- Do not contain complex JSX or styling
- Delegate all UI rendering to dumb components

**Example**
```tsx
function UserCardContainer() {
  const user = useUser();

  return (
    <UserCard
      name={user.name}
      email={user.email}
      onSelect={() => selectUser(user.id)}
    />
  );
}
```
---

## File & Naming Conventions

- Dumb components:
  - `ComponentName.tsx`
  - `ComponentNameView.tsx`
- Smart components:
  - `ComponentNameContainer.tsx`
  - `ComponentNameLogic.tsx`

Example:
```
UserCard.tsx
UserCardContainer.tsx
```

---

## Composition Rules

- Smart components may import dumb components
- Dumb components must NOT import smart components
- Pages/screens should be smart components
- Reusable UI elements should always be dumb components

---

## Testing Expectations

- Dumb components: snapshot and visual tests
- Smart components: logic and behavior tests
- Avoid testing business logic inside dumb components

---

## Default Instruction to Gemini

When unsure:
1. Create a dumb component first
2. Extract logic into a smart component
3. Keep JSX simple in smart components
4. Keep dumb components reusable and stateless

> Prefer more small dumb components over fewer large smart components.

---

## SOLID Principles

All generated code should follow the SOLID principles. 

- Components must have a **Single Responsibility**, focusing on one clear purpose (presentation or logic, but not both).
- The system should be **Open for extension but closed for modification**, favoring composition and configuration over rewriting existing components.
- Code should respect **Liskov Substitution**, ensuring components can be replaced with compatible alternatives without breaking behavior.
- Interfaces and props should follow **Interface Segregation**, exposing only what a component actually needs rather than large, generic contracts.
- Finally, **Dependency Inversion** should be applied by depending on abstractions (props, hooks, services) instead of concrete implementations, allowing UI logic, data sources, and frameworks to be swapped with minimal impact.



# System Patterns

## Architecture Overview
```mermaid
flowchart TD
    Rails[Rails Backend] --> Inertia[Inertia.js]
    Inertia --> React[React Components]
    React --> TW[TailwindCSS]
```

## Design Patterns
1. SOLID Principles Implementation
   - Single Responsibility Principle
   - Open/Closed Principle
   - Liskov Substitution Principle
   - Interface Segregation Principle
   - Dependency Inversion Principle

2. Rails Patterns
   - MVC Architecture
   - Service Objects
   - Form Objects
   - Query Objects
   - Presenters
   - Decorators

3. React Patterns
   - Component-Based Architecture
   - Props and State Management
   - Hooks Usage
   - Component Composition

## Component Relationships
- Rails controllers handle data and business logic
- Inertia.js manages server-client communication
- React components handle UI rendering
- TailwindCSS provides styling utilities

## Code Organization
```mermaid
flowchart TD
    App[app/] --> Controllers[controllers/]
    App --> Models[models/]
    App --> Views[views/]
    App --> Services[services/]
    App --> Components[components/]
    Components --> React[React Components]
``` 
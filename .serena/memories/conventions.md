# Conventions

- TypeScript is strict; use the `@/* -> ./src/*` path alias for cross-area imports.
- Existing TS/TSX style uses 2-space indentation, double quotes, semicolons, named components, and explicit domain/view-model types.
- Keep reads in Server Components, interaction state in narrowly scoped Client Components, and database writes in Server Actions.
- Mark Client Components with `"use client"`; do not pass Prisma records or `Date` objects directly to them. Build serializable view models.
- Validate action input with Zod before database access. Scope reads/mutations by current `userId`; never update a habit by `habitId` alone.
- Keep authentication fallback access behind `getCurrentUserId()` so future session integration has one replacement point.
- Normalize date-only persistence and comparisons through helpers in `src/lib/habit-stats.ts` to avoid timezone day shifts.
- Extract only meaningful pure business logic; current examples are validation and streak/progress calculations.
- Unit tests are `src/lib/*.test.ts` and use `node:test` plus strict assertions.
- UI follows the existing terminal/RPG visual language, Tailwind utilities, and CSS custom properties; preserve it rather than introducing a separate design system.
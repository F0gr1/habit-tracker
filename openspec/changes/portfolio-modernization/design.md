# Design

## UI Direction

Keep the existing terminal/RPG theme because it gives the app a distinctive portfolio identity. The landing page explains the product, stack, and value before sending users to `/habits`. The dashboard uses responsive grid sections so the same hierarchy works on mobile and desktop.

## Data Flow

`/habits` remains a Server Component that reads habits and recent logs from Prisma. It maps database rows into small serializable view models before passing data into Client Components. This keeps Date and Prisma-specific types away from the client boundary.

## Action Safety

Server Actions accept untrusted form values or IDs. They validate with Zod, resolve the current owner through one helper, check ownership before writes, and return typed success or error objects for the UI. The dev user fallback is intentionally centralized so future auth can replace it without changing each mutation.

## Quality Strategy

Pure validation and date/stat logic are tested with Node's built-in test runner. App-level checks are handled through `lint`, `typecheck`, `build`, and Prisma generation. Database-backed runtime behavior still requires a configured PostgreSQL instance.

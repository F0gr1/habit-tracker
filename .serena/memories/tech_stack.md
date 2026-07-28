# Tech Stack

- Node.js `>=20.9.0`; npm `>=10.0.0`; package metadata pins `npm@11.13.0`.
- Next.js `16.2.10` App Router, React/React DOM `19.2.4`, TypeScript 5 in strict mode.
- Tailwind CSS 4 through `@tailwindcss/postcss`; ESLint 9 with Next core-web-vitals and TypeScript presets.
- Prisma/Prisma Client `7.8.0` with PostgreSQL; local DB via Docker Compose.
- Zod 4 for input validation.
- Unit tests use Node's built-in test runner through `tsx`.
- Installed but intentionally not integrated yet: NextAuth/Auth Prisma adapter, tRPC, TanStack Query, SuperJSON, Zustand.
- Before changing Next.js APIs or conventions, read the relevant guide under `node_modules/next/dist/docs/`; project `AGENTS.md` warns this version differs from prior Next.js behavior.
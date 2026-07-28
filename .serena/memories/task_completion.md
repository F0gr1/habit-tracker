# Task Completion

Run from the project root, in this order when practical:

1. `npm run lint`
2. `npm run typecheck`
3. `npm run test`
4. `npm run build`

- A complete pass means ESLint has no errors, TypeScript emits no diagnostics, all Node tests pass, and Next.js production build succeeds.
- If dependencies changed, run `npm install` first and verify `package-lock.json` did not acquire unintended changes.
- Database-backed browser checks require a valid `DATABASE_URL`, PostgreSQL (`docker compose up -d`), generated Prisma Client, and an applied schema.
- After schema changes, run `npm run prisma:generate` plus either `npm run prisma:push` for local iteration or `npm run prisma:migrate` when migration history is required.
- Do not treat the known multiple-lockfile workspace-root warning from Next build as a test failure, but report it if still present.
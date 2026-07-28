# Habit Tracker

- Next.js App Router project under `src/app`.
- `/` is the portfolio landing page; `/habits` is a dynamic Server Component dashboard.
- Dashboard data path: Prisma query in `src/app/habits/page.tsx` -> serializable `HabitCardData` view model -> Client Components in `src/app/habits/_components`.
- Mutation path: Client Components/forms -> Server Actions in `src/app/habits/_actions/habit-actions.ts` -> Zod validation -> owner-scoped Prisma writes -> route refresh/revalidation.
- Ownership model: `User -> Habit -> HabitLog`; authentication is not implemented yet, so `src/lib/current-user.ts` centralizes the `dev-user` fallback.
- Pure domain logic belongs in `src/lib/habit-stats.ts` and `src/lib/habit-validation.ts`, with colocated `*.test.ts` tests.
- Stack and pinned versions: `mem:tech_stack`.
- Common setup/development/database commands: `mem:suggested_commands`.
- Project-specific implementation conventions: `mem:conventions`.
- Required quality gates before completion: `mem:task_completion`.
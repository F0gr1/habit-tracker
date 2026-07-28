# Suggested Commands

- Install dependencies: `npm install`.
- Create local environment: PowerShell `Copy-Item .env.example .env`; documented Unix equivalent `cp .env.example .env`.
- Start PostgreSQL: `docker compose up -d`.
- Generate Prisma Client: `npm run prisma:generate`.
- Apply schema directly in local development: `npm run prisma:push`.
- Create a development migration: `npm run prisma:migrate`.
- Deploy existing migrations: `npm run prisma:deploy`.
- Browse data: `npm run prisma:studio`.
- Start development server: `npm run dev`; app at `http://localhost:3000`, dashboard at `/habits`.
- Production build/start: `npm run build`, then `npm run start`.
- Quality commands: `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`.
- Collaboration shell is Windows PowerShell 5.1: quote paths containing spaces and use separate commands or `cmd1; if ($?) { cmd2 }` instead of `&&`.
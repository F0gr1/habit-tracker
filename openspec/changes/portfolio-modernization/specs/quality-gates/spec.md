## ADDED Requirements

### Requirement: Repeatable Local Setup

The repository SHALL document the required package manager, Node runtime, environment variables, and Prisma commands.

#### Scenario: Engineer sets up the project locally

Given the engineer has cloned the repository
When they read the README and `.env.example`
Then they can install dependencies, configure `DATABASE_URL`, generate Prisma Client, and start the app

### Requirement: Automated Quality Checks

The repository SHALL expose scripts for linting, type checking, testing, building, and Prisma workflows.

#### Scenario: Engineer verifies a change

Given dependencies are installed
When the engineer runs the documented quality commands
Then linting, type checking, tests, build, and Prisma generation can be run from npm scripts

### Requirement: Future Scope Transparency

The repository SHALL document installed dependencies that are intentionally not implemented yet.

#### Scenario: Reviewer evaluates architecture claims

Given tRPC, React Query, Zustand, or NextAuth dependencies exist
When the reviewer reads the README
Then the README identifies those dependencies as future scope unless they are implemented

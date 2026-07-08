## ADDED Requirements

### Requirement: Validated Habit Creation

Habit creation SHALL validate submitted fields before writing to the database.

#### Scenario: User submits a blank habit name

Given the add habit form is visible
When the user submits a blank habit name
Then the action returns a validation error
And no habit is created

### Requirement: Safe Completion Toggle

Habit completion toggles SHALL validate the habit id and return clear success or error states.

#### Scenario: User toggles a valid habit

Given a habit belongs to the current owner
When the user toggles today's completion state
Then the action creates today's log if none exists
Or deletes today's log if it already exists
And the dashboard path is revalidated

#### Scenario: User toggles an invalid habit id

Given a malformed or empty habit id
When the toggle action runs
Then the action returns a validation error
And no database write is attempted

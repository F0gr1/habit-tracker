## ADDED Requirements

### Requirement: Owner-Scoped Reads

Habit reads SHALL only include habits and logs owned by the current user context.

#### Scenario: Dashboard loads with dev user fallback

Given authentication is not yet implemented
When `/habits` loads
Then the app uses the centralized dev user id
And queries habits and logs through that owner scope

### Requirement: Owner-Scoped Writes

Habit writes SHALL verify ownership before mutating habit logs.

#### Scenario: Current user toggles another user's habit

Given a habit id exists but does not belong to the current owner
When the toggle action runs
Then the action returns an ownership error
And no habit log is created or deleted

## ADDED Requirements

### Requirement: Product Landing Page

The app SHALL provide a real landing page that communicates the habit tracker's value, technical stack, and path to the dashboard.

#### Scenario: Visitor opens the root route

Given a visitor navigates to `/`
When the page renders
Then the page explains the app value instead of showing create-next-app starter content
And the page links to `/habits`

### Requirement: Responsive Habit Dashboard

The habit dashboard SHALL present habits in a layout that remains usable on mobile and desktop.

#### Scenario: User views habits on a narrow screen

Given the user opens `/habits` on a mobile viewport
When the dashboard renders
Then the daily and weekly sections stack vertically
And form controls remain tappable without horizontal scrolling

### Requirement: Empty Habit State

The habit dashboard SHALL guide users when no habits exist.

#### Scenario: User has no habits

Given the current owner has no habits
When the dashboard renders
Then the app shows a clear empty state
And the empty state directs the user to add a first habit

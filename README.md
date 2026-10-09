# Expand Testing - Playwright

Playwright + TypeScript project for practicing UI and API test automation on [Expand Testing](https://practice.expandtesting.com/).

## Structure

- `api/clients` - API clients
- `api/factories` - test data factories
- `api/models` - request and response types
- `constants` - shared constants and API endpoints
- `data` - test data
- `fixtures` - custom Playwright fixtures
- `pages` - Page Object Models
- `tests/api` - API tests
- `tests/ui` - UI tests

## Tests

The project contains:

- UI tests based on Page Object Model
- API tests using Playwright `APIRequestContext`
- custom fixtures for page objects and API setup
- dynamic user creation and cleanup for API tests

## Commands

Install dependencies:

`npm ci`

Run all tests:

`npm test`

Run only UI tests:

`npm run test:ui`

Run only API tests:

`npm run test:api`

Run static checks:

`npm run quality`

Format project:

`npm run format`

## Environment

Create `.env` based on `.env.example`:

`BASE_URL=https://practice.expandtesting.com`

## CI

GitHub Actions runs three jobs:

- `quality`
- `api`
- `ui`

The `quality` job runs TypeScript, ESLint and Prettier checks.

API and UI tests run in separate jobs after the quality checks pass. Chromium is installed only for UI tests.
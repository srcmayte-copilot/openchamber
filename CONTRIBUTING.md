# Contributing to OpenChamber

## Development Setup

1. Install Node.js >= 20.0.0
2. Clone the repository
3. Run `npm install`
4. Start development with `npm run dev`

## Project Structure

- `packages/server/` - NestJS backend
- `packages/pwa/` - Vue PWA frontend

## Testing

All code must have tests:

- Server: Jest for unit and integration tests
- PWA: Vitest for component tests

Run tests with:
```bash
npm test
```

## Code Style

- TypeScript for all code
- ESLint for linting
- Follow existing patterns in the codebase

## Pull Requests

1. Create a feature branch
2. Write tests for your changes
3. Ensure all tests pass
4. Update documentation if needed
5. Submit PR with clear description

## Test-Driven Development

We follow TDD:

1. Write tests first
2. Implement functionality
3. Refactor while keeping tests green

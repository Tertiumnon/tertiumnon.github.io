# tertiumnon-github-io

Vitalii Balabanov personal web site.

## Quick Start

```bash
# Install dependencies
bun install

# Development server
bun run start
# Site runs at http://localhost:4200
```

## Development Workflow

### Build

```bash
# Build Angular app
bun run build

# Build for GitHub Pages (docs/ folder)
bun run gh:pages:build

# Generate article list JSON from markdown
bun run post:list:create

# Create new article
bun run post:create
```

### Test

```bash
# Run tests once
bun test --run

# Run tests in watch mode
bun run test

# View test UI
bun run test:ui

# Generate coverage report
bun run test:coverage
```

### Code Quality

```bash
# Type check
bun run lint:ts:check

# Fix formatting
bun run lint:fix
```

### Deploy

```bash
# Build and deploy to GitHub Pages (gh-pages branch)
bun run deploy

# With version bump
bun run release:patch && bun run deploy
bun run release:minor && bun run deploy
bun run release:major && bun run deploy
```

**Note:** Deployment requires `gh-pages` branch. Configure in GitHub:
- Settings → Pages → Source: Deploy from a branch
- Branch: `gh-pages`

## Local Build System

The project uses **git hooks** for automatic checks:

- **Pre-commit**: TypeScript type checking before each commit
- **Post-merge**: Article list regeneration after pulling changes

See [DEPLOY.md](./DEPLOY.md) for full workflow documentation.

## Zoneless Angular 20 notes

This project is configured to run without Zone.js (zoneless) using `bootstrapApplication`.

- Verify at runtime: the app prints a console message saying whether Zone is present.
- If Zone is detected but you want zoneless behaviour, search for `zone.js` imports and remove them (commonly in `src/polyfills.ts` or 3rd-party libraries). If a dependency requires Zone, either add it to polyfills explicitly or replace the library.

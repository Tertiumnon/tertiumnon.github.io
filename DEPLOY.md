# Local Build & Deploy Workflow

This project builds and deploys locally instead of using GitHub Actions CI/CD.

## Architecture

- **Source**: `main` and `develop` branches (with `docs/` in `.gitignore`)
- **Built site**: `gh-pages` branch (only built files, no source code)
- **Deployment**: GitHub Pages serves from `gh-pages` branch

## Setup

Git hooks are configured automatically via `core.hooksPath = .githooks`. No setup needed.

## Development Workflow

### Before committing

Git hooks run automatically:

```bash
git add .
git commit -m "feat: add new feature"
# → Pre-commit hook runs: linting + tests
# → If checks pass, commit is created
```

**Pre-commit checks:**
- `bun run lint:ts:check` – TypeScript type checking
- `bun run test` – Test suite

### After pulling changes

Post-merge hook runs automatically:

```bash
git pull
# → Post-merge hook runs: rebuilds article list (posts.json)
# → Updates src/assets/posts.json if articles changed
```

## Deployment

### Deploy to GitHub Pages

Build and push to `gh-pages` branch:

```bash
bun run deploy
```

**What it does:**
1. Checks you're on `main` branch (requires clean working tree)
2. Builds articles → `src/assets/posts.json`
3. Builds site → `docs/` folder
4. Creates/updates `gh-pages` branch with built files
5. Pushes to GitHub
6. Returns to `main` branch

**Requirements:**
- GitHub Pages must be configured to use `gh-pages` branch
  - Go to **Settings → Pages → Branch: gh-pages**

### Deploy with releases

Combine with release script:

```bash
# Patch release with deployment
bun run release:patch && bun run deploy

# Minor release with deployment
git checkout develop
# ... make changes ...
git commit ...
git push
bun run release:minor && bun run deploy
```

Or create a combined script:

```bash
bun run release:patch && bun run deploy
```

## Git Hooks

### Pre-commit (`.githooks/pre-commit`)

Runs before every commit to prevent pushing broken code:

```bash
$ git commit
🔍 Running pre-commit checks...
  → Checking TypeScript...
  → Running tests...
✅ Pre-commit checks passed!
```

### Post-merge (`.githooks/post-merge`)

Runs after pulling changes to keep article list up-to-date:

```bash
$ git pull
📚 Updating article list...
✅ Article list updated!
```

## Troubleshooting

### Hooks not running

Check git configuration:

```bash
git config core.hooksPath
# Should output: .githooks
```

Reconfigure if needed:

```bash
git config core.hooksPath .githooks
```

### Deploy fails with "must be on main branch"

```bash
git checkout main
bun run deploy
```

### Deploy fails with uncommitted changes

```bash
git status  # Check what changed
git add .
git commit -m "your message"
bun run deploy
```

### Want to skip pre-commit checks

⚠️ Not recommended, but possible:

```bash
git commit --no-verify
```

## Local vs Remote

| Step | Local | Remote |
|------|-------|--------|
| Lint/Test | Pre-commit hook | ❌ Not run |
| Build articles | Manual + post-merge hook | ❌ Not run |
| Build site | `bun run deploy` | ❌ Not run |
| Deploy | `bun run deploy` (to gh-pages) | ❌ Not run |
| GitHub Pages | Serves `gh-pages` branch | — |

## Scripts Reference

```bash
# Development
bun run start              # Start dev server
bun run test              # Run tests
bun run test:ui           # Test UI
bun run lint:fix          # Fix linting issues

# Building
bun run build             # Build Angular app
bun run build:gh          # Build to docs/ folder
bun run post:list:create  # Generate posts.json

# Deployment
bun run deploy            # Build + push to gh-pages

# Releasing
bun run release:patch     # Patch release
bun run release:minor     # Minor release
bun run release:major     # Major release
```

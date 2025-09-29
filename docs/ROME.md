This project switched from Biome to Rome.

Quick notes:

- Scripts:
  - `npm run lint:fix` now runs Rome formatter and checker (via `bunx rome` if not installed globally).

Install options:

- Use bunx (no install):
  - `bunx rome check src` and `bunx rome format --write src`

- Install locally (recommended for CI):
  - `npm install --save-dev rome`
  - Then run `bunx rome check src` or `bunx rome format --write src` (bunx will use local install)

Notes & gotchas:

- Rome parses JSON strictly and doesn't accept comments. The repo includes some JSON files with comments (Angular tsconfig files and VSCode launch.json). Those files are excluded via `.romeignore` to avoid parse errors.
- Some large build files (e.g., `vendor.js`) are also excluded.
- The old `biome.json` was removed and a minimal `rome.json` was added enabling formatter and linter. Adjust `rome.json` if you want project-specific rules.

If you want me to add Rome as a devDependency and pin a specific version in `package.json`, tell me which version to pin and I will update it and run a local install.

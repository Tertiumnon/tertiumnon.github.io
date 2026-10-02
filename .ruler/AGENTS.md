# AGENTS.md

- Use Bun instead of Node.
- Use Angular v20 best coding practices.
- Export only constants (enums, const arrays, config objects) in `{name}.constants.ts` files. Examples: `theme.constants.ts`, `quotation.constants.ts`, `app.routes.constants.ts`.
- Export pure utility/helper functions in `{name}.utils.ts` files. Examples: `time.utils.ts`, `project-control-panel.utils.ts`.
- Never mix constants, utils, and component/service logic in the same file. Split them into separate files.
- Constants and utils must be standalone — no Angular decorators, no component classes, no Injectable services.

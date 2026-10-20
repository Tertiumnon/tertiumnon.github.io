# Halloween YouTube Theme

Halloween theme for YouTube as a Firefox extension.

![Player window](https://raw.githubusercontent.com/Tertiumnon/halloween-youtube-theme-ext/HEAD/docs/screenshots/01-player-window.png)
![Search window](https://raw.githubusercontent.com/Tertiumnon/halloween-youtube-theme-ext/HEAD/docs/screenshots/02-search-window.png)
![Description and comments window](https://raw.githubusercontent.com/Tertiumnon/halloween-youtube-theme-ext/HEAD/docs/screenshots/03-description-and-comments-window.png)

## Install

Requires [Bun](https://bun.sh) and Firefox 142 or later.

```sh
bun install
bun run build
```

`build` compiles `src/content.ts` into `build/content.js`, which the manifest loads, and writes the packaged extension to `dist/`. Run it once after a fresh clone: `lint` also checks the built files.

## Development

- `bun run dev` builds and opens Firefox with the extension loaded on YouTube.
- `bun run lint` runs Biome and `web-ext lint`. `bun run fix` applies Biome's fixes.
- `bun run typecheck` runs the TypeScript compiler.
- `bun run test` runs the unit tests.

Pre-commit runs lint, typecheck and tests (`.githooks/pre-commit`).

## Usage

Open YouTube. The theme adds a pumpkin progress scrubber, pumpkins, a flying witch, a skeleton, drifting ghosts and a night-sky background. Comment avatars are swapped for random Halloween faces: a pumpkin, a ghost, a skeleton, a witch, a zombie or a vampire.

## Changelog

See [CHANGELOG.md](https://github.com/Tertiumnon/halloween-youtube-theme-ext/blob/HEAD/CHANGELOG.md).

## License

[MIT](https://github.com/Tertiumnon/halloween-youtube-theme-ext/blob/HEAD/LICENSE)

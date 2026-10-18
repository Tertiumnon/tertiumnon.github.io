# Project Structure Convention

Where files go in a Tertium project, and what its GitHub repository contains.

The rules build on [Standard Readme](https://github.com/RichardLitt/standard-readme) for the README, [Keep a Changelog](https://keepachangelog.com/) for the changelog, and GitHub's [community health files](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file).

## Root

The root holds only these files:

- `README.md`: what the project is and how to use it.
- `CHANGELOG.md`: version history.
- `LICENSE`: required.

The default branch is `main`.
- `.gitignore`.
- The project manifest, for example `package.json`.

Everything else goes into a folder.

## Folders

| Path | Contents |
| --- | --- |
| `src/` | Source code. |
| `tests/` | Automated tests. |
| `docs/` | Long-form documentation and guides. |
| `docs/screenshots/` | Application screenshots used by the README. |
| `assets/` | Logo and other static images. |
| `stickers/` | Sticker pack images (sticker packs only). |
| `.github/` | Community health files: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `ISSUE_TEMPLATE/`, `PULL_REQUEST_TEMPLATE.md`. |

## README

Sections, in this order:

1. **Title**: a level-1 heading with the project name. The Tertium site shows this heading as the project title.
2. **Description**: one line, the same text as the GitHub repository description.
3. **Screenshots**: images from `docs/screenshots/`, with relative paths.
4. **Install**.
5. **Usage**.
6. **Changelog**: a link to `CHANGELOG.md`.
7. **License**.

## Changelog

- Use the [Keep a Changelog](https://keepachangelog.com/) format, newest release first.
- Keep pending changes under `## [Unreleased]`.
- Each release gets a `## X.Y.Z` section, with its tag `vX.Y.Z`. The tag's commit date is the release date.
- Section headings: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`.
- Write the entry with `gith changelog` from [@tertium/gith](https://www.npmjs.com/package/@tertium/gith). It adds the entry for the version in `package.json` as its own commit, `docs(changelog): <version>`.

## Versions and release notes

- Use [Semantic Versioning](https://semver.org/). Pre-releases such as `-rc.1` are not shown as the latest version.
- Releases are made with `gith release --patch`, `--minor` or `--major` from [@tertium/gith](https://www.npmjs.com/package/@tertium/gith). It bumps the version, creates the `vX.Y.Z` tag and merges through `main`.
- Patches are small commits on `main`.
- Each tag has a GitHub Release. Its body is the matching changelog section.
- Attach build artifacts (`.exe`, `.vsix`, `.xpi`, `.zip`, and so on) to the Release.

### npm scripts

Projects with a `package.json` expose the same commands:

```json
{
  "scripts": {
    "changelog": "npx @tertium/gith changelog",
    "release:patch": "npx @tertium/gith release --patch",
    "release:minor": "npx @tertium/gith release --minor",
    "release:major": "npx @tertium/gith release --major"
  }
}
```

## Logo and screenshots

- **Logo**: `assets/logo.svg` or `assets/logo.png`. Square, at least 512 by 512 pixels.
- **Sticker packs** (a `stickers/` folder) have no separate logo. When `assets/logo.*` is absent, the site uses the first image in `stickers/` as the logo.
- **Screenshots**: `docs/screenshots/NN-short-name.png`, numbered in display order, at most 1280 pixels wide.
- **Social preview**: 1280 by 640 pixels, set in the repository settings on GitHub, not stored in the repository.

## Project attributes

`project.json` at the repository root holds the attributes that GitHub does not provide. The Tertium site reads it, so nothing is typed in by hand on the site.

```json
{
  "type": "cli",
  "language": "Markdown",
  "frameworks": ["Angular"]
}
```

| Field | Required | Meaning |
| --- | --- | --- |
| `type` | yes | What the product is. One of: `cli`, `library`, `web-app`, `desktop-app`, `browser-extension`, `firefox-extension`, `vscode-extension`, `npm-package`, `telegram-sticker-pack`, `cookbook`, `guide`, `style-guide`, `conventions`, `icon-set`, `css-library`, `code-generator`, `agreement`. |
| `language` | no | Set only when GitHub's detected language is wrong, for example `Markdown` for documentation repositories. Otherwise GitHub's language is used. |
| `frameworks` | no | Frameworks the product is built with, by name, for example `Angular`, `React`, `SolidJS`, `Elysia`. |

- The language icon is taken from `assets/icons/languages/<language>.svg`, matched by the language name in lower case.
- A repository without `project.json` has no type on the site, and gets a `convention-todo` issue.

## Repository metadata

- **Description**: one sentence, up to 120 characters.
- **Topics**: used for discovery on GitHub. The project type is in `project.json`, not in topics.
- **Website**: the homepage URL, when the project has one.
- **Language**: GitHub detects it. A docs-only repository that contains some code samples marks them in `.gitattributes`, for example `*.php linguist-documentation`.

## Publishing assets

Projects that are published to a store also need the store's assets. Check the store's current rules before submitting; the values below are the ones we verified, and the rest are marked.

| Store | Asset | Requirement | Status |
| --- | --- | --- | --- |
| Microsoft Store (Windows) | Store logo | Required by the submission FAQ; the listing page calls it optional. Confirm in Partner Center. | Conflicting sources |
| Microsoft Store (Windows) | Screenshots | PNG up to 50 MB, desktop at 1366 x 768 or larger. At least 4 per device type recommended. | Verified (Microsoft Learn), count conflicts |
| Microsoft Store (Windows) | Privacy policy URL | Required when the app collects or transmits personal information | Verified |
| Mac App Store (macOS) | App icon | 1024 x 1024 pixels | Unconfirmed for 2026, check App Store Connect |
| Mac App Store (macOS) | Screenshots | Not confirmed | To verify |
| Google Play (Android) | App icon | 512 x 512, 32-bit PNG with alpha, up to 1024 KB | Verified by secondary sources |
| Google Play (Android) | Feature graphic | 1024 x 500, JPEG or 24-bit PNG without alpha | Verified (Google Help) |
| Google Play (Android) | Screenshots | JPEG or 24-bit PNG, no alpha, 320 to 3840 px, longest side at most twice the shortest. At least 2 required; counts conflict. | Partly verified |

Files for these go in `assets/store/` with the store name as the folder: `assets/store/windows/`, `assets/store/macos/`, `assets/store/android/`.

## Missing attributes

A project that does not yet have a required file or attribute gets a GitHub issue labelled `convention-todo`, titled with the missing item, for example `Add LICENSE file`. The issue is closed when the item is added.

## Names

Every project has three names:

| Name | Form | Example | Used for |
| --- | --- | --- | --- |
| Repository name | Lowercase, hyphenated, technical | `portal-commander-file-manager-community` | GitHub URL, repository folder, release tags |
| Display name | Proper name, with capitals and spaces | `Portal Commander` | README title, site title, documentation |
| Short name | One word, lowercase, optional | `hlpr` | CLI commands, mentions in text |

- The display name is the first heading of `README.md`. Scoped npm packages keep the scope in it, for example `@tertium/hlpr`.
- A CLI tool's short name is also its command name, so the command is the short name.
- Do not use a short name that is already a different project's command or package.

## Where the Tertium site reads each field

| Site field | Source |
| --- | --- |
| Display name | First heading of `README.md` |
| Description | GitHub description |
| Repository name | GitHub repository name (URLs, folders) |
| Type | First GitHub topic, ignoring `documentation` |
| Icon | Language, or `documentation` topic (Markdown icon); sticker packs use their first sticker |
| Version and date | Latest `vX.Y.Z` tag and its commit date |
| Downloads | GitHub Releases |
| Changelog | `CHANGELOG.md` |

## Support

If this project is useful to you, you can support its development on [Ko-fi](https://ko-fi.com/tertiumnon).

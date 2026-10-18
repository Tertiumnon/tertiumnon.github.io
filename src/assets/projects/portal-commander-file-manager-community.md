# Portal Commander

Portal is a fast, two-panel desktop file manager for Windows that stays out of your way. **Really free for personal use.**

Two folders side by side, a keyboard shortcut for everything, and files that open right inside the panel.

> [!WARNING]
> **Portal is in active development and has not reached its first 1.0.0 release yet.** Almost all features already work well and are used daily, but you may still run into rough edges. If something goes wrong, please [open an issue on GitHub](https://github.com/Tertiumnon/portal-commander-file-manager-community/issues/new) — every report helps make 1.0.0 better.

## Really free

Portal is free for personal use — not a trial, not "freemium":

- **No ads.**
- **No tracking or telemetry.** The app does not collect or send your usage data, files or folder names anywhere.
- **Works offline.** Fonts, icons and everything else ship with the app; it makes no network requests of its own. It only goes online when you open a network share or a link.
- **No account or sign-in.**
- **No subscriptions, paid tiers or locked features.** Everything described below is included.
- **No admin rights needed** to install it.

If Portal saves you time and you'd like to support its development, you can [buy me a coffee on Ko-fi](https://ko-fi.com/tertiumnon). It's entirely optional, and everything stays free either way.

## Why Portal

- **Fast on big folders.** File names appear first; sizes, dates and previews fill in afterwards in the background, so you can start working immediately. When something changes on disk, only the changed items are updated, not the whole list.
- **Look inside files without leaving the app.** Press Enter to view text, code, PDFs and images right in the panel, or F4 to edit text files. Russian, Chinese, Japanese and other legacy-encoded files open correctly too.
- **Works the way you already work.** Pick the keyboard layout you know: Windows Explorer, Total Commander, Far Manager, macOS or the Portal default.
- **Looks good in every theme.** Nine themes, including Dracula, Nord, Tokyo Night, GitHub and Catppuccin.

## Features

### Two panels

- Two folders side by side; Tab switches between them, and the right panel can be hidden when you need one wide view.
- Copy (F5) and move (F6) between panels, or drag files from one panel to the other.
- Copy one panel's folder to the other with Ctrl+Alt+→ / ←, or the arrows between the panels.
- Each panel has its own back/forward history, sorting, view and filter, and both panels reopen where you left them.

### Browsing

- Address bar with folder suggestions as you type: paste a path, press Enter, done. Network shares work too (`\\server\share` and `smb://server/share`).
- Four views: list, small icons, large icons and very large icons (Ctrl++ / Ctrl+-).
- Image, video, PDF and text previews in icon views.
- Instant filter for the current folder (Ctrl+F); it never touches the disk.
- Sort by name, size or date, with folders always on top if you like.
- Show or hide hidden files (Ctrl+H), system files (Ctrl+S) and dot files.
- Calculate folder sizes on demand (∑); results are cached so they come back instantly.
- Two icon packs: VS Code Great Icons and Material Icons.

### Open, view and edit files in the panel

- **Enter** shows a file read-only inside the panel instead of launching another program:
  - text, logs, configs and data (`txt`, `md`, `log`, `ini`, `json`, `yaml`, `toml`, `csv`, …)
  - scripts and source code (`py`, `ps1`, `bat`, `sh`, `js`, `ts`, `java`, `c`, `cpp`, `cs`, `go`, `rs`, `sql`, …), so a double-clicked script is shown, not run
  - PDFs and images (`pdf`, `png`, `jpg`, `gif`, `webp`, `bmp`, `svg`)

  Everything else opens in its default app. You choose the list in Settings.
- **F4** edits a text file in place:
  - line numbers, undo, and Find & Replace (Ctrl+F) that highlights every match
  - syntax highlighting for about 100 languages, plus Markdown, in your theme's colors
  - Ctrl+S saves, Esc closes, and you're asked before unsaved changes are lost
- **Every common text encoding**: UTF-8, UTF-16, and legacy Windows, DOS, KOI8, Japanese, Chinese and Korean encodings are detected automatically. Files are saved back in the same encoding, with the same line endings, so nothing is silently converted.
- Big files get a warning before opening, and binary files are never opened as text.

### Everyday file work

- Create files (Ctrl+Shift+N) and folders (F7), rename (Shift+F6 / F2) and delete to the Trash (F8 / Delete).
- After rename or delete, the selection stays where you expect it: on the renamed file, or on the next file after a delete.
- Copy and paste with Ctrl+C / Ctrl+V, including files copied in Windows Explorer.
- Copy progress shows files, bytes and the current file, including files that OneDrive is still downloading.
- If a file already exists, you're asked before it's replaced, and a failed copy never damages the original.
- Archive or extract with 7-Zip or WinRAR, if installed.
- Right-click (or Shift+F10) for a context menu with Open with…, Copy path and the Windows shell menu.

### Top bar

- Your disks with free space at a glance, and the Trash with its size.
- Favorites: pin any folder, give it a name and an icon, drag to reorder, and jump to the first ten with Ctrl+1 … Ctrl+0.

### Comfortable to use

- Every action has a shortcut, and a bottom panel shows the shortcuts for your layout.
- Clear progress for each panel, so a slow network folder never freezes the other panel.
- Folders update automatically when files change outside the app.
- Scale the whole interface from 50% to 150% and choose the font and font size.
- Windows or macOS-style window controls.
- Export and import your settings, or restore the defaults in one click. Favorites and history are kept.

## Keyboard shortcuts (default layout)

| Action | Keys |
| --- | --- |
| Open / view in panel | Enter |
| Edit text file | F4 |
| Copy to other panel | F5 |
| Move to other panel | F6 |
| New folder / new file | F7 / Ctrl+Shift+N |
| Delete to Trash | F8, Delete |
| Rename | F2, Shift+F6 |
| Copy / paste | Ctrl+C / Ctrl+V |
| Filter current folder | Ctrl+F |
| Go to address | Ctrl+L |
| Parent folder | Backspace, Alt+↑ |
| Back / forward | Alt+← / Alt+→ |
| Switch panel | Tab |
| Open favorite 1–10 | Ctrl+1 … Ctrl+0 |
| Refresh | Ctrl+R |
| Hide / show right panel | Ctrl+Shift+P |
| Context menu | Shift+F10 |

Prefer Total Commander, Far Manager, Windows Explorer or macOS keys? Switch the layout in **Settings → Interface → Shortcuts**.

## User guide

The [user guide](https://github.com/Tertiumnon/portal-commander-file-manager-community/blob/HEAD/docs/User.Guide.md) describes Portal Commander 0.3.0, the current release. Earlier versions may differ, so use their [release notes](#whats-new) for their behavior. See [documentation versioning](https://github.com/Tertiumnon/portal-commander-file-manager-community/blob/HEAD/docs/Docs.Versioning.md) for the release-snapshot policy.

## Install

Download the latest installer from [Releases](https://github.com/Tertiumnon/portal-commander-file-manager-community/releases) and run it. It installs for your user account only, so no administrator rights are needed. Settings are saved automatically.

Requires Windows 10 or 11.

<!-- release-notes -->
## What's new

- [Portal 0.3.0](https://github.com/Tertiumnon/portal-commander-file-manager-community/blob/HEAD/release-notes/0.3.0.md) · October 2026
- [Portal 0.2.0](https://github.com/Tertiumnon/portal-commander-file-manager-community/blob/HEAD/release-notes/0.2.0.md) · October 2026
- [Portal 0.1.0](https://github.com/Tertiumnon/portal-commander-file-manager-community/blob/HEAD/release-notes/0.1.0.md) · October 2026 · First preview
<!-- /release-notes -->

## Feedback

Portal is still before its 1.0.0 release, so your reports matter. Found a bug or missing a feature? [Open an issue on GitHub](https://github.com/Tertiumnon/portal-commander-file-manager-community/issues/new) and tell us what you were doing, what you expected and what happened. You can also browse [existing issues](https://github.com/Tertiumnon/portal-commander-file-manager-community/issues).

## License

Portal Commander is **free for personal use**: no ads, no tracking, no account and no paid features.

Selling, copying, redistribution or modification of the application is not permitted.

© Vitalii Balabanov

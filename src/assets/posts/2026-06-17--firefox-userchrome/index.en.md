---
publishedAt: 2026-06-17
category: Browsers
tags: ["Browser","Extensions"]
---

# Firefox userChrome.css

Custom CSS for Firefox UI elements, loaded from the user's profile folder.

## Setup

### 1. Enable userChrome.css support

Open `about:config`, search for and set to `true`:

```
toolkit.legacyUserProfileCustomizations.stylesheets
```

### 2. Find your profile folder

Open `about:support` → **Profile Folder** → click **Open Folder**, or navigate to:

```
%APPDATA%\Mozilla\Firefox\Profiles\<profile-id>.default-release\
```

### 3. Create the file

```
<profile-folder>/chrome/userChrome.css
```

Create the `chrome/` folder if it does not exist.

## Snippets

### Hide status panel (URL tooltip on hover)

```css
#statuspanel { display: none !important; }
```

### Hide tab bar (when using a vertical tabs extension)

```css
#TabsToolbar { display: none !important; }
```

### Hide menu bar

```css
#toolbar-menubar { display: none !important; }
```

### Compact navigation bar

```css
:root { --tab-min-height: 26px !important; }
```

### Hide scrollbars

```css
* { scrollbar-width: none !important; }
```

## Notes

- Changes take effect after restarting Firefox.
- `userContent.css` in the same folder applies CSS to web pages instead of the browser UI.

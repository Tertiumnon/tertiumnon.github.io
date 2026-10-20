# @tertium/css

A framework-agnostic, universal CSS design system with composable tokens, themes, components, and utilities. Use what you need, nothing more.

Includes design tokens, five switchable themes, layout utilities, and reusable components.

**📖 [View Interactive Demo](https://github.com/Tertiumnon/tertium-css/blob/HEAD/demo/index.html)** - See all components, themes, and design tokens in action

**🎬 [View Movie Catalog Demo](https://github.com/Tertiumnon/tertium-css/blob/HEAD/demo/movies.html)** - Try search, filters, themes, and responsive cards

The demo also includes [About](https://github.com/Tertiumnon/tertium-css/blob/HEAD/demo/about.html) and [Contact](https://github.com/Tertiumnon/tertium-css/blob/HEAD/demo/contact.html) pages, with shared navigation and an English, German, French, and Russian language switcher.

## Quick Start

```bash
npm install @tertium/css
```

### Full bundle

```html
<link rel="stylesheet" href="node_modules/@tertium/css/dist/bundles/full.min.css">
```

### Other bundles
Choose your entry point based on your needs:

```html
<!-- Option 1: Full everything -->
<link rel="stylesheet" href="node_modules/@tertium/css/dist/bundles/full.min.css">

<!-- Option 2: Just themes (for custom components) -->
<link rel="stylesheet" href="node_modules/@tertium/css/dist/bundles/themes.min.css">

<!-- Option 3: Just layout utilities -->
<link rel="stylesheet" href="node_modules/@tertium/css/dist/bundles/skeleton.min.css">

<!-- Option 4: All utilities -->
<link rel="stylesheet" href="node_modules/@tertium/css/dist/bundles/utilities.min.css">

<!-- Option 5: Just design tokens (variables) -->
<link rel="stylesheet" href="node_modules/@tertium/css/dist/bundles/variables.min.css">
```

## Design System Overview

Tertium CSS is built on a foundation of **design tokens** (CSS variables) that define spacing, colors, typography, shadows, and more. Everything derives from these tokens, ensuring consistency across all projects.

### Core Concepts

1. **Tokens** - CSS custom properties (--spacing-4, --primary-color, etc.)
2. **Themes** - Token presets that change appearance (Dark Purple Gold, Dark Violet Gold, Dark Blue White, Dark Indigo Gold, Light White Red)
3. **Skeleton** - Essential layout utilities (flexbox, grid, spacing, positioning)
4. **Components** - Pre-built UI elements (buttons, cards, etc.)
5. **Utilities** - Extended utilities for rapid development

## Consumption Models

Choose what you need. All bundles include design tokens.

### Model 1: Full Bundle (Everything)

```html
<link rel="stylesheet" href="dist/bundles/full.min.css">
```

Includes:
- ✅ Design tokens (CSS variables)
- ✅ All five themes
- ✅ Base styles (reset)
- ✅ Skeleton layout utilities (flex, grid, spacing, positioning)
- ✅ All utility classes
- ✅ Pre-built components (buttons, cards)

**Best for:** New projects, complete applications, when you want everything out of the box.

### Model 2: Themes Only

```html
<link rel="stylesheet" href="dist/bundles/themes.min.css">
<!-- Then build your own components using CSS variables -->
<link rel="stylesheet" href="your-components.css">
```

Includes:
- ✅ Design tokens
- ✅ Five theme presets

**Best for:** Teams with existing component styles who want consistent tokens and theme switching.

### Model 3: Skeleton (Layout Essentials)

```html
<link rel="stylesheet" href="dist/bundles/skeleton.min.css">
```

Includes:
- ✅ Design tokens
- ✅ Base styles (reset)
- ✅ Flexbox layout utilities
- ✅ Grid utilities
- ✅ Spacing utilities (margin, padding, gap)
- ✅ Positioning utilities
- ✅ Display/visibility utilities

**Best for:** Rapid prototyping, building custom layouts, minimal CSS footprint.

**Example:**
```html
<div class="flex gap-4 p-6">
  <div class="flex-1">50% width</div>
  <div class="flex-1">50% width</div>
</div>
```

### Model 4: All Utilities

```html
<link rel="stylesheet" href="dist/bundles/utilities.min.css">
```

Includes:
- ✅ Design tokens
- ✅ Base styles
- ✅ **Skeleton** utilities (flex, grid, spacing, positioning)
- ✅ Typography utilities (text size, weight, alignment)
- ✅ Color utilities (bg, text colors)
- ✅ Border utilities
- ✅ All other utilities

**Best for:** Tailwind-like utility-first development, maximum flexibility.

**Example:**
```html
<h2 class="text-2xl font-bold text-blue-600">Title</h2>
<p class="text-gray-600 mt-2">Description with margin</p>
<button class="bg-blue-500 text-white px-4 py-2 rounded">
  Action
</button>
```

### Model 5: Components Only

```html
<link rel="stylesheet" href="dist/bundles/components.min.css">
```

Includes:
- ✅ Design tokens
- ✅ Base styles
- ✅ Pre-built components (buttons, cards, forms, tables)

**Best for:** Using pre-styled components without utilities.

### Model 6: Variables Only

```html
<link rel="stylesheet" href="dist/bundles/variables.min.css">
<!-- Then use variables in your own CSS -->
<link rel="stylesheet" href="your-app.css">
```

In `your-app.css`:
```css
.my-button {
  padding: var(--spacing-2) var(--spacing-4);
  background: var(--primary-color);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
}
```

**Best for:** Maximum flexibility, custom styling, design system integration.

## Mix and Match

Combine bundles to get exactly what you need:

```html
<!-- Themes + Skeleton -->
<link rel="stylesheet" href="dist/bundles/themes.min.css">
<link rel="stylesheet" href="dist/bundles/skeleton.min.css">

<!-- Variables + Components -->
<link rel="stylesheet" href="dist/bundles/variables.min.css">
<link rel="stylesheet" href="dist/bundles/components.min.css">

<!-- Themes + Utilities -->
<link rel="stylesheet" href="dist/bundles/themes.min.css">
<link rel="stylesheet" href="dist/bundles/utilities.min.css">
```

## Theme System

Five built-in themes with runtime switching. Without `data-theme`, the light theme is used.

Every theme defines the same variables (`src/themes/*.theme.ts` generates them), so a component written with these variables works under any theme. The theme contract test (`bun test`) checks this, and that the theme names follow `darkness--primary--accent`, for example `dark--indigo--gold`.

### VS Code

`bun run theme:vscode` writes every theme as a VS Code colour theme to `dist/vscode/<theme>.json`, with the workbench colours derived from the same tokens.

### Dark Purple Gold

```html
<html data-theme="dark--purple--gold">
```

### Dark Violet Gold

```html
<html data-theme="dark--violet--gold">
```

### Dark Blue White

```html
<html data-theme="dark--blue--white">
```

### Light White Red

```html
<html data-theme="light--white--red">
```

### Switch Themes at Runtime

```javascript
// Change theme
document.documentElement.setAttribute('data-theme', 'light--white--red');

// Persist to localStorage
function setTheme(theme) {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
}

// Load saved theme on page load
const savedTheme = localStorage.getItem('theme') || 'light--white--red';
document.documentElement.setAttribute('data-theme', savedTheme);
```

## Design Tokens

All styling uses CSS custom properties defined in one place:

```css
/* Spacing */
var(--spacing-1)  /* 4px */
var(--spacing-2)  /* 8px */
var(--spacing-4)  /* 16px */
var(--spacing-6)  /* 24px */

/* Typography */
var(--text-base)
var(--text-lg)
var(--text-2xl)
var(--font-bold)

/* Colors */
var(--primary-color)
var(--color-success)
var(--color-danger)

/* Others */
var(--radius-md)
var(--shadow-md)
var(--duration-normal)
```

See [TOKENS.md](https://github.com/Tertiumnon/tertium-css/blob/HEAD/docs/TOKENS.md) for complete reference.

## Components

Pre-built UI elements with multiple variants:

### Buttons

```html
<!-- Default button -->
<button class="btn">Default</button>

<!-- Primary button (uses accent color) -->
<button class="btn btn--primary">Primary</button>

<!-- Submit button (for forms) -->
<button class="btn btn--submit" type="submit">Submit</button>

<!-- Outline button (transparent with border) -->
<button class="btn btn--outline">Outline</button>

<!-- Disabled state -->
<button class="btn" disabled>Disabled</button>
```

### Cards

```html
<!-- Standard card with primary background -->
<div class="card">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</div>

<!-- Section card with darker background (better for grouping) -->
<div class="section">
  <div class="card">
    <h2>Content Section</h2>
    <p>Content inside</p>
  </div>
</div>
```

### Forms

```html
<form class="form">
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" class="form-input">
  </div>

  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" class="form-input">
  </div>

  <div class="form-group">
    <label for="message">Message</label>
    <textarea id="message" class="form-input"></textarea>
  </div>

  <button type="submit" class="btn btn--primary">Send</button>
</form>
```

### Searchable multiselect

The form bundle includes the dropdown styles. Each checked option remains a native checkbox and submits its value with the form.

```html
<span class="form-label" id="genres-label">Genres</span>
<details class="multi-select" aria-labelledby="genres-label">
  <summary class="multi-select__summary"><span data-multiselect-label>Select genres</span></summary>
  <div class="multi-select__panel">
    <input class="form-input multi-select__search" type="search" aria-label="Search genres" placeholder="Search genres...">
    <div class="multi-select__options">
      <label class="multi-select__option"><input class="form-checkbox" type="checkbox" name="genres" value="drama"><span>Drama</span></label>
      <label class="multi-select__option"><input class="form-checkbox" type="checkbox" name="genres" value="mystery"><span>Mystery</span></label>
    </div>
    <p class="multi-select__empty" role="status" hidden>No matches</p>
  </div>
</details>
```

```js
import { initMultiSelect } from "@tertium/css/form/multiselect.js";

initMultiSelect(document.querySelector(".multi-select"));
```

### Tables

```html
<table class="table">
  <thead>
    <tr>
      <th>Column 1</th>
      <th>Column 2</th>
      <th>Column 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
      <td>Data 3</td>
    </tr>
    <tr>
      <td>Data 4</td>
      <td>Data 5</td>
      <td>Data 6</td>
    </tr>
  </tbody>
</table>
```

### Navigation Bar

```html
<nav class="navbar">
  <div class="container-2xl">
    <div class="navbar-inner">
      <a href="#" class="navbar-brand">Logo</a>

      <ul class="navbar-menu">
        <li class="nav-item"><a href="#" class="nav-link">Home</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Features</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Docs</a></li>
      </ul>

      <div class="navbar-actions">
        <button class="btn btn--primary">Sign In</button>
      </div>
    </div>
  </div>
</nav>
```

### Badges

```html
<!-- Color badges -->
<span class="badge">Default</span>
<span class="badge bg-success">Success</span>
<span class="badge bg-warning">Warning</span>
<span class="badge bg-danger">Danger</span>
<span class="badge bg-info">Info</span>
```

### Utility Classes for Colors

```html
<!-- Background colors -->
<div class="bg-primary">Primary background</div>
<div class="bg-accent">Accent background</div>
<div class="bg-success">Success background</div>
<div class="bg-warning">Warning background</div>
<div class="bg-danger">Danger background</div>
<div class="bg-info">Info background</div>

<!-- Text colors -->
<p class="text-primary">Primary text</p>
<p class="text-secondary">Secondary text</p>
<p class="text-success">Success text</p>
<p class="text-danger">Danger text</p>
```

See [COMPONENTS.md](https://github.com/Tertiumnon/tertium-css/blob/HEAD/docs/COMPONENTS.md) for detailed component API reference.

## Documentation

- [DESIGN_SYSTEM_OVERVIEW.md](https://github.com/Tertiumnon/tertium-css/blob/HEAD/docs/DESIGN_SYSTEM_OVERVIEW.md) - Principles and architecture
- [INSTALLATION.md](https://github.com/Tertiumnon/tertium-css/blob/HEAD/docs/INSTALLATION.md) - Detailed setup guide
- [THEMES.md](https://github.com/Tertiumnon/tertium-css/blob/HEAD/docs/THEMES.md) - Theme switching and customization
- [TOKENS.md](https://github.com/Tertiumnon/tertium-css/blob/HEAD/docs/TOKENS.md) - Design token reference (TODO)
- [COMPONENTS.md](https://github.com/Tertiumnon/tertium-css/blob/HEAD/docs/COMPONENTS.md) - Component catalog (TODO)
- [UTILITIES.md](https://github.com/Tertiumnon/tertium-css/blob/HEAD/docs/UTILITIES.md) - Utility class reference (TODO)
- [STRUCTURE.md](https://github.com/Tertiumnon/tertium-css/blob/HEAD/docs/STRUCTURE.md) - Directory organization
- [Development](https://github.com/Tertiumnon/tertium-css/blob/HEAD/docs/DEVELOPMENT.md)

## Why Tertium CSS?

✅ **Universal** - Works with any framework (vanilla HTML, React, Angular, Vue)
✅ **No Build Step** - Pure CSS, use directly in HTML
✅ **Modular** - Choose exactly what you need
✅ **Token-Based** - Single source of truth for all styling
✅ **Theme System** - Runtime theme switching without recompiling
✅ **Accessible** - Built-in focus states, contrast, reduced-motion support
✅ **Responsive** - Mobile-first, breakpoint utilities included
✅ **Extensible** - Easy to customize tokens and add themes

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: Latest versions

CSS custom properties (CSS variables) are supported in all modern browsers.

## Package Exports

```json
{
  "exports": {
    ".": "./dist/bundles/full.min.css",
    "./themes": "./dist/bundles/themes.min.css",
    "./skeleton": "./dist/bundles/skeleton.min.css",
    "./utilities": "./dist/bundles/utilities.min.css",
    "./components": "./dist/bundles/components.min.css",
    "./variables": "./dist/bundles/variables.min.css"
  }
}
```

## License

MIT

---

**Built for universality.** Use Tertium CSS in any project, any framework, any context. It's your design system, simplified.

## Support

If this project is useful to you, you can support its development on [Ko-fi](https://ko-fi.com/tertiumnon).

---
publishedAt: 2021-06-23
categories: ["Programming"]
tags: ["Frontend","Web Development"]
---

# Frontend: Possible List Option Properties

When implementing lists of options in frontend development, you can enhance UX by marking items with various states. For example, showing that an article is under the mouse cursor requires an "active" property.

## Common List Option Properties

- **`active` / `isActive`** — highlights the currently selected or hovered option
- **`disabled` / `isDisabled`** — marks an unavailable option
- **`hidden` / `isHidden`** — removes the option from view
- **`iconUrl`** — stores an image URL
- **`slug`** — hidden identifier usable as a CSS class or form value
- **`name` / `title`** — visible label
- **`value`** — form submission value

## Example Structure

```
articles
   article1
       active
   article2
       disabled
```

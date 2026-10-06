# Markdown content fixer

Normalize a Markdown file with Bun:

```powershell
bun .\scripts\post--fix-md-content\post--fix-md-content.ts <path-to-file>
```

Preserve the first N physical lines without changing them:

```powershell
bun .\scripts\post--fix-md-content\post--fix-md-content.ts <path-to-file> --skip-lines 4
```

## What it changes

- Preserves a leading YAML frontmatter block.
- Removes `---` separator lines outside frontmatter and fenced code blocks.
- Keeps the first H1 unchanged and adds one `#` to every other ATX heading, up to H6.
- Prevents a heading from being more than one level deeper than the preceding heading.
- Leaves fenced code blocks and skipped lines unchanged.
- Preserves the file's line endings and final newline state.

The exported `removeSeparators`, `normalizeHeaders`, `normalizeMdContent`, and
`processMarkdownFile` functions can also be imported by other Bun scripts.

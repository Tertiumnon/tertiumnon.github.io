// Look shared by every form control on the site, so inputs, selects and text areas match.
export const FIELD_STYLES = `
  .field {
    box-sizing: border-box;
    width: 100%;
    min-height: 36px;
    padding: 6px 10px;
    border: 1px solid var(--theme-border);
    border-radius: var(--editor-radius);
    background-color: var(--theme-surface);
    color: var(--theme-text);
    font: inherit;
    outline: none;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }

  .field:focus {
    border-color: var(--theme-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--theme-accent) 25%, transparent);
  }

  .field:disabled,
  .field[readonly] {
    opacity: 0.6;
  }
`;

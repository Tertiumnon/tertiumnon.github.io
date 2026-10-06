import { describe, expect, test } from 'bun:test';
import { normalizeHeaders, normalizeMdContent, removeSeparators } from './post--fix-md-content';

describe('Markdown content fixer', () => {
  describe('removeSeparators', () => {
    test('preserves opening YAML frontmatter and removes later separators', () => {
      const input = '---\ntitle: Example\n---\n\nText\n\n---\n';

      expect(removeSeparators(input)).toBe('---\ntitle: Example\n---\n\nText\n\n');
    });

    test('preserves separator-like lines inside backtick and tilde fences', () => {
      const input = '```md\n---\n```\n~~~md\n---\n~~~\n---\n';

      expect(removeSeparators(input)).toBe('```md\n---\n```\n~~~md\n---\n~~~\n');
    });

    test('preserves the requested leading lines', () => {
      const input = 'first\n---\nthird\n---\nfifth\n';

      expect(removeSeparators(input, { skipLines: 3 })).toBe('first\n---\nthird\nfifth\n');
    });
  });

  describe('normalizeHeaders', () => {
    test('keeps the first H1 and repairs a skipped level after it', () => {
      const input = '# Title\n### Jumped section\n';

      expect(normalizeHeaders(input)).toBe('# Title\n## Jumped section\n');
    });

    test('demotes later H1s and keeps their nested levels distinct', () => {
      const input = '# Title\n# Section\n## Subsection\n# Next section\n';

      expect(normalizeHeaders(input)).toBe('# Title\n## Section\n### Subsection\n## Next section\n');
    });

    test('normalizes headings before a later first H1', () => {
      const input = '## Intro\n# Title\n### Subsection\n';

      expect(normalizeHeaders(input)).toBe('### Intro\n# Title\n## Subsection\n');
    });

    test('leaves headings inside fenced code unchanged', () => {
      const input = '# Title\n\n```md\n# Code sample\n---\n```\n# Section\n';

      expect(normalizeHeaders(input)).toBe('# Title\n\n```md\n# Code sample\n---\n```\n## Section\n');
    });

    test('leaves skipped lines unchanged and uses them for nesting context', () => {
      const input = '# Title\n### Section\n';

      expect(normalizeHeaders(input, { skipLines: 1 })).toBe('# Title\n## Section\n');
    });

    test('rejects an invalid skip-lines value', () => {
      expect(() => normalizeHeaders('# Title', { skipLines: -1 })).toThrow(RangeError);
    });
  });

  describe('normalizeMdContent', () => {
    test('combines frontmatter, separator, heading, and code preservation rules', () => {
      const input = [
        '---',
        'title: Example',
        '---',
        '',
        '# Title',
        '',
        '### Jumped section',
        '',
        '---',
        '```md',
        '# Code heading',
        '---',
        '```',
        '',
      ].join('\n');
      const expected = [
        '---',
        'title: Example',
        '---',
        '',
        '# Title',
        '',
        '## Jumped section',
        '',
        '```md',
        '# Code heading',
        '---',
        '```',
        '',
      ].join('\n');

      expect(normalizeMdContent(input)).toBe(expected);
    });

    test('preserves CRLF line endings and whether the file ends with a newline', () => {
      const input = '# Title\r\n### Section';

      expect(normalizeMdContent(input)).toBe('# Title\r\n## Section');
    });

    test('rejects invalid skip-lines values', () => {
      expect(() => normalizeMdContent('# Title', { skipLines: 1.5 })).toThrow(RangeError);
    });
  });
});

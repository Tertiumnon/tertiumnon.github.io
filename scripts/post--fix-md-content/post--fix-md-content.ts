#!/usr/bin/env bun

export interface NormalizeOptions {
  /** Keep the first N physical lines byte-for-byte unchanged. */
  skipLines?: number;
}

interface MarkdownState {
  fence?: { character: '`' | '~'; length: number };
  inFrontmatter: boolean;
  hasSeenTitle: boolean;
  previousHeadingLevel?: number;
}

const fenceStart = /^\s*(`{3,}|~{3,})(.*)$/;
const atxHeading = /^(#{1,6})([ \t]+.*)$/;

function createState(): MarkdownState {
  return {
    inFrontmatter: false,
    hasSeenTitle: false,
  };
}

function splitLineEnding(line: string): { body: string; ending: string } {
  if (line.endsWith('\r')) return { body: line.slice(0, -1), ending: '\r' };
  return { body: line, ending: '' };
}

function advanceFence(state: MarkdownState, line: string): boolean {
  const trimmed = line.trimStart();
  if (state.fence) {
    const close = new RegExp(`^${state.fence.character}{${state.fence.length},}\\s*$`);
    if (close.test(trimmed)) state.fence = undefined;
    return true;
  }

  const match = line.match(fenceStart);
  if (!match) return false;
  const marker = match[1];
  const character = marker[0] as '`' | '~';
  // CommonMark disallows backticks in a backtick fence's info string.
  if (character === '`' && match[2].includes('`')) return false;
  state.fence = { character, length: marker.length };
  return true;
}

function processLines(
  content: string,
  options: NormalizeOptions,
  settings: { removeSeparators: boolean; normalizeHeadings: boolean },
): string {
  const skipLines = options.skipLines ?? 0;
  if (!Number.isSafeInteger(skipLines) || skipLines < 0) {
    throw new RangeError('skipLines must be a non-negative safe integer');
  }

  const lines = content.split('\n');
  const output: string[] = [];
  const state = createState();

  for (let index = 0; index < lines.length; index++) {
    const { body, ending } = splitLineEnding(lines[index]);
    const untouched = index < skipLines;

    if (index === 0 && body.trim() === '---') state.inFrontmatter = true;

    if (state.inFrontmatter) {
      output.push(lines[index]);
      if (index > 0 && body.trim() === '---') {
        state.inFrontmatter = false;
      }
      continue;
    }

    if (advanceFence(state, body)) {
      output.push(lines[index]);
      continue;
    }

    if (state.fence) {
      output.push(lines[index]);
      continue;
    }

    if (settings.removeSeparators && !untouched && body.trim() === '---') {
      continue;
    }

    const match = settings.normalizeHeadings ? body.match(atxHeading) : null;
    if (!match) {
      output.push(lines[index]);
      continue;
    }

    const level = match[1].length;
    let outputLevel = level;
    if (!state.hasSeenTitle && level === 1) {
      state.hasSeenTitle = true;
    } else if (state.hasSeenTitle || !untouched) {
      outputLevel = Math.min(level + 1, 6);
    }

    if (!untouched && state.previousHeadingLevel !== undefined && outputLevel > state.previousHeadingLevel + 1) {
      outputLevel = state.previousHeadingLevel + 1;
    }

    // A skipped heading is preserved exactly, but still informs later nesting.
    const rendered = untouched ? lines[index] : `${'#'.repeat(outputLevel)}${match[2]}${ending}`;
    output.push(rendered);
    state.previousHeadingLevel = untouched ? level : outputLevel;
  }

  return output.join('\n');
}

/** Remove horizontal rules outside frontmatter and fenced code blocks. */
export function removeSeparators(content: string, options: NormalizeOptions = {}): string {
  return processLines(content, options, { removeSeparators: true, normalizeHeadings: false });
}

/** Keep the first H1; demote every other heading and repair skipped levels. */
export function normalizeHeaders(content: string, options: NormalizeOptions = {}): string {
  return processLines(content, options, { removeSeparators: false, normalizeHeadings: true });
}

/** Apply all Markdown content fixes in one pass. */
export function normalizeMdContent(content: string, options: NormalizeOptions = {}): string {
  return processLines(content, options, { removeSeparators: true, normalizeHeadings: true });
}

export async function processMarkdownFile(filePath: string, options: NormalizeOptions = {}): Promise<string> {
  const file = Bun.file(filePath);
  if (!(await file.exists())) throw new Error(`File not found: ${filePath}`);
  const normalized = normalizeMdContent(await file.text(), options);
  await Bun.write(file, normalized);
  return normalized;
}

function parseArguments(args: string[]): { filePath: string; options: NormalizeOptions } {
  let filePath: string | undefined;
  let skipLines: number | undefined;

  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg === '--skip-lines') {
      const value = args[++index];
      if (value === undefined || !/^\d+$/.test(value)) {
        throw new Error('--skip-lines requires a non-negative integer');
      }
      skipLines = Number(value);
      if (!Number.isSafeInteger(skipLines)) throw new Error('--skip-lines value is too large');
    } else if (arg.startsWith('--')) {
      throw new Error(`Unknown option: ${arg}`);
    } else if (filePath) {
      throw new Error(`Unexpected extra argument: ${arg}`);
    } else {
      filePath = arg;
    }
  }

  if (!filePath) throw new Error('A Markdown file path is required');
  return { filePath, options: { skipLines } };
}

if (import.meta.main) {
  try {
    const { filePath, options } = parseArguments(Bun.argv.slice(2));
    const normalized = await processMarkdownFile(filePath, options);
    const contentLines = normalized.split(/\r?\n/).filter(line => line.trim().length > 0).length;
    console.log(`Successfully processed: ${filePath}`);
    console.log(`  Lines with content: ${contentLines}`);
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
    console.error('Usage: bun post--fix-md-content.ts <path-to-file> [--skip-lines <number>]');
    process.exitCode = 1;
  }
}

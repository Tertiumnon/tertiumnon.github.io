---
publishedAt: 2026-07-12
updatedAt: 2026-08-21
category: Programming
tags: ["JavaScript","Tools","Web Development"]
---

# Bun in 2026

![](./img/bun-1.4.png)

> **For whom this article is:** For JavaScript/TypeScript developers who want to learn about major events and new capabilities of Bun in 2026.

2026 was a turning point for Bun. [Rewriting in Rust](https://bun.com/blog/bun-in-rust) using Claude Fable 5 in 11 days demonstrated new possibilities for AI-accelerated development, and on August 20, 2026 [Bun v1.4 shipped](https://bun.com/blog/bun-v1.4) — the first production release running fully on the Rust rewrite (until then Rust was only used internally, for example in Claude Code). Version 1.3.14 added Bun.Image, HTTP/3, and Global Virtual Store, while v1.4 brought a sharp jump in Node.js compatibility and dozens of new built-in APIs. Bun became part of Anthropic after [acquisition in December 2025](https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone).

## Table of Contents

- [Key Features](#key-features)
- [Quick Start](#quick-start)
- [Major Events 2026](#major-events-2026)
- [New APIs and Features](#new-apis-and-features)
- [Performance](#performance)
- [Bottom Line: npm Packages You No Longer Need](#bottom-line-npm-packages-you-no-longer-need)

## Key Features

| Command | Description | Node.js Alternative |
|---------|----------|------------------------|
| `bun run` | Execute JavaScript/TypeScript files | `node` / `ts-node` |
| `bun install` | Fast dependency manager | `npm install` / `yarn` |
| `bun build` | Bundler and minifier | `webpack` / `esbuild` |
| `bun test` | Built-in test runner | `jest` / `vitest` |
| `bun create` | Initialize projects from templates | `npm create` |
| `Bun.serve()` | HTTP/HTTP2/HTTP3 server | `express` / `fastify` |
| `Bun.SQL` | Built-in SQL client | `pg` / `mysql2` |

### TypeScript: Built-in Support

Bun natively supports running TypeScript and JSX without a separate compilation step. Path aliases from `tsconfig.json` work out of the box.

**Important:** Bun does NOT replace static type checking. For full type checking, use `tsc --noEmit` in CI.

### Bun vs Node.js: TypeScript Support in 2026

[Node.js v24](https://nodejs.org/api/typescript.html) (LTS 2026) made type stripping the default behavior. However, important differences remain between Bun and Node.js:

| Capability | Bun v1.4 | Node.js v24+ |
|-------------|-------------|--------------|
| Run .ts files | ✅ `bun app.ts` | ✅ `node app.ts` |
| JSX support | ✅ Built-in | ❌ No |
| Path aliases (`@app/*`) | ✅ From tsconfig.json | ❌ Ignored |
| Enums, namespaces | ✅ Work | ⚠️ Needs `--experimental-transform-types` |
| Startup speed | [~5.1ms on Linux](https://bun.com/blog/bun-v1.4) | ~19ms |
| Built-in bundler | ✅ `bun build` | ❌ No |

**When to choose Bun:** JSX/React projects, using path aliases, maximum development speed.

**When Node.js is enough:** Simple .ts scripts without JSX and path aliases.

## Quick Start

### Install Dependencies

```bash
bun install
```

### Run a Script

```bash
bun run start
# or directly
bun index.ts
```

### Build Your Project

```bash
bun build index.ts --target node --outfile dist/bundle.js
```

### Run Tests

```ts
// tests/example.test.ts
import { describe, it, expect } from "bun:test";

describe("sum", () => {
  it("should correctly add numbers", () => {
    const sum = (a: number, b: number) => a + b;
    expect(sum(1, 2)).toBe(3);
  });
});
```

```bash
bun test
bun test --watch
bun test --parallel  # new in 2026
```

## Major Events 2026

### Bun v1.4 (August 20, 2026)

[Bun v1.4](https://bun.com/blog/bun-v1.4) is the first production release running on the rewritten Rust engine — previously the Rust version lived only inside Anthropic, Claude Code included, and the last Zig build was v1.3.14. Startup got 50% faster on Linux (5.1ms vs 10.9ms) and 2.5x faster on Windows (15.5ms vs 39.0ms), idle CPU usage dropped fivefold, and HTTP server memory under load fell by 35-48%.

Node.js compatibility took its biggest leap since v1.0: the test suite gained 1,517 tests from Node.js itself, `node:http`, `node:fs`, `node:sqlite` and other key modules now pass 97-100% of them, and Playwright, Next.js 16, vitest, and OpenTelemetry just work. On the feature side, Bun.markdown, Bun.Archive, and Bun.JSON5/JSONC/XML/TOML replace another 15 npm dependencies with native code. Windows ARM64 is now officially supported.

The most telling number comes from Anthropic's own production: Claude Code's p99 CPU usage dropped from 24% to 10%, p50 from 5.8% to 2.5%.

Part of the community [criticized the AI-driven rewrite](https://grigio.org/bun-1-4-the-controversial-ai-driven-rewrite-from-zig-to-rust/) for over 13,000 `unsafe` blocks in the resulting Rust code — hand-written Rust projects of similar size average around 70 — and for the fact that the largest PR in GitHub history was reviewed only by AI agents (`coderabbitai` and `claude`), with no human in the loop. A 99.8% first-pass test suite score sounds reassuring, but it's not the same thing as a person actually reading a million-line diff, and that gap is a fair thing to be uneasy about. Upgrading via `bun upgrade` at least requires no breaking changes.

### Bun v1.3.14 (May 13, 2026)

[Bun v1.3.14](https://bun.com/blog/bun-v1.3.14) — the last stable release on Zig before the Rust move — shipped Bun.Image (image processing 7x faster than sharp), HTTP/3 and QUIC support in `Bun.serve()` and `fetch()`, the Global Virtual Store (7x faster cached installs), and Bun.Terminal, terminal APIs on Windows via ConPTY.

### Rewritten in Rust (May 4-14, 2026)

[Bun was rewritten from Zig to Rust](https://bun.com/blog/bun-in-rust) in 11 days using Claude Fable 5 — 535,496 lines of Zig became over a million lines of Rust across 6,502 commits, with up to 64 Claude agents working in parallel and an API bill of roughly $165,000 (5.9 billion tokens).

The payoff: the binary shrank by about 20%, 128 bugs got fixed along the way, memory leaks in Bun.build() dropped from 6,745 MB to 609 MB — more than 11x — and every test passed on every platform.

The reason for the rewrite is mundane: the Zig version had 13 memory-safety vulnerabilities (use-after-free, double-free, leaks), and Rust catches that class of bug at compile time. The rewritten code spent three months running inside Bun itself, including in Claude Code, before becoming the production version in v1.4.

### Acquired by Anthropic (December 2, 2025)

Bun was [acquired by Anthropic](https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone) and is now used as the foundation for Claude Code and Claude Agent SDK. Bun remains open source under MIT license.

## New APIs and Features

### Bun.Image (v1.3.14, matured in v1.4)

[Built-in image processing](https://bun.com/blog/bun-v1.3.14), 7x faster than alternatives:

```typescript
import { Image } from "bun";

const img = new Image(await Bun.file("photo.jpg").arrayBuffer());
const resized = await img.resize(800, 600);
const webp = await resized.webp();
```

Support: JPEG, PNG, WebP, GIF, BMP, HEIC, AVIF.

### Bun.WebView (v1.3.12, in v1.4 — system WebKit or Chrome/Chromium/Edge)

[Headless browser](https://bun.com/docs/runtime/webview) without Puppeteer and Playwright:

```typescript
const webview = await Bun.WebView.open("https://example.com");
const screenshot = await webview.screenshot();
await webview.close();
```

### Bun.cron (v1.3.12)

[Built-in task scheduler](https://bun.com/blog/bun-v1.3.12):

```typescript
import { cron } from "bun";

cron("0 * * * *", () => {
  console.log("Every hour");
});
```

### Bun.SQL (v1.3)

Built-in SQL client without external dependencies:

```typescript
import { sql } from "bun";

const users = await sql`SELECT * FROM users WHERE id = ${userId}`;
```

Support: PostgreSQL, MySQL, MariaDB, SQLite.

### Markdown in Terminal (v1.3.12)

```bash
bun ./README.md  # renders markdown in terminal
```

### Bun.markdown (v1.4)

[Programmatic markdown parser](https://bun.com/blog/bun-v1.4) — render to HTML, React, or a custom format:

```typescript
import { markdown } from "bun";

const html = markdown.toHTML("# Hello, **Bun**!");
const react = markdown.toReact("- one\n- two");
```

### Bun.Archive (v1.4)

[Create and extract archives](https://bun.com/blog/bun-v1.4) without `tar`/`node-tar`:

```typescript
import { Archive } from "bun";

const archive = new Archive();
await archive.add("dist/", { recursive: true });
await archive.write("release.tar.gz");

await Archive.extract("release.tar.gz", { to: "./out" });
```

### Data Formats: JSON5, JSONC, XML, TOML (v1.4)

[Built-in format parsers](https://bun.com/blog/bun-v1.4) — 15 more npm dependencies eliminated:

```typescript
import { JSON5, JSONC, XML, TOML } from "bun";

JSON5.parse("{ unquoted: 'ok', trailing: 1, }");
JSONC.parse("{ /* comment */ \"a\": 1 }");
XML.parse("<root><item>1</item></root>");
TOML.parse("[server]\nport = 8080");
```

### HTTP/3 and QUIC (v1.3.14, now also in fetch() — v1.4)

```typescript
Bun.serve({
  port: 443,
  tls: { /* ... */ },
  // HTTP/3 enabled automatically with TLS
  fetch(req) {
    return new Response("Hello HTTP/3!");
  },
});
```

In v1.4, experimental HTTP/2 and HTTP/3 support was [added to the client-side `fetch()`](https://bun.com/blog/bun-v1.4) as well:

```typescript
await fetch("https://example.com", { protocol: "http3" });
```

### Parallel Testing (v1.3.13, + `--timings` in v1.4)

```bash
bun test --parallel        # parallel execution
bun test --isolate         # test isolation
bun test --shard=1/4       # sharding for CI
bun test --changed         # only changed tests
bun test --timings         # shard by actual execution time (v1.4)
```

### Compile to HTML (v1.3.10, + `--asset` in v1.4)

```bash
bun build ./app.ts --compile --target=browser
# Result: single .html file

bun build ./app.ts --compile --asset ./data.db
# Embeds a file into the compiled binary (v1.4)
```

### Package Management Commands (v1.4)

[New commands](https://bun.com/blog/bun-v1.4) for maintaining dependencies:

```bash
bun audit fix     # automatically patches vulnerabilities
bun dedupe        # removes duplicate versions from the lockfile
bun prune         # deletes unused packages
bun pm diff        # compares package versions
bun pm licenses    # license report for dependencies
```

### bun build: React Compiler and Barrel Imports (v1.4)

[Built-in React Compiler](https://bun.com/blog/bun-v1.4) — 19x faster than the Babel plugin — plus tree-shaking of barrel files, markdown bundle reports, and standard TC39 decorators support:

```bash
bun build ./app.tsx --react-compiler
bun build ./app.ts --metafile-md=report.md
```

### Developer Tooling (v1.4)

```bash
bun --cpu-prof-md ./app.ts    # markdown CPU profiling report
bun --heap-prof-md ./app.ts   # markdown heap profiling report
bun run --parallel "build:*"  # run multiple scripts concurrently
```

```typescript
process.on("memoryPressure", (level) => {
  console.log("OS reports low memory:", level);
});
```

## Performance

### Comparison with Node.js and Deno (August 2026, Bun v1.4 figures)

| Metric | Bun v1.4 | Node.js v26 | Deno v2.5 |
|--------|-------------|-------------|-----------|
| Cold start (Linux) | [~5.1ms](https://bun.com/blog/bun-v1.4) | ~19ms | ~18ms |
| HTTP throughput | 290k req/s | 71k req/s | ~75k req/s |
| Package installation | 4.2s | 38s (npm) | 35s |
| Build 50k lines | 1.1s | - | - |

### Bun v1.4 vs v1.3: what the Rust move delivered

[According to Bun](https://bun.com/blog/bun-v1.4), moving the Rust rewrite to production brought a noticeable boost in real-world scenarios:

| Metric | v1.3 (Zig) | v1.4 (Rust) | Change |
|--------|------------|-------------|--------|
| Startup on Linux | 10.9ms | 5.1ms | −50% |
| Startup on Windows | 39.0ms | 15.5ms | 2.5x faster |
| Idle CPU | baseline | −5x | |
| Binary size (Linux/Windows) | baseline | −17% | |
| `new URL()` | baseline | up to 4.6x faster | |
| Regex operations | baseline | 138-200x faster | |
| FFI calls (`bun:ffi`) | baseline | 3x faster | |

Peak HTTP server memory under 1M requests:

| Framework | v1.3 | v1.4 | Reduction |
|-----------|------|------|-----------|
| Fastify | 233 MB | 120 MB | −48% |
| Express | 169 MB | 92 MB | −46% |
| `node:http` | 135 MB | 81 MB | −40% |

In Claude Code's production, which had already been running on the Rust version for several months, p99 CPU usage dropped from 24% to 10%, and p50 from 5.8% to 2.5%.

### Package Installation Speed

| Scenario | npm v12 | pnpm v11 | bun v1.3 |
|----------|---------|----------|----------|
| Clean install | 40s | 15s | **7s** |
| With cache | 18s | 5.5s | **2.5s** |
| Monorepo | 110s | 22s | **12s** |

On a test Next.js app (T3 stack), [Bun v1.4](https://bun.com/blog/bun-v1.4) installs dependencies even faster: first install — 1.41s (15x faster than npm), fresh checkout with cache — 251ms (30x faster), CI without cache — 951ms (19x faster), CI with cache — 210ms (21x faster).

## When to Use Bun

Go for it without hesitation: local development and CLI tools, new TypeScript/JSX projects, CI/CD (5-8x faster installs, sometimes 20-30x in v1.4 scenarios), and full-stack apps with built-in SQL. Windows development belongs here too — ARM64 included, now officially supported and starting up 2.5x faster in v1.4.

Think twice about a few things: HTTP/3 in `Bun.serve()` and `fetch()` is still experimental, too early for production. Native N-API module compatibility jumped a lot in v1.4, but a test-pass percentage isn't a guarantee for the specific module in your specific project — you'll still need to test it by hand. Cold start dropped sharply, good news for serverless, but how much it actually helps depends on the platform, not just the runtime. For applications with tight memory budgets, Bun is still the less predictable choice compared to Node.

## Bottom Line: npm Packages You No Longer Need

Bun's idea isn't to add one more tool to `node_modules` — it's to remove as much from it as possible. By v1.4, [Bun had replaced 15+ popular npm dependencies with native implementations](https://bun.com/blog/bun-v1.4) — instead of dozens of packages in `package.json`, you can get by with a single runtime:

| Task | Typical npm packages | Native Bun replacement | Since |
|------|----------------------|--------------------------|-------|
| Image processing | `sharp`, `jimp` | `Bun.Image` | v1.3.14 |
| Headless browser | `puppeteer`, `playwright` | `Bun.WebView` | v1.3.12 |
| SQL client | `pg`, `mysql2`, `better-sqlite3` | `Bun.SQL` | v1.3 |
| Cron jobs | `node-cron`, `cron` | `Bun.cron()` | v1.3.12 |
| Pseudo-terminal | `node-pty` | `Bun.Terminal` | v1.3.14 |
| Markdown rendering | `marked`, `markdown-it`, `remark` | `Bun.markdown` | v1.4 |
| Archives | `tar`, `node-tar`, `archiver` | `Bun.Archive` | v1.4 |
| JSON5 | `json5` | `Bun.JSON5` | v1.4 |
| JSON with comments | `jsonc-parser`, `comment-json` | `Bun.JSONC` | v1.4 |
| XML | `xml2js`, `fast-xml-parser` | `Bun.XML` | v1.4 |
| TOML | `toml`, `@iarna/toml` | `Bun.TOML` | v1.4 |
| Test runner | `jest`, `vitest`, `mocha` | `bun test` | v1.3–1.4 |
| Bundler | `webpack`, `esbuild`, `rollup`, `parcel` | `bun build` | built-in |
| React Compiler | `babel-plugin-react-compiler` | `bun build --react-compiler` | v1.4 |
| Package manager | `npm`, `yarn`, `pnpm` | `bun install` | built-in |
| License checking | `license-checker` | `bun pm licenses` | v1.4 |
| Dependency dedup | manual `npm dedupe` | `bun dedupe` | v1.4 |
| Unused package detection | `depcheck` | `bun prune` | v1.4 |
| Vulnerability patching | `npm audit` + manual patches | `bun audit fix` | v1.4 |
| Auto-restart | `nodemon` | `bun --watch` | built-in |
| Parallel scripts | `concurrently`, `npm-run-all` | `bun run --parallel` | v1.4 |
| Environment variables | `dotenv` | built-in `.env` support | built-in |
| Running TypeScript | `ts-node`, `tsx` | `bun app.ts` | built-in |

Not every replacement is a full drop-in — specific `webpack` loaders or advanced Puppeteer flows aren't going anywhere, and a third-party package will stay necessary there. But for a typical full-stack TypeScript project in 2026, `package.json` can genuinely shrink by a large factor, with `bun` ending up as pretty much the only dependency left.

**Links:**
- [Official Bun Website](https://bun.sh)
- [GitHub](https://github.com/oven-sh/bun)
- [Documentation](https://bun.com/docs)
- [Bun v1.4 release notes](https://bun.com/blog/bun-v1.4)

**Author-Compiler:** Vitaly Balananov

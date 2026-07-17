---
publishedAt: 2026-07-12
updatedAt: 2026-07-17
category: Programming
tags: ["JavaScript","Tools","Web Development"]
---

# Bun in 2026

<img src="https://bun.sh/logo.svg" alt="Bun Logo" width="200" />

> **For whom this article is:** For JavaScript/TypeScript developers who want to learn about major events and new capabilities of Bun in 2026.

2026 was a turning point for Bun. [Rewriting in Rust](https://bun.com/blog/bun-in-rust) using Claude Fable 5 in 11 days demonstrated new possibilities for AI-accelerated development. Version 1.3.14 added Bun.Image, HTTP/3, and Global Virtual Store. Bun became part of Anthropic after [acquisition in December 2025](https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone).

## Table of Contents

- [Key Features](#key-features)
- [Quick Start](#quick-start)
- [Major Events 2026](#major-events-2026)
- [New APIs and Features](#new-apis-and-features)
- [Performance](#performance)

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

| Capability | Bun v1.3.14 | Node.js v24+ |
|-------------|-------------|--------------|
| Run .ts files | ✅ `bun app.ts` | ✅ `node app.ts` |
| JSX support | ✅ Built-in | ❌ No |
| Path aliases (`@app/*`) | ✅ From tsconfig.json | ❌ Ignored |
| Enums, namespaces | ✅ Work | ⚠️ Needs `--experimental-transform-types` |
| Startup speed | ~2ms | ~19ms |
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

### Bun v1.3.14 (May 13, 2026)

[Bun v1.3.14 release](https://bun.com/blog/bun-v1.3.14) — the last stable version:

- **Bun.Image** — built-in image processing (7x faster than sharp)
- **HTTP/3 and QUIC** — support in `Bun.serve()` and `fetch()`
- **Global Virtual Store** — 7x faster package installation with caching
- **Bun.Terminal** — terminal APIs on Windows via ConPTY

### Rewritten in Rust (May 4-14, 2026)

[Bun was rewritten from Zig to Rust](https://bun.com/blog/bun-in-rust) in 11 days using Claude Fable 5:

**Scale:**
- 535,496 lines of Zig code → 1+ million lines of Rust code
- 6,502 commits
- ~$165,000 in API costs (5.9 billion tokens)
- Up to 64 Claude agents working in parallel

**Results:**
- Binary ~20% smaller
- 128 bugs fixed
- Memory leaks 11x less (Bun.build(): 6,745 MB → 609 MB)
- 100% tests passed on all platforms

**Reason:** 13 memory vulnerabilities in Zig version (use-after-free, double-free, leaks). Rust guarantees safety at compiler level.

### Acquired by Anthropic (December 2, 2025)

Bun was [acquired by Anthropic](https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone) and is now used as the foundation for Claude Code and Claude Agent SDK. Bun remains open source under MIT license.

## New APIs and Features

### Bun.Image (v1.3.14)

[Built-in image processing](https://bun.com/blog/bun-v1.3.14), 7x faster than alternatives:

```typescript
import { Image } from "bun";

const img = new Image(await Bun.file("photo.jpg").arrayBuffer());
const resized = await img.resize(800, 600);
const webp = await resized.webp();
```

Support: JPEG, PNG, WebP, GIF, BMP, HEIC, AVIF.

### Bun.WebView (v1.3.12)

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

### HTTP/3 and QUIC (v1.3.14)

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

### Parallel Testing (v1.3.13)

```bash
bun test --parallel        # parallel execution
bun test --isolate         # test isolation
bun test --shard=1/4       # sharding for CI
bun test --changed         # only changed tests
```

### Compile to HTML (v1.3.10)

```bash
bun build ./app.ts --compile --target=browser
# Result: single .html file
```

## Performance

### Comparison with Node.js and Deno (July 2026)

| Metric | Bun v1.3.14 | Node.js v26 | Deno v2.5 |
|--------|-------------|-------------|-----------|
| Cold start | ~2ms | ~19ms | ~18ms |
| HTTP throughput | 290k req/s | 71k req/s | ~75k req/s |
| Package installation | 4.2s | 38s (npm) | 35s |
| Build 50k lines | 1.1s | - | - |

### Package Installation Speed

| Scenario | npm v12 | pnpm v11 | bun v1.3 |
|----------|---------|----------|----------|
| Clean install | 40s | 15s | **7s** |
| With cache | 18s | 5.5s | **2.5s** |
| Monorepo | 110s | 22s | **12s** |

## When to Use Bun

**Recommended:**
- Local development and CLI tools
- New projects with TypeScript/JSX
- CI/CD (5-8x faster installation)
- Full-stack applications with built-in SQL

**Use with caution:**
- Production with many native modules
- Serverless without warm-up (cold start may be slower)
- Applications with strict memory constraints

**Links:**
- [Official Bun Website](https://bun.sh)
- [GitHub](https://github.com/oven-sh/bun)
- [Documentation](https://bun.com/docs)

**Author-Compiler:** Vitaly Balananov

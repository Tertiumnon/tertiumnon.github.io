---
publishedAt: 2025-11-30
updatedAt: 2025-11-30
category: Programming
tags: ["JavaScript","Tools","Web Development"]
source: "medium: https://tertiumnon.medium.com/bun-7fbe61f45e2e"
---

# Bun in 2025 — What It Is and How to Get Started

<img src="https://bun.sh/logo.svg" alt="Bun Logo" width="200" />

> **For whom this article is:** For JavaScript/TypeScript developers seeking an alternative to Node.js with improved performance, built-in tools, and a simplified workflow.

Bun is a modern JavaScript runtime and tooling suite that combines a runtime, package manager, bundler, and test runner. Bun's primary goal is to provide developers with the fastest and simplest stack for working with JavaScript and TypeScript.

In this article, we'll explore what Bun is, get to know its history, key features, and quick start.

**For a complete performance analysis and recommendations for using Bun in production, see the article "[Bun in 2026](../2026-07-12--bun-2026/)".**

## Table of Contents

- [What is Bun?](#what-is-bun)
- [Key Features](#key-features)
- [Quick Start](#quick-start)

## What is Bun?

Bun is a project written in **Zig** and using **JavaScriptCore** (the JavaScript engine from WebKit). It positions itself as a fast replacement for Node.js and Deno, combining a package manager, bundler, transpiler, and test framework into a single binary.

**Key advantages:**

- ⚡ **Speed** — fast startup, reduced build time, and high throughput for network operations
- 📦 **Single Binary** — fewer dependencies and quick installation
- 🛠️ **Built-in Tools** — integrated package manager, bundler, and tests
- 🔄 **Compatibility** — most Node.js code can run on Bun with minimal changes

### Bun's Creator: Jarred Sumner

<img src="https://avatars.githubusercontent.com/u/709451?v=4" alt="Jarred Sumner" width="150" style="border-radius: 50%;" />

**Jarred Sumner** — founder and CEO of Oven.sh, creator of Bun runtime. Graduate of the Thiel Fellowship program (2014).

**Key milestones:**

- **May 2021** — first tweets about the Bun project
- **July 5, 2022** — Bun 0.1 announcement
- **August 2022** — $7M Seed funding round from Kleiner Perkins and Guillermo Rauch (Vercel)
- **September 2023** — Bun 1.0 release
- **2025** — over 5 million downloads per month, used at Anthropic (Claude Code CLI)

Sumner actively develops the Bun ecosystem, adding new capabilities: full-stack dev server, SQL API, Redis support, and other tools for full-stack development.

**Contacts:**

- GitHub: [@Jarred-Sumner](https://github.com/Jarred-Sumner)
- X (Twitter): [@jarredsumner](https://x.com/jarredsumner)
- LinkedIn: [Jarred Sumner](https://www.linkedin.com/in/jarred-sumner-a8772425/)

### Zig Language: Bun's Foundation

<img src="https://raw.githubusercontent.com/ziglang/logo/master/zig-mark.svg" alt="Zig Language" width="150" />

**Zig** is a modern systems programming language created by **Andrew Kelley**. Bun is written in Zig for its performance, safety, and ease of C integration.

**Why Zig was chosen for Bun:**

- 🚀 **C-like Performance** — compiles to native code without runtime overhead
- 🔒 **Memory Safety** — compile-time checks without garbage collection
- 🔄 **C Interoperability** — direct integration with C libraries (JavaScriptCore, libuv)
- ⚡ **Memory Control** — explicit management without hidden allocations
- 🛠️ **Easy Debugging** — no macros and hidden control flow

**Key Zig Features:**

- **Imperative, statically-typed** compiled language
- **No hidden control flow** — all code is explicit and predictable
- **Compile-time execution** — powerful metaprogramming system
- **Cross-compilation out of the box** — support for all popular platforms
- **Error Handling** — explicit via error types (`!` operator)

**Zig's Creator: Andrew Kelley**

<img src="https://avatars.githubusercontent.com/u/106511?v=4" alt="Andrew Kelley" width="150" style="border-radius: 50%;" />

Andrew Kelley began developing Zig in 2015 with the goal of improving C by making the language simpler, safer, and more powerful.

**Recent achievements (2025):**

- Migration of the project from GitHub to Codeberg (November 2025)
- Compiler performance improvements of 5-50% for x86_64
- Development of self-hosted compiler

**Zig Philosophy:**

> "No hidden control flow. No hidden memory allocations. No preprocessor, no macros."

This makes Zig ideal for systems programming where performance and predictability are crucial.

**Links:**

- [Official Zig Website](https://ziglang.org/)
- [Andrew Kelley on GitHub](https://github.com/andrewrk)
- [Andrew Kelley's Personal Website](https://andrewkelley.me/)

## Key Features

| Command | Description | Node.js Alternative |
|---------|----------|------------------------|
| `bun run` | Execute JavaScript/TypeScript files | `node` / `ts-node` |
| `bun install` | Fast dependency manager | `npm install` / `yarn` |
| `bun build` | Bundler and minifier | `webpack` / `esbuild` |
| `bun test` | Built-in test runner | `jest` / `vitest` |
| `bun create` | Initialize projects from templates | `npm create` |

### TypeScript: Built-in Support

Bun **natively supports** running and bundling TypeScript files without a separate compilation step — you can write `.ts`/`.tsx` directly and run it through Bun.

**Important:** Bun does NOT replace static type checking. For full type checking, use `tsc --noEmit` in CI. Bun provides a fast transpiler/bundler with support for most TypeScript syntax features and built-in sourcemaps.

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

#### Watch Mode (Auto-rebuild)

```bash
# Build and watch for changes
bun build --watch --target=node --outfile=dist/server.js src/server.ts

# Disable screen clearing between rebuilds
bun build --watch --no-clear-screen --target=node --outfile=dist/server.js src/server.ts
```

**Useful Flags:**

- `--watch` — enable watch mode
- `--no-clear-screen` — don't clear console between rebuilds
- `--outfile` / `--outdir` — build output path
- `--target` — target platform: `node`, `bun`, or `browser`
- `--react-fast-refresh` — fast refresh for React

### Run Tests

Bun includes a built-in test runner, compatible with Jest API:

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

Run tests:

```bash
# Single run
bun test

# Watch mode (restart on changes)
bun test --watch
```

Expected output:

```text
 RUNS  tests/example.test.ts
 PASS  tests/example.test.ts (5 ms)
 ✓ 1 test passed
```

## Major Events of 2025

### Acquired by Anthropic (December 2, 2025)

**Historic Event:** Bun was acquired by **Anthropic** — the company that created Claude!

**Significance:**
- Bun is now officially part of Anthropic's infrastructure
- Powers **Claude Code** and **Claude Agent SDK**
- Long-term support and development guaranteed

### Key Features in 2025

**Full-Stack Development (October 2025):**
- Zero-config frontend development
- Built-in SQL API (DatabaseFirst approach)
- Built-in Redis client
- Enhanced security

**APIs and Tools:**
- **Bun.Archive API** — create and extract tarballs (v1.3.6)
- **Bun.Terminal API** — terminal interactions (v1.3.5)
- **URLPattern API** — URL pattern matching (v1.3.4)
- **CompressionStream/DecompressionStream** — built-in compression (v1.3.3)

**Format Support:**
- JSON5 (with comments)
- JSONL (JSON Lines)
- JSONC (JSON with Comments)

**Performance in 2025:**
- 50% faster `Buffer.from(array)`
- 35% faster async/await
- 3x faster `array.flat()`
- 2x faster `bun build` on macOS

**Testing:**
- Fake Timers for bun:test
- `retry` and `repeats` options
- `onTestFinished` hook
- VS Code integration

**Cloud Platforms:**
- Vercel added native Bun Runtime support (October 2025)

**Standards:**
- Async stack traces
- TC39 compliance improvements

---

**Author-Compiler:** Vitaly Balananov

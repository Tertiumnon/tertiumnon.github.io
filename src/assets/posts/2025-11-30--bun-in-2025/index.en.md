---
publishedAt: 2025-11-30
updatedAt: 2026-07-17
category: Programming
tags: ["JavaScript","Tools","Web Development"]
source: "medium: https://tertiumnon.medium.com/bun-7fbe61f45e2e"
---

# Bun in 2025

<img src="https://bun.sh/logo.svg" alt="Bun Logo" width="200" />

> **For whom this article is:** For JavaScript/TypeScript developers seeking an alternative to Node.js with improved performance, built-in tools, and a simplified workflow.

Bun is a modern JavaScript runtime and tooling suite that combines a runtime, package manager, bundler, and test runner. Bun's primary goal is to provide developers with the fastest and simplest stack for working with JavaScript and TypeScript.

In this article, we'll explore what Bun is, get to know its history, key features, and quick start.

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

**Supported features:**
- All standard type annotations, interfaces, type aliases
- Enums, decorators, namespaces
- JSX/TSX out of the box
- Path aliases from `tsconfig.json` (`@app/*`, `@utils/*`)
- Sourcemaps

**Important:** Bun does NOT replace static type checking. For full type checking, use `tsc --noEmit` in CI.

**Comparison with Node.js:** In 2024-2025, Node.js also started supporting TypeScript. [Node.js v22.6 (August 2024)](https://nodejs.org/learn/typescript/run-natively) added the `--experimental-strip-types` flag, and [Node.js v23 (October 2024)](https://nodejs.org/api/typescript.html) enabled it by default. However, Node.js uses "type stripping" — removing types without full transformation. Bun supports more features: JSX, path aliases, enums, namespaces work out of the box.

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

## Known Issues and Fixes

Bun has come a long way from an experimental runtime to a production-ready tool. This section covers major compatibility issues that have been fixed, as well as current limitations.

### Windows Support

**Problem:** Before version 1.1, Bun was only available on Linux and macOS.

**Solution:** [Bun 1.1 (April 2024)](https://bun.com/blog/bun-v1.1) added full support for Windows 10 and 11. A special `.bunx` format was implemented to work around Windows limitations with shebang scripts. `bun install` works 18x faster than yarn and 30x faster than npm on Windows.

**Current status:** Full support. In [version 1.1.3](https://bun.sh/blog/bun-v1.1.3), `bun install` became 50% faster on Windows. In version 1.1.2, `fs.watch` was rewritten for Windows with improved performance and reliability.

### Node.js API Compatibility

**Problem:** Early versions of Bun supported a limited set of Node.js modules, causing incompatibility with popular npm packages.

**Solution:** The Bun team began systematically running the Node.js test suite for every code change. [Bun 1.2 (January 2025)](https://bun.com/blog/bun-v1.2) fixed thousands of Node.js compatibility bugs:

- **node:http2** — added HTTP/2 server support (previously only client worked), enabling gRPC servers
- **node:dgram** — UDP socket implementation for packages like DataDog `dd-trace` and ClickHouse
- **node:cluster** — multi-threaded HTTP server support across multiple CPUs
- **node:zlib** — completely rewritten from JavaScript to native code, added Brotli support
- **V8 C++ API** — unprecedented implementation of V8's public C++ API in JavaScriptCore, allowing packages like `cpu-features` to run without modification

[Bun 1.3 (October 2025)](https://bun.com/blog/bun-v1.3) added 800+ more tests from the Node.js test suite and implemented support for `vm.SourceTextModule`, `vm.SyntheticModule`, and `node:test`.

**Current status:** Over 90% of Node.js tests for core modules pass successfully.

### HTTP Framework Issues

**Problem:** Express and Fastify ran slower or with errors due to incomplete `node:http` implementation.

**Solution:** [Bun 1.2](https://bun.com/blog/bun-v1.2) optimized `node:http`, making Express 3x faster than on Node.js. In [Bun 1.2.6 (March 2025)](https://bun.sh/blog/bun-v1.2.6.md), Express became 9% faster, Fastify — 5.4% faster.

**Current status:** Express, Fastify, and Hono work without modifications. Hono on Bun shows up to 180K requests per second.

### Async Stack Traces

**Problem:** Stack traces in Bun didn't show async calls, making it difficult to debug async/await code.

**Solution:** [Bun 1.3](https://bun.com/blog/bun-v1.3) added async stack traces — now the call stack includes the full chain of async operations. In [version 1.2.22 (September 2025)](https://bun.com/blog/bun-v1.2.22), bugs with truncated stack traces were fixed.

**Current status:** Full async stack trace support for debugging.

### Angular Support

**Problem:** In early 2025, Angular CLI had compatibility issues with Bun: builds took too long, there were errors with Node.js runtime version detection.

**Solution:** Improvements in [Bun 1.2](https://bun.com/blog/bun-v1.2) (node:http, node:vm) and [Bun 1.3](https://bun.com/blog/bun-v1.3) (vm.SourceTextModule, Node.js compatibility) fixed most issues. In the second half of 2025, Angular applications started working stably with Bun.

**Current status:** Works. Although the [official support request](https://github.com/angular/angular-cli/issues/24490) in Angular CLI was closed, in practice `bun install` and `bun run` work with Angular projects.

### Next.js and Other Frameworks

**Problem:** Early versions of Bun had issues with Next.js dev server and some features.

**Solution:** [Bun 1.3](https://bun.com/blog/bun-v1.3) fixed Next.js dev server crashes, CJS/ESM module resolution issues, and circular dependencies. [Vercel added native Bun Runtime support (October 2025)](https://bun.com/blog/vercel-adds-native-bun-support).

**Current status:** Next.js works with Bun. Astro, SvelteKit, Remix, and Nuxt have integrated Bun-specific optimizations.

### Native Modules (node-gyp, N-API)

**Problem:** Packages with native C/C++ extensions (node-gyp) didn't work because they're compiled for V8, while Bun uses JavaScriptCore.

**Current status:** Bun [implemented Node-API](https://bun.com/docs/runtime/nodejs-compat), allowing many native modules to run without recompilation. Popular packages like `better-sqlite3` work, though using the built-in `bun:sqlite` is recommended.

**Remaining limitations:**
- `bcrypt` — recommended to use `bcryptjs` or `Bun.password`
- `canvas` — no full workaround
- `argon2` — no native support
- Packages with `binding.gyp` files may not work

### Prisma and ORM

**Problem:** Prisma used a Rust-based query engine that had compatibility issues with Bun and edge runtimes.

**Solution:** Prisma 7 (November 2025) replaced the Rust engine with a TypeScript/WASM query compiler. [Prisma v7.2.0 (December 2025)](https://www.bytebase.com/blog/drizzle-vs-prisma/) added Bun-aware initialization.

**Current status:** Prisma is fully compatible with Bun starting from v5.4 (generated client is pure JavaScript). Drizzle ORM works with Bun natively.

### Compatibility Summary

| Area | Status | Fix Version |
|------|--------|-------------|
| Windows | Full support | Bun 1.1 (April 2024) |
| Node.js API (90%+) | Works | Bun 1.2 (January 2025) |
| Express/Fastify/Hono | Works | Bun 1.2+ |
| Next.js | Works | Bun 1.3 |
| Async Stack Traces | Works | Bun 1.3 |
| Angular | Works | Bun 1.2/1.3 (H2 2025) |
| Native modules | Partial | Depends on package |

**Author-Compiler:** Vitaly Balananov

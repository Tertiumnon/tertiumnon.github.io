# Bun — Fast JavaScript Runtime and All-in-One Toolkit

<img src="https://bun.sh/logo.svg" alt="Bun Logo" width="200" />

> **Who this article is for:** JavaScript/TypeScript developers looking for a Node.js alternative with improved performance, built-in tooling, and streamlined workflow.

Bun is a modern JavaScript runtime and toolkit that combines runtime, package manager, bundler, and test runner in one. Its main goal is to provide developers with the fastest and simplest stack for working with JavaScript and TypeScript.

This article explores Bun's key features, shows performance metrics for basic scenarios (HTTP server, cold start, memory, package installation), and discusses when to use it.

## Table of Contents

- [What is Bun?](#what-is-bun)
- [Core Features](#core-features)
- [Quick Start](#quick-start)
- [Performance Metrics](#performance-metrics)
- [When to Use Bun](#when-to-use-bun)
- [Limitations and Considerations](#limitations-and-considerations)
- [Working with Multithreading](#working-with-multithreading-in-bun)
- [References and Resources](#references-and-additional-materials)

## What is Bun?

Bun is a project written in **Zig** using **JavaScriptCore** (WebKit's JavaScript engine). It positions itself as a fast replacement for Node.js and Deno, combining package manager, bundler, transpiler, and test framework in a single binary.

**Key advantages:**

- ⚡ **Speed** — fast startup, shorter build times, and high throughput for network operations
- 📦 **Single binary** — fewer dependencies and quick installation
- 🛠️ **Built-in tools** — integrated package manager, bundler, and testing
- 🔄 **Compatibility** — most Node.js code runs on Bun with minimal changes

### Bun's Creator: Jarred Sumner

<img src="https://avatars.githubusercontent.com/u/709451?v=4" alt="Jarred Sumner" width="150" style="border-radius: 50%;" />

**Jarred Sumner** is the founder and CEO of Oven.sh, creator of Bun runtime. Thiel Fellowship alumnus (2014).

**Key milestones:**

- **May 2021** — first tweets about Bun project
- **July 5, 2022** — Bun 0.1 announcement
- **August 2022** — $7M Seed funding round from Kleiner Perkins and Guillermo Rauch (Vercel)
- **September 2023** — Bun 1.0 release
- **2025** — over 5 million downloads per month, used at Anthropic (Claude Code CLI)

Sumner actively develops the Bun ecosystem, adding new features: full-stack dev server, SQL API, Redis support, and other tools for full-stack development.

**Contact:**

- GitHub: [@Jarred-Sumner](https://github.com/Jarred-Sumner)
- X (Twitter): [@jarredsumner](https://x.com/jarredsumner)
- LinkedIn: [Jarred Sumner](https://www.linkedin.com/in/jarred-sumner-a8772425/)

### Zig Language: Bun's Foundation

<img src="https://raw.githubusercontent.com/ziglang/logo/master/zig-mark.svg" alt="Zig Language" width="150" />

**Zig** is a modern systems programming language created by **Andrew Kelley**. Bun is written in Zig due to its performance, safety, and ease of C integration.

**Why Zig was chosen for Bun:**

- 🚀 **C-like performance** — compiles to native code without runtime overhead
- 🔒 **Memory safety** — compile-time checks without garbage collector
- 🔄 **C compatibility** — direct integration with C libraries (JavaScriptCore, libuv)
- ⚡ **Memory control** — explicit management without hidden allocations
- 🛠️ **Simple debugging** — no macros or hidden control flow

**Key Zig features:**

- **Imperative, statically typed** compiled language
- **No hidden control flow** — all code is explicit and predictable
- **Compile-time execution** — powerful metaprogramming system
- **Cross-compilation out of the box** — supports all popular platforms
- **Error handling** — explicit through error types (`!` operator)

**Zig's Creator: Andrew Kelley**

<img src="https://avatars.githubusercontent.com/u/106511?v=4" alt="Andrew Kelley" width="150" style="border-radius: 50%;" />

Andrew Kelley started developing Zig in 2015 with the goal of improving C by making the language simpler, safer, and more powerful.

**Recent achievements (2025):**

- Project migration from GitHub to Codeberg (November 2025)
- Compiler performance improvements of 5-50% for x86_64
- Self-hosted compiler development

**Zig's philosophy:**

> "No hidden control flow. No hidden memory allocations. No preprocessor, no macros."

This makes Zig an ideal choice for systems programming where performance and predictability matter.

**Links:**

- [Official Zig website](https://ziglang.org/)
- [Andrew Kelley on GitHub](https://github.com/andrewrk)
- [Andrew Kelley's personal site](https://andrewkelley.me/)

## Core Features

| Command | Description | Node.js Alternative |
|---------|-------------|---------------------|
| `bun run` | Execute JavaScript/TypeScript files | `node` / `ts-node` |
| `bun install` | Fast dependency manager | `npm install` / `yarn` |
| `bun build` | Bundler and minifier | `webpack` / `esbuild` |
| `bun test` | Built-in test runner | `jest` / `vitest` |
| `bun create` | Initialize projects from templates | `npm create` |

### TypeScript: Built-in Support

Bun **natively supports** running and bundling TypeScript files without a separate compilation step — you can write `.ts`/`.tsx` directly and run them through Bun.

**Important:** Bun does NOT replace static type checking. For full type checking, use `tsc --noEmit` in CI. Bun provides a fast transpiler/bundler with support for most TypeScript syntax features and built-in sourcemaps.

## Quick Start

### Installing Dependencies

```bash
bun install
```

### Running a Script

```bash
bun run start
# or directly
bun index.ts
```

### Building a Project

```bash
bun build index.ts --target node --outfile dist/bundle.js
```

#### Watch Mode (Automatic Rebuild)

```bash
# Build and watch for changes
bun build --watch --target=node --outfile=dist/server.js src/server.ts

# Disable screen clearing between rebuilds
bun build --watch --no-clear-screen --target=node --outfile=dist/server.js src/server.ts
```

**Useful flags:**
- `--watch` — enable watch mode
- `--no-clear-screen` — don't clear console between rebuilds
- `--outfile` / `--outdir` — output path
- `--target` — target platform: `node`, `bun`, or `browser`
- `--react-fast-refresh` — fast refresh for React

### Running Tests

Bun includes a built-in test runner compatible with Jest API:

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

# Watch mode (rerun on changes)
bun test --watch
```

Expected output:

```text
 RUNS  tests/example.test.ts
 PASS  tests/example.test.ts (5 ms)
 ✓ 1 test passed
```

## Performance Metrics

> **⚠️ Important:** Micro-benchmark results don't always translate to real applications. In production scenarios, performance differences are often insignificant or even opposite to synthetic tests.

Data obtained from simple "Hello World" HTTP server tests and aggregated from independent 2025 benchmarks. Results may vary significantly in real applications with databases, complex business logic, and dependencies.

---

**Test versions:**

- Node.js v24.x (Active LTS, released May 6, 2025)
- Node.js v22.x (Maintenance LTS)
- Node.js v20.x (Maintenance LTS)
- Deno v2.1.14 (May 13, 2025)
- Bun v1.2.17 (Jun 21, 2025)

### Cold Start (Startup Time, ms)

_Colors (left to right):_ **orange** — Node 20; **yellow** — Node 22; **red** — Node 24; **green** — Deno; **blue** — Bun.

![Cold Start: Bun vs Node/Deno](./bun-performance/bun-cold-start-comparison.svg)

**Results:**

- **Bun:** ~2 ms — fastest startup
- **Deno:** ~22 ms
- **Node.js v22:** ~23 ms (improvement)
- **Node.js v20:** ~25 ms
- **Node.js v24:** ~26 ms (regression)

**⚠️ Important clarification:** Shown results (2ms for Bun) relate to local micro-benchmarks. In **serverless environments** (AWS Lambda, CloudFlare Workers), Bun can show **significantly worse** results due to loading a non-standard runtime. In production cases, cold start with Bun may increase 2-3x.

### Throughput (req/s)

![Throughput: Bun vs Node/Deno](./bun-performance/bun-throughput-comparison.svg)

**Results:**

- **Deno 2.x:** ~68k req/s — impressive performance, exceeding Bun
- **Bun:** ~52k req/s — 4× faster than Node.js
- **Node.js v22:** ~15k req/s — improvements in WebStreams and Fetch API
- **Node.js v20/v24:** ~13-14k req/s

**Note:** Results for simple HTTP server without database access. In real applications with complex logic, differences often smooth out.

### Memory Usage (MB)

![Memory: Bun vs Node/Deno](./bun-performance/bun-memory-comparison.svg)

**⚠️ Important:** Contrary to popular belief, Bun uses **more memory** than Node.js:

- **Bun:** ~70 MB
- **Node.js v20/v22/v24:** ~45-55 MB
- **Deno:** ~50 MB

In production cases, memory consumption increased by **30-40%** when migrating from Node.js to Bun. This is related to JavaScriptCore architecture and optimizations for execution speed.

---

### Dependency Installation

**Package manager versions:**

- npm v10.x
- yarn v4.x (Berry)
- pnpm v10.x
- bun v1.2.17 (built-in)

#### Package Manager Comparison

Package installation time by manager and scenario (in seconds, lower is better):

| Scenario | npm v10 | yarn v4 | pnpm v10 | bun v1.2 | Leader |
|----------|---------|---------|----------|----------|--------|
| **Clean install** (no cache) | 45s | 32s (-29%) | 18s (-60%) | **8s (-82%)** | 🏆 **bun** (5.6× faster) |
| **With cache** (repeat) | 22s | 15s (-32%) | 7s (-68%) | **3s (-86%)** | 🏆 **bun** (7.3× faster) |
| **CI with lockfile** (frozen) | 28s | 20s (-29%) | 12s (-57%) | **5s (-82%)** | 🏆 **bun** (5.6× faster) |
| **Update dependencies** | 35s | 26s (-26%) | 14s (-60%) | **6s (-83%)** | 🏆 **bun** (5.8× faster) |
| **Monorepo** (~50 packages) | 120s | 45s (-63%) | 25s (-79%) | **15s (-88%)** | 🏆 **bun** (8× faster) |

_Percentages show improvement over npm. Testing on a project with ~200 dependencies._

**Key takeaways:**

- 🥇 **Bun** — absolute leader (5-8× faster than npm). Ideal for local development and CI/CD
- 🥈 **pnpm** — excellent balance of speed and stability (2.5-5× faster than npm). Saves disk space
- 🥉 **yarn v4 (Berry)** — stable 25-32% improvement. Good choice for large teams
- **npm** — slowest but most compatible. Built into Node.js

#### Runtime Comparison

| Runtime | Built-in Manager | Clean Install | With Cache | Monorepo |
|---------|------------------|---------------|------------|----------|
| Node.js v20 | npm | 45s | 22s | 120s |
| Node.js v22 | npm (improved) | 42s | 19s | 110s |
| Node.js v24 | npm | 44s | 21s | 115s |
| Deno v2.x | built-in | 38s | 16s | 95s |
| Bun v1.2 | built-in | **8s** | **3s** | **15s** |

_Node.js v22 shows slight npm improvement. Deno is 15-20% faster than Node.js+npm due to optimized built-in manager._

**Important factors affecting performance:**

- **Internet connection speed** — critical for first install
- **File system type** — pnpm uses symlinks (may be slower on Windows without WSL)
- **Number and size of dependencies** — affects difference between managers
- **postinstall scripts** — can negate fast manager benefits
- **Manager version** — yarn v1 classic is 2-3× slower than v4 Berry

---

## Bun vs Deno: Comparison

Both Bun and Deno are modern Node.js alternatives, but they solve different tasks with different philosophies. Here's an objective comparison:

### Where Bun Exceeds Deno

#### 🚀 npm Ecosystem Compatibility

**Bun:**
- ✅ **90%+ compatibility** with npm packages out of the box
- ✅ Full `package.json` and `node_modules` support
- ✅ Built-in package manager **5-8× faster** than npm
- ✅ Binary lockfile (`bun.lockb`) for instant installation

**Deno:**
- ⚠️ **80%+ compatibility** via npm specifiers (improved in Deno 2.0)
- ⚠️ npm support is relatively new with edge cases
- ⚠️ Own ecosystem (deno.land/x) significantly smaller than npm

**Conclusion:** For projects with many npm dependencies, Bun is more practical.

#### ⚡ Package Installation Speed

| Scenario | Bun | Deno | Bun Advantage |
|----------|-----|------|---------------|
| Clean install | 8s | 38s | **4.8× faster** |
| With cache | 3s | 16s | **5.3× faster** |
| Monorepo | 15s | 95s | **6.3× faster** |

#### 🛠️ Developer Experience for Node.js Migration

- **Bun:** Drop-in Node.js replacement — most projects work without changes
- **Deno:** Requires rethinking architecture (URL imports, permissions)

### Where Deno Exceeds Bun

#### 🔒 Security

**Deno:**
- ✅ **Permissions system** — explicit flags for access (--allow-net, --allow-read)
- ✅ Written in **Rust** — memory safety guarantees
- ✅ Suitable for running untrusted code in sandbox

**Bun:**
- ❌ No permissions system yet (like Node.js)
- ⚠️ Not recommended for isolated code execution

**Conclusion:** For security-critical applications and edge deployments, Deno is better.

#### 🏆 HTTP Performance (throughput)

As benchmarks showed:

- **Deno 2.x:** ~68k req/s
- **Bun:** ~52k req/s

Deno shows **30% higher throughput** in HTTP loads.

#### 🧰 Built-in Tools

**Deno:**
- ✅ REPL for experiments
- ✅ Built-in linter and formatter
- ✅ Test runner
- ✅ Debugger
- ✅ Simple executable creation

**Bun:**
- ✅ Test runner, bundler
- ❌ No REPL
- ❌ No built-in linter/formatter

#### 🌐 Web Standards

**Deno:**
- ✅ Full Web Platform APIs compatibility (fetch, WebSocket, Web Crypto)
- ✅ Code works identically in browser and server

**Bun:**
- ⚠️ Partial Web APIs compatibility
- ⚠️ Uses JavaScriptCore instead of V8

### 📊 Comparison Table

| Criterion | Bun | Deno | Winner |
|-----------|-----|------|--------|
| **npm compatibility** | 90%+ | 80%+ | 🏆 **Bun** |
| **Package install speed** | Very fast | Medium | 🏆 **Bun** |
| **Throughput (HTTP)** | 52k req/s | 68k req/s | 🏆 **Deno** |
| **Cold start** | ~2ms | ~22ms | 🏆 **Bun** |
| **Security** | No permissions | Permissions system | 🏆 **Deno** |
| **Built-in tools** | Basic | Complete | 🏆 **Deno** |
| **TypeScript** | Built-in | Built-in | 🤝 Equal |
| **Node.js migration** | Easy | Difficult | 🏆 **Bun** |
| **Web Standards** | Partial | Full | 🏆 **Deno** |
| **Ecosystem size** | npm (2M+) | deno.land/x (smaller) | 🏆 **Bun** |

### 🎯 When to Choose Bun over Deno

**Choose Bun if:**

- 📦 You need **maximum npm compatibility** (90%+)
- ⚡ **Dependency installation speed** is critical (CI/CD, monorepo)
- 🔄 You're **migrating from Node.js** with minimal changes
- 🚀 Priority is **fast cold start** for CLI tools
- 💼 You have existing Node.js project with many dependencies

**Choose Deno if:**

- 🔒 You need **security and isolation** (permissions system)
- 🌐 **Full Web Standards compatibility** is important
- 🏆 **Maximum HTTP performance** is critical (edge functions)
- 🧰 You value **rich built-in tooling**
- 🆕 Starting new project from scratch without legacy code

### 💡 Practical Advice

For most developers working with Node.js ecosystem:

- **Bun** — optimal choice for **speeding up development** and **local work**
- **Deno** — preferable for **new projects** focused on **security** and **modern standards**

Both runtimes are actively developing, and the capability gap is gradually closing.

---

## When to Use Bun

✅ **Recommended for:**

- Developing new projects with focus on development speed
- Local development and CI/CD — accelerating dependency installation and builds
- Small HTTP services and APIs with minimal dependencies
- Scripts and utilities where startup speed matters
- Pure JavaScript/TypeScript projects without native addons

⚠️ **Use with caution:**

- Production applications with critical stability requirements
- Projects with many native dependencies (node-gyp, .node modules)
- Serverless Functions (AWS Lambda) — cold start may be slower than Node.js
- Legacy projects dependent on Node.js-specific APIs

❌ **Not recommended:**

- Projects using `worker_threads`, `cluster` (requires rewriting)
- Applications with native modules incompatible with JavaScriptCore
- Critical systems requiring maximum stability and ecosystem maturity

## Limitations and Considerations

### Main Limitations

- **JavaScriptCore vs V8:** Some Node.js API behavior may differ
- **Native modules:** High probability of incompatibility with `.node` / `node-gyp` addons
- **Rapid development:** Frequent breaking changes, follow releases

### Detailed Limitations Summary

| Area | Issue | Solution |
|------|-------|----------|
| **Native addons** (.node / node-gyp) | High incompatibility probability | Replace with pure-JS alternatives or isolate in microservice |
| **worker_threads / cluster** | Not supported | Rewrite for Web Workers API |
| **Streams / HTTP** | Backpressure/event differences | Test integrations |
| **ESM vs CJS** | Mixed CJS code may cause issues | Convert to ESM when possible |
| **CI/Deploy** | Specific builds | Use fallback containers with Node |

**Problem probability:** Depends on project architecture. Pure JS/TS projects with web-oriented libraries encounter fewer issues.

## Working with Multithreading in Bun

Bun uses **Web Worker API** (like browsers), not Node.js `worker_threads`. This makes the model compatible with web-oriented API and quite convenient for CPU-intensive tasks.

### Key Points

- Create worker with `new Worker(...)` and communicate via `postMessage`/`onmessage`
- Use `MessageChannel` for bidirectional communication
- For binary data transfer, use Transferable objects (ArrayBuffer) — fast, no copying
- For process isolation, use `Bun.spawn`

### Simple Example (Web Worker)

```js
// worker.js
self.onmessage = (e) => {
  const arr = e.data || [];
  const sum = arr.reduce((a, x) => a + x, 0);
  self.postMessage({ sum });
};
```

```js
// main.js
const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });
worker.onmessage = (e) => {
  console.log('Sum from worker:', e.data.sum);
};
worker.postMessage([1, 2, 3, 4, 5]);
```

### Transferable Objects (No Copying)

```js
// main.js
const buffer = new ArrayBuffer(1024 * 8);
const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });
worker.postMessage(buffer, [buffer]); // buffer transferred as transferable

// worker.js
self.onmessage = (e) => {
  const view = new Uint8Array(e.data);
  // ... heavy task without data copying
  self.postMessage({ ok: true });
};
```

### MessageChannel for Bidirectional Communication

```js
// main.js
const chan = new MessageChannel();
const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });
worker.postMessage({ port: chan.port2 }, [chan.port2]);
chan.port1.onmessage = (e) => console.log('From worker:', e.data);
chan.port1.postMessage('ping');

// worker.js
self.onmessage = (e) => {
  const port = e.data.port;
  port.onmessage = (ev) => port.postMessage('pong');
};
```

### Using Bun.spawn (Separate Process)

```js
const p = Bun.spawn({
  cmd: ["node", "worker-process.js"],
  stdout: 'pipe',
  stdin: 'pipe'
});
p.stdin.write(JSON.stringify({data: 'hi'}));
```

### Recommendations

- **CPU tasks:** Use Web Workers or separate processes
- **IO tasks:** Prefer async/event-based approaches
- **Node.js migration:** Rewrite `worker_threads` code for Web Worker API or use conditional detection: `if (typeof Bun !== 'undefined') ...`

## Example: Bun in AWS Lambda

Bun can run in AWS Lambda two ways:

1. **Container image** (recommended)
2. Custom runtime

### Minimal Dockerfile

```dockerfile
FROM oven/bun:1.2.17
COPY . /app
WORKDIR /app
RUN bun install
CMD ["bun", "run", "start"]
```

**Important:** In serverless environments, cold start with Bun may be slower than Node.js due to loading non-standard runtime.

## References and Additional Materials

### Official Documentation

- [Official Bun website](https://bun.sh)
- [GitHub: oven-sh/bun](https://github.com/oven-sh/bun)
- [Official Deno benchmarks](https://deno.com/benchmarks)
- [Node.js Performance Working Group](https://github.com/nodejs/performance)

### Current Benchmarks and Comparisons (2025)

- [Bun vs Node.js 2025: Performance Comparison Guide - Strapi](https://strapi.io/blog/bun-vs-nodejs-performance-comparison-guide)
- [Node vs Deno vs Bun: The Ultimate 2025 Performance Battle](https://junkangworld.com/blog/node-vs-deno-vs-bun-the-ultimate-2025-performance-battle)
- [Bun vs Node Memory: The Real Performance Story Behind the Hype](https://ritik-chopra28.medium.com/bun-vs-node-memory-the-real-performance-story-behind-the-hype-5f1f8ab3b3e2)
- [State of Node.js Performance 2024 - NodeSource](https://nodesource.com/blog/State-of-Nodejs-Performance-2024)

### Production Cases and Practical Experience

- [Node vs Bun: no backend performance difference](https://evertheylen.eu/p/node-vs-bun/)
- [Investigating a Severe Performance Regression in Node.js v22 and v24](https://github.com/nodejs/node/issues/60719)
- [Deno 2.0: The Next Evolution in JavaScript Runtime](https://ikiran.vercel.app/insights/deno-2-revolutionizing-javascript-runtime)

### Testing Tools

- [GitHub: denosaurs/bench - Comparing HTTP frameworks](https://github.com/denosaurs/bench)
- [GitHub: RafaelGSS/nodejs-bench-operations](https://github.com/RafaelGSS/nodejs-bench-operations)

---

## Conclusion

**Bun's Strengths:**

- ⚡ Exceptional package installation speed (5-8× faster than npm)
- 🚀 Fast application startup (cold start ~2ms in local tests)
- 📦 Built-in tools: runtime, bundler, test runner, package manager
- 🔄 TypeScript out of the box without additional setup
- 🎯 Ease of use and minimal configuration

**Weaknesses and Limitations:**

- 🧠 Increased memory consumption (+30-40% compared to Node.js)
- ⚠️ Incompatibility with some native Node.js modules
- 🔧 Requires rewriting code using `worker_threads`
- 🌩️ Slow cold start in serverless environments (AWS Lambda)
- 🔄 Rapid development with frequent breaking changes

**Application Recommendations:**

- **New projects:** Excellent choice for quick start
- **Local development:** Significant build and installation acceleration
- **CI/CD:** Major time savings on dependency installation
- **Production:** Use cautiously, thoroughly test before migration
- **Monorepos:** Dramatic package work speed improvement

---

**Disclaimer:** Data in this article is collected from public sources and independent benchmarks. Performance heavily depends on specific use-case, application architecture, software versions, and hardware. Own testing is recommended for your specific scenario.

---

**Author-Compiler:** Vitaly Balabanov

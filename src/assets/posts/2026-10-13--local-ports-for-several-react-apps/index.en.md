---
publishedAt: 2026-10-13
category: Development
tags: ["Ports", "React", "Local Development", "Convention"]
---

# Local Ports for Several React Apps: Stop Guessing

You start one React app, it opens on `3000`. You start a second one and it either refuses to start, quietly moves to `3001`, or asks you to pick another port. Then a third app joins, a backend joins, and a database joins. Soon nobody knows which browser tab talks to which API.

This post explains why port selection gets messy, and how a simple convention and a small tool fix it.

## Why this happens

Every framework picks its own default, and they overlap heavily:

| Tool | Default port | What happens when it is busy |
|------|-------------:|------------------------------|
| Create React App | 3000 | Asks to use another port |
| Next.js | 3000 | Silently uses 3001 |
| Vite | 5173 | Silently uses 5174 unless `strictPort` is set |
| Express, NestJS, Fastify | 3000 | Crashes with `EADDRINUSE` |
| Django, FastAPI | 8000 | Fails with "address already in use" |

Two problems follow from this.

**Silent fallbacks break things.** When Next.js moves to `3001`, the browser still points at `3000`, the OAuth redirect URI still lists `3000`, and the CORS allowlist still names the old origin. The symptom is a login error or a blank page, not "port in use".

**Ports are hard-coded in many places.** A port lives in the dev script, the `.env` file, the proxy config, the CORS list, the OAuth settings, the bookmarks, and the README. Changing one app's port means hunting through all of them.

On Windows there is one more trap. Hyper-V and WSL reserve blocks of TCP ports. A port inside one of those blocks fails with "access denied", even though nothing is listening on it.

## What a good answer needs

- Every app gets a port that nobody else on the machine uses.
- The port tells you what kind of process it is: a frontend, an API, a tool.
- Frameworks never fall back to a different port silently.
- Shared services, such as PostgreSQL and Redis, keep their standard ports so connection strings stay familiar.
- Debugger ports are reserved, so a debugger never collides with an app.

## The convention

The [app-port-convention repository](https://github.com/Tertiumnon/app-port-convention) describes a scheme built on these rules:

- **Stacks get blocks of 1000 ports.** JavaScript and TypeScript start at `12000`, Python at `13000`, Go, Rust and C at `14000`, JVM at `15000`, and so on.
- **Each project takes a slot of 100 ports** inside its stack block. A machine can run ten projects per stack, numbered `0` to `9`.
- **Roles take fixed offsets inside the slot:** `+00` web frontend, `+10` gateway, `+20` API, `+30` internal services, `+40` tools.
- **Shared services keep their defaults.** PostgreSQL stays on `5432`, Redis on `6379`, Ollama on `11434`.
- **Conflicts between shared services go to a fallback block** at `25000`–`25999`, recorded per machine.

The formula is short:

```
Port = Stack base + (Project slot × 100) + Role offset
```

## Three React apps, three slots

With the convention, three React apps on one machine look like this:

| App | Slot | Web | API | Auth |
|-----|-----:|----:|----:|-----:|
| shop | 0 | 12000 | 12020 | 12030 |
| admin | 1 | 12100 | 12120 | 12130 |
| dashboard | 2 | 12200 | 12220 | 12230 |

Each app's API is always its web port plus `20`, so the relationship is visible at a glance. Nothing collides, and nothing has to be guessed.

## Set the port explicitly

Do not rely on defaults. Set the port in the project itself, so every developer and every script gets the same answer.

Create React App reads an environment variable:

```bash
PORT=12000 npm start
```

Next.js takes a flag:

```bash
next dev -p 12000
```

Vite takes a flag and should fail instead of falling back:

```js
// vite.config.js
export default {
  server: {
    port: 12000,
    strictPort: true,
  },
};
```

With `strictPort: true`, Vite refuses to start on a busy port and tells you so. That failure is cheap to fix. A silent fallback is not.

## Use the tool

The [App Port Convention page](https://tertiumnon.github.io/#/software/app-port-convention) turns the convention into a lookup:

1. Type your framework in the search box, or pick it from the list.
2. Choose a free project slot.
3. Copy the recommended web, gateway, API, internal, and tools ports, plus the reserved debugger port and the shared services for that stack.

The page covers the frameworks in the convention, from React and Vue to Django, Spring Boot, Rails, and ASP.NET Core.

## What the convention does not solve

- **Containers.** Inside Docker networks, services talk by name, and only the host-facing ports need to follow the convention.
- **Clusters.** In Kubernetes, Services and Ingress handle ports. Developers do not pick them.
- **Several developers.** A slot only needs to be unique on one machine. Keep the slot list in the repository's `ports.md` so teammates agree on what they run.

## Summary

Port conflicts are not a framework problem. They are a naming problem. Give every process a port with a meaning, set that port explicitly, and let shared services keep the defaults everyone already knows. The convention and the tool make that a lookup instead of a debate.

---
publishedAt: 2026-10-13
updatedAt: 2026-10-15
category: Development
tags: ["Ports","Local Development","Convention"]
---

# Local Ports for Several Apps: Stop Guessing

Nobody runs one app on a machine anymore. One dev box holds a frontend, an API, a gateway, a database, a tunnel, a debugger — React is only one of them, an Angular site or an Express handler asks for the same kind of number. TCP gives each process one slot from a namespace of 65,535 numbers, shared by every process on that machine, and a number carries no name. The moment you run two processes, you're juggling slots by hand. No framework doc will fix this for you, because the framework isn't wrong — it grabbed the next number available to it while some other process already held that number.

The article walks the problem by altitude: what a junior developer does, what a single project does, what teams at scale do. Each level adds structure; none of it depends on a framework.

## What a junior developer does

The workflow a junior developer reaches for looks like this:

1. The first app starts on its default and works. The second, third and fourth collide with it, and the failure mode differs per stack: Next.js shifts to `3001` silently, Vite shifts unless told not to, Express throws `EADDRINUSE`. Some tools move quietly, others crash, so a link you kept pointing at the old slot is now dead in one case and live in another.
2. When something else already holds the slot, you go free it by force.
3. The moment a port shifts, you re-point everything by hand — and the count surprises people: dev script, `.env`, CORS allow list, OAuth redirect URIs, reverse-proxy config, bookmarks, README, teammates' tickets. One app's port change means editing all of them consistently.
4. You hold the mapping in your head: "that tab is the API", and after the third restart the memory stops matching the URLs.

The "free the slot" step is where the whole pattern turns random, because these commands act on whoever happens to own the number:

```powershell
netstat -ano | Select-String ':3000'
Stop-Host -Id 21816 -Force # the PID read from the line above
```

```bash
sudo lsof -i tcp:3000   # owner PID sits in the second column
sudo kill <PID>
```

You just stopped a process belonging to some other thing, and you didn't learn which one before stopping it. Windows adds a trap that no port listing reveals: Hyper-V and WSL reserve ranges of TCP numbers, so a bind inside those ranges answers "access denied" while **nothing** is listening there — an otherwise-free number simply isn't bindable, and no tool tells you why.

Every symptom this workflow produces is unrelated to its cause: a login error ("redirect URI mismatch"), a blank page, a CORS rejection. You spend an afternoon discovering that `localhost:3000` wasn't what you thought it was, and the actual repair is a sweep across half a dozen files whose shared trigger was invisible. The cost is not the framework's — it comes from a port being a nameless number that also lives in half a dozen places.

## Who owns a port right now

Ask the machine instead of your memory. On Windows:

```powershell
netstat -ano | Select-String 'LISTENING'
```

On macOS/Linux:

```bash
sudo lsof -nP -i TCP
```

And your browser already tracks live origins, which is the answer for web apps specifically:

```
chrome://inspect/#targets
```

That page lists every origin currently bound on the machine, whether from an open tab or a foreign process. Guesswork disappears the moment reading replaces memory: before picking a number, see what already holds a slot.

## First upgrade: pin the number in the project

Defaults differ per stack and drift with versions, so "we always get `3000`" stops being true between machines. Pin the port inside the project so every developer and every CI machine reads the same value, and make startup fail instead of relocating:

| Stack | Where the port gets set | Behaviour when the slot is busy |
|-------|-------------------------|---------------------|
| Vite | `vite.config.js` (`server.port`) | refuses to start when given `strictPort: true` |
| Next.js | CLI `-p` / env `PORT` | takes next free port silently by default |
| Create React App (dev server) | an old serve flag, no config file behind it | default stays glued to `3000`, which is why a CRA-era app fights everyone else's defaults |
| Express / Fastify / NestJS | the literal passed to `listen()` | throws `EADDRINUSE`, message clear enough |
| Angular Dev Server | prints the origin it bound | older docs don't offer a stable knob, read printed URL instead assuming one |
| Django / FastAPI | address arg to `runserver` / uvicorn `--port` | reports bind failure, but address has to be supplied |
| Rails / Spring / ASP.NET Core | run flag/config option | mostly crash rather than shift |

Vite states the principle most clearly:

```javascript
// vite.config.js
import { defineConfig } from 'vite';

export const config = defineConfig({
  server: {
    port: 12000,
    strictPort: true, // refuse to bind anything else
  },
});
```

Silence is worse than an error. An error says "this slot is taken, deal with it now"; a silent move splits your URLs in two halves — half point at the new slot, half still point at the dead one — and that split is exactly what turns into a login error later. Pinning is where a solo developer or a small project stops: no guesswork, no per-machine drift.

## Second upgrade: let the number carry meaning

Same numbers, but the digits themselves carry stack and role, so reading a URL needs neither memory nor a lookup. This [app-port-convention repository](https://github.com/Tertiumnon/app-port-convention) lays out the scheme; short version: stacks hold blocks, projects hold slots within a stack, roles get offsets inside a slot.

```
port = stack base + (project slot × 100) + role offset
```

Now three apps from different stacks, one machine:

| App | Stack (base) | Slot | Web | API | Auth |
|-----|--------------|------|------|------|------|
| `shop` (React) | JS/TS `12000` | 0 | 12000 | 12020 | 12030 |
| `orders` (FastAPI) | Python `13000` | 0 | 13000 | 13020 | 13030 |
| `vault-gw` (Spring) | JVM `15000` | 0 | 15000 | 15020 | 15030 |

What that buys you: `13020` reads as "Python API" with no lookup at all, and every app's API sits at its web port plus 20, so relationship becomes arithmetic rather than memory. Shared services keep the defaults everybody already knows (PostgreSQL `5432`, Redis `6379`, Ollama `11434`) — a collision there is rarer than two people choosing different values to remember. Debuggers get reserved slots too, because Node's inspector at default `9229` competes for the machine like any app does. When two shared services genuinely fight, the loser moves to a recorded fallback range (`25000`–`25999`) per machine, so the same conflict doesn't become an argument each month.

The [App Port Convention page](https://tertiumnon.github.io/#/software/app-port-convention) makes that scheme a lookup: choose stack, choose a free slot, copy out role ports and the reserved debugger port. It stops being React-specific exactly here — the scheme speaks stacks, not ecosystems, and covers everything from JS and Python through JVM and .NET stacks.

## What changes when several people work together

Past one pair of hands, teams stop patching their own tabs and put structure in the repository and the runtime instead of a person's head.

### One map, generated numbers

The list of apps and slots lives in the repository — a `ports.md` or one config object — and start scripts **derive** URLs from it instead of embedding them. A number then exists once, so "update every place" collapses to editing one file. In a monorepo that map is committed, which means teammates read the same values before starting anything.

```javascript
// dev-map.ts — single source of truth: scripts, configs and README all read it
const STACK_BASE = { js: 12000, python: 13000, jvm: 15000 };
const PROJECT_SLOT = { shop: 0, orders: 0, 'vault-gw': 0 };
const ROLE_OFFSET = { web: 0, gateway: 10, api: 20, internal: 30, tools: 40 };

function port(app: string, role: string): number {
  return STACK_BASE[stackOf(app)] + PROJECT_SLOT[app] * 100 + ROLE_OFFSET[role];
}
```

Once startup reads this function, a moved app never leaves a half-updated config again.

### Names over numbers, one port per machine

Teams at scale run a single bind point — one dev-server port on the box — behind a reverse proxy resolving app names instead:

```
ui.acme.test      → :12000 (React)
api.acme.test     → :12020
orders.acme.test  → :13000
```

A developer registers the service once in that proxy config, TCP slots become an implementation detail behind it, OAuth/OIDC redirect URIs get whitelisted against stable corporate names instead of per-machine numbers, and bookmarks keep working across any later port change because they carry the name. The price of that setup is HTTPS tooling: a custom root CA for the self-signed certificates, reserved-suffix discipline (IANA reserves `.test` and `.localhost`; `.local` is not reserved and collides with macOS mDNS), and network-wide host entries. That cost amortizes across every tab, redirect list and README on the team — and if you've ever lost an afternoon on a mismatched redirect URI, this is the reason corporate internal hostnames exist.

### Ports chosen at runtime, not by hand

Containers and clusters carry the same rule further down. Inside a container network services call each other by name (`http://api:12020`, where `api` resolves through container DNS rather than any number), host-facing mappings can stay random — `-p 0:8080` asks Docker for a free slot and you read the bound value out of `docker inspect` — and in Kubernetes the port belongs to the service manifest while ingress, not the developer, decides what reaches a browser. At those altitudes no developer ever writes down a TCP number, so the junior developer's whole problem simply isn't there. It's worth building toward even while your project still runs everything on one laptop, because that's the direction that removes errors instead of hiding them.

### Slots per person instead of shared slots

Two developers starting `shop` on the same machine collide before either app logs a line. Derivation handles this again: an offset folded in from the developer name or employee id, recorded in a repo-level file, so two people don't both claim slot `0`. Slot uniqueness only has to be machine-local — which is exactly what a short committed list gives you, at the cost of one read instead of a chat negotiation per session.

## Where each level lands you

- **One developer, one laptop.** Pin every port, refuse silent fallbacks, query who owns a slot rather than remembering. Enough to kill the afternoon-long hunt; adding more buys nothing.
- **One repository, several people.** Meaningful numbers plus a committed map, debugger slots reserved, docs generated from the same values. Text is reviewable, tribal knowledge disappears.
- **Company scale / monorepo / shared dev environments.** Names resolve in front of a single bind point, slots get allocated by that map or at runtime, cluster tooling assigns them for you. The two levels above stay useful as the substrate under this one.

## What none of this fixes

- **Containers.** Inside a container network services already address each other by name, so only the host-facing edge needs a decision — sometimes none.
- **Clusters.** Kubernetes and ingress own port assignment; hard-coding a number into code aimed at them is the actual mistake there.
- **Several developers, shared machine.** A slot only needs local uniqueness — a committed list settles it without a per-session negotiation.

## Summary

A port is a nameless number that also lives in half a dozen files, and stacks move it without telling you. None of the repair belongs to a framework, and it escalates by altitude: pin it and fail loudly; make the digits express stack and role; derive every copy from one committed map; then resolve names in front of one bind point so the number stops appearing in code at all. React shows up as only one stack in all of this — CRA-era defaults, Next.js defaults, Vite defaults, Express defaults collide for the same structural reason Angular, FastAPI, Rails and Spring do — which is why one shared slot list has to exist rather than one person's numbering scheme. A junior developer frees `:3000` by killing whoever owned it. A mature team never types `:3000` anywhere.

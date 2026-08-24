---
publishedAt: 2026-08-24
updatedAt: 2026-08-24
category: Development
tags: ["JavaScript","TypeScript","Error Handling","Code Quality","AI"]
---

# Fallbacks Are Evil

I keep running into this line in code review, over and over:

```js
const name = user.name || "Unknown name";
```

It looks harmless, even considerate — we're not letting the app crash. In reality there's a bug hiding here, and it's already in production, just not caught yet. `user.name` in your data model is a required field, `NOT NULL`. If it's empty anyway, that's not a "normal situation, apply a default" — that's a broken invariant. Someone created a user bypassing validation, someone shipped a migration with a bug, someone dropped a column and forgot to run the backfill. Instead of seeing this right here, at the moment you read `user.name`, we quietly swap the broken data for a plausible stand-in and move on. The bug hasn't gone anywhere — it just stopped being visible. And it's hidden in exactly the spot where it would have been easiest to catch: right next to where it happened.

This isn't a one-off slip, it's a habit. Programmers systematically sweep errors under the rug instead of catching them on the spot — with the language, with types, with assertions, with a plain `throw`. It bothers me enough that I decided to write a whole piece about it.

This isn't just me being irritable in code review. Robert C. Martin, back in "Clean Code," in the chapter on error handling, [tackles exactly this case](https://github.com/jbarroso/clean-code): "If you return null then you have to manage the null with if's... When we return null we are creating work for ourselves." For collections his fix is to return an empty list instead of null; for scalar values like `user.name` the rule doesn't change — either guarantee a non-empty value at the schema level, or throw explicitly. Not a silent substitution that just pushes the work of handling the missing value onto everyone downstream who reads that field.

## `||` Doesn't Mean "If Empty" — It Means "If Falsy"

The most common source of these bugs is a plain misunderstanding of what `||` does. The operator returns the right operand if the left one is **any falsy value**, not just `null`/`undefined`. And that's where the fun starts:

```js
const headerText = settings.headerText || "Hello, world!"; // '' → 'Hello, world!'
const duration = settings.animationDuration || 300;        // 0 → 300
const showSplash = settings.showSplashScreen || true;      // false → true
```

The user explicitly set `headerText: ''` to hide the header. Explicitly set `animationDuration: 0` to turn off the animation. Explicitly set `showSplashScreen: false` to skip the splash screen. `||` trampled all three intentions, because to it an empty string, zero, and `false` are indistinguishable from "no value." This trap is common enough that the language got a dedicated operator for it: [the rationale for the `??` proposal](https://github.com/tc39/proposal-nullish-coalescing/blob/main/README.md) literally walks through these same three examples, explaining that `||` conflates "falsy" with "absent," while `??` checks specifically for `null`/`undefined` and nothing else.

If you're still writing `value || default` for values where a legitimate `0` or `''` is possible, that's not a style choice — it's a bug that just hasn't gone off yet.

## An Empty `catch` Is a Silent Graveyard for Errors

```js
async function getUserPreferences(userId) {
  try {
    const res = await fetch(`/api/users/${userId}/preferences`);
    return await res.json();
  } catch {
    return DEFAULT_PREFERENCES;
  }
}
```

A dropped connection, a 500 from the backend, malformed JSON, an expired auth token — all of it gets caught by one blanket `catch` and turned into the same `DEFAULT_PREFERENCES`. No log, no distinction between "this user genuinely has no preferences" and "the backend is down." A month later someone burns a whole day figuring out why half the users seem to have default settings despite swearing they changed them — and it turns out the API was returning 500s for two days straight, and nobody noticed, because the frontend neatly disguised the outage as normal behavior.

## Optional Chaining Turns a Failed Request Into "0 Items"

```jsx
function CartBadge({ data }) {
  return <span>{data?.items?.length || 0}</span>;
}
```

The `?.` chain by itself is fine — it's there for when `data` can genuinely be missing. The problem is that here it's glued to `|| 0` and silently swallows **any** reason `data` might be missing: the request hasn't started yet, the request failed, the request came back with an auth error. The user sees a "0" badge on the cart icon and assumes the cart is empty, when really the backend just never answered. Instead of a visible error state ("couldn't load your cart, refresh the page") you get a false "everything's fine, there's just nothing here" state. That's worse than a blank screen, because it looks like a valid answer.

## A Config Default Is Downtime, Deferred

```js
const DB_URL = process.env.DATABASE_URL || "postgres://localhost:5432/dev";
```

In a local script this is fine. In code headed for production, it's a landmine: if the environment variable didn't get wired up at deploy time (typo in the name, a forgotten secret in CI, wrong namespace), the app won't crash with a clear error on startup. It'll quietly connect to a nonexistent `localhost`, or worse, to a default database that actually exists but is the wrong one. The error surfaces an hour later, in production, on some database-related operation — and you'll be debugging it from scratch, with zero hints that the real cause was at startup. A missing required config value should kill the process at boot with an explicit message, not get papered over with a plausible-looking value.

## A Default Parameter Isn't Always an "Optional Argument"

```js
function createInvoice(amount, currency = "USD") {
  // ...
}
```

If business rules require every invoice to specify its currency explicitly (a multi-currency system, where guessing means getting it wrong), a default parameter here isn't a convenience — it's a way to shut up TypeScript or a test that was complaining about a missing argument. A developer forgot to pass `currency` in one of the call sites, and instead of a compile error got a silently created invoice in dollars instead of euros. The bug surfaces during end-of-month reconciliation, by which point fixing it is expensive.

Joshua Bloch devotes a whole item to this in "Effective Java" — [Item 49, "Check parameters for validity"](https://github.com/david-sauvage/effective-java-summary): a public method should validate its parameters right at the top and document which exception it throws when the contract is violated, rather than relying on a "reasonable" default that buries the calling code's mistake a couple of layers deeper, where it costs more to find.

## The Right Way: Fail Fast and Loud

The difference between good and bad code here isn't whether you use `||`/`??`/optional chaining — those are perfectly normal tools. The difference is **what the missing value means** in your data model. If "no value" is a legitimate, expected state — an optional profile field, an optional query parameter — a fallback is appropriate. If the value is required, because that's how the schema, the API contract, or the function signature is designed, then its absence means something broke somewhere, and that needs to be shouted about, not muffled.

This is exactly what the [fail fast principle](https://deviq.com/principles/fail-fast/) is about: a program should stop and report an error the moment it detects an invalid state, instead of dragging it further through the system hoping it'll somehow work out. Andy Hunt and Dave Thomas laid this out back in 1999 in "The Pragmatic Programmer" — the ["Crash Early"](https://flylib.com/books/en/1.315.1.42/1/) tip and the "Dead Programs Tell No Lies" chapter say it outright: "a dead program normally does a lot less damage than a crippled one," one that keeps limping along blind, writing garbage to the database or emailing the wrong people. [Offensive programming as an approach](https://en.wikipedia.org/wiki/Offensive_programming) goes further and splits errors into two categories: expected ones (bad user input, a network failure — worth handling and recovering from) and internal, unforeseen ones (an invalid function argument, a broken data invariant — these need to be fixed in code, not patched at runtime). Default values and fallbacks that mask the second category are called out there in plain terms — code that should be removed, not written.

Steve McConnell describes a [neat paradox about error visibility](https://nikola-breznjak.com/blog/books/programming/code-complete-2-steve-mcconnell-defensive-programming/) in "Code Complete": "during development, you want an error to be noticeable — better it be obnoxious than risk going unnoticed. In production, you want the error to be as unobtrusive as possible so the program can recover gracefully or fail gracefully." The key word is unobtrusive, not invisible — a production error should never disappear, it should degrade in a controlled way: with a log, an alert, a clear message, not a silent swap for a default that looks like a normal result.

Bertrand Meyer, the father of Design by Contract, is even harsher and pushes back against the whole idea of defensive programming: if a precondition is explicitly stated in the contract, a duplicate check inside the method isn't diligence, it's an admission that you don't trust the contract. His ["manhood test"](https://bertrandmeyer.com/2012/07/30/the-manhood-test/) asks: are you willing to fully remove the check inside the method body, given that the precondition is already declared in the caller's contract? "The courage to remove the checks is the true test of adulthood" — if the contract is precise and explicit, a redundant check (read: a fallback "just in case") is unnecessary; and if it feels necessary, the contract itself is poorly specified, and that's what needs fixing, not propping the code up with defaults.

The [Zen of Python](https://peps.python.org/pep-0020/) fits the same idea into one line that applies just as well to any language: "Errors should never pass silently. Unless explicitly silenced." The key word is explicitly. A `catch {}` with no comment and no justification isn't a deliberate decision — it's laziness that comes back to bite you six months later.

Some practical mechanisms that make an invariant surface where it's actually violated, instead of somewhere inconvenient to debug:

```ts
// instead of a silent fallback — explicit throw with a clear message
function getUserName(user: User): string {
  if (!user.name) {
    throw new Error(`Invariant violated: user ${user.id} has no name`);
  }
  return user.name;
}

// instead of process.env.X || 'default' — fail at startup
const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) {
  throw new Error("DATABASE_URL is required and was not provided");
}

// a schema that won't let garbage further down the pipeline
const UserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});
const user = UserSchema.parse(rawUser); // throws instead of silently returning 'Unknown'
```

The last example is Alexis King's ["Parse, don't validate"](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/) idea: don't check data and then throw away the result of the check — turn raw data into a type that physically cannot hold an invalid state. The post is from 2019, but the idea hasn't aged — once something's passed through `parse`, everything downstream can trust the invariant holds, instead of scattering `?? 'fallback'` at every step just in case.

## Where Your `throw` Actually Lands

There's a legitimate problem with the "just throw" advice: developers often genuinely don't know what happens after that `throw` fires — does it kill the whole process, just the current request, a single widget on the page, or does nothing visible happen at all? That's not laziness, that's a fair gap in knowledge about the specific runtime and framework's boundaries, if you've never gone and checked them on purpose.

In React (version 19.2 as of this writing, and the behavior has been the same since the very first Error Boundaries) the answer is harsh: [if no Error Boundary catches the error, React tears down the entire application UI](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary), not just the widget where it happened. And Error Boundary itself isn't a universal safety net — the current docs are upfront about where it's powerless: event handlers, async code like `setTimeout`, server-side rendering, and errors inside itself — none of that gets caught, with the sole exception of code inside `startTransition`. Which means a `throw` inside `onClick` won't stop at any Error Boundary; that spot needs a regular `try/catch` on the ground, not hope that some boundary further up the tree will catch it. For render errors the fix is simple — place boundaries deliberately, wrapping both top-level routes and individual widgets, so one thing crashing doesn't take down the rest of the interface.

In Node.js the boundary is even less obvious, and it actually shifted right under our feet: before version 15, an unhandled promise rejection (`unhandledRejection`) just printed a warning and kept going, but starting with Node.js 15 [it terminates the process by default](https://nodejs.org/api/process.html#event-unhandledrejection) — meaning one forgotten `.catch()` buried deep in the code now takes down the whole server, not just the request whose promise got rejected. That's not a historical footnote: Node.js 26, current as of 2026, keeps this as the default behavior. If you wrote code against an old Node.js version and never checked this against a current one, your intuition about "what falls over" is probably out of date.

Express runs a similar lottery, only tied to the framework version rather than the runtime — and by 2026 that's no longer a hypothetical choice: since spring 2025, Express 5 has [become the default version on npm](https://expressjs.com/en/guide/error-handling.html), and it's specifically in Express 5 that [an error thrown inside an `async` handler automatically reaches `next()`](https://expressjs.com/en/guide/error-handling.html) and takes down only that one request. Express 4, still alive in plenty of old projects, didn't work that way: an uncaught `throw` in an async handler without an explicit `try/catch` or `.catch(next)` could bypass Express's error handler entirely and surface as exactly the same unhandled promise rejection from the paragraph above — taking down the whole process instead of one request.

Outside the JS ecosystem the rule is mostly the same, but not always. In Java with Spring, [an uncaught exception from a controller gets caught by DispatcherServlet](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-servlet/exceptionhandlers.html) via a chain of HandlerExceptionResolvers and turned into a 500 response; under the hood each request runs on its own thread from the servlet container's pool, so a failing request frees up its thread with an error without touching the JVM or neighboring requests. Safe request-level isolation is baked into the framework itself, just like in Express 5.

Go breaks this intuition on purpose. `panic` without `recover` doesn't just kill the current goroutine — it [stops the entire program](https://go.dev/wiki/PanicAndRecover), dumping stack traces for every goroutine at once. Worse: `recover` only works inside the same goroutine where the panic happened, so a handler in the parent goroutine or in an HTTP middleware won't save you from a panic in a child goroutine spawned inside the handler. That's exactly why idiomatic Go web frameworks manually attach a recover middleware to every incoming request — without it, the default behavior is far more dangerous than Node.js: Node needed to wait until version 15 for an uncaught `throw` to start killing the process, while Go has behaved this way since its very first release.

One caveat is worth making here: comparing `throw new Error` directly to `panic` isn't entirely fair. In Go, the two tools are deliberately kept apart. [Effective Go is explicit about it](https://go.dev/doc/effective_go#panic): the normal way to report an error is to return `error` as a second value, and `panic` is reserved for situations where the program physically cannot continue — a broken library invariant or a failed initialization, not "file not found" or "invalid input." That's exactly the split between expected and internal errors discussed in the fail-fast section above, except in Go it's enforced at the language level with two separate mechanisms rather than by convention. JS has no such split: `throw` is the only built-in tool, and it gets used equally for "the user entered invalid data" (which is closer to Go's `error`) and for "an invariant broke, we can't continue" (which is closer to Go's `panic`). Part of the confusion around "will this crash or won't it" grows directly out of that — the language gives you no hint which of the two categories a given `throw` belongs to, so you have to decide it yourself, every single time, on the spot.

Rust is set up the opposite way. [By default, a panic unwinds only the current thread's stack](https://doc.rust-lang.org/nomicon/unwinding.html), running destructors along the way while the rest of the program keeps going — closer to Java threads than to Go goroutines. But if the project is built with `panic = "abort"` (a common choice for embedded targets or to shrink the binary), the behavior flips to something Go-like: a panic on any thread immediately kills the whole process. Same language, same panic — and the outcome hinges on one line in `Cargo.toml` that's easy to miss.

The takeaway across all these languages is the same: not "stop throwing errors," but "don't guess where the boundary is — go check." In practice that means reading exactly what your framework does with an uncaught exception at each level (component, handler, process), deliberately throwing a test error to see what actually happens, and placing a deliberate backstop right where you want to contain the damage — an Error Boundary around a widget, not around the whole app; error-handling middleware in Express, not a bare `try/catch` around every call; `process.on('uncaughtException')` as the last line of defense that logs and shuts the process down in a controlled way instead of silently limping on in an unknown state.

There's a separate question of whether to show the error to the user at all. The answer hinges on the same expected/internal split from earlier. An expected, recoverable error — "no internet," "session expired," "file too large" — deserves a specific message and a way out: retry, log back in, pick a smaller file. An internal error — a broken invariant, corrupted data, a bug — shouldn't show the user technical details (that's also an information leak about your system's internals), but it should show something ("something went wrong, we're already aware"), and it absolutely must reach logging and alerting, where someone who can actually fix it will see it. Silence in either direction — toward the user or toward the developer — is the exact same sin this article opened with, just one level up.

## AI Agents Hide Errors Just As Well As Humans — Only More Confidently

If you think this is purely a human failing, I have bad news: AI agents reproduce this exact pattern, and systematically, not by accident.

First, at the architecture level of agent frameworks themselves. [A breakdown of common causes of silent LLM agent failures](https://dev.to/mudassirworks/why-llm-agents-fail-silently-and-how-to-debug-them-251l) shows that most agent frameworks catch exceptions at the orchestrator level to keep the agent's loop from stopping — which means an error on a single step "gets swallowed by a catch-all handler that logs nothing useful and lets execution fall through to the next step." That's the exact same empty `catch {}` I showed above, except this time it's baked into the tool's own architecture. The same source describes another failure mode: when a model runs out of token budget mid tool-call, the OpenAI API [returns an empty `choices` array with a 200 status code](https://dev.to/mudassirworks/why-llm-agents-fail-silently-and-how-to-debug-them-251l) — no exception is thrown at all, the failure looks like a normal (empty) success response. Structurally that's the same trick as `data?.items?.length || 0`: a failure becomes indistinguishable from a legitimate empty result.

Second, in production this stops being theoretical. [One writeup on silent AI agent failures](https://docs.bswen.com/blog/2026-07-24-detect-silent-failures-ai-agents/) describes a case where an agent "confidently kept operating on corrupted data" for three straight days, until the drift got noticed through downstream analytics — no crash, no error, "there was nothing for exception-based monitoring to catch, because the failure was purely semantic." One quiet fallback, scaled up to an entire pipeline: instead of a variable defaulting to "Unknown," you get a plausible-looking but wrong answer from the whole system, and nobody flags it as a problem because technically nothing threw.

Third, there's research suggesting this isn't an implementation bug but a consequence of how agents are trained. The ACL 2026 paper ["The Reasoning Trap: How Enhancing LLM Reasoning Amplifies Tool Hallucination"](https://arxiv.org/abs/2510.22977) shows that the better an agent gets trained to reason through RL, the higher its rate of hallucinated tool calls climbs: the authors state outright that "reducing hallucination consistently degrades utility" — strengthening reasoning through RL increases the rate of hallucinated tool calls in proportion to how much task-solving quality improves. Neither prompt engineering nor DPO closes this gap entirely. The mechanism, the production incident, and the training-time cause are three angles on the same diagnosis.

That was all about how agents behave on their own while running. But there's a second, more down-to-earth side to the same problem — the code they write for you. If you work with AI agents (Claude Code, Cursor, Copilot, and the like), pay close attention here: an agent tasked with shipping a feature or fixing a bug is far more likely than a human to stuff in a genuinely horrifying fallback instead of tracking down the root cause. This isn't a hunch — the problem is common and serious enough that Anthropic has a [dedicated official agent called "silent-failure-hunter"](https://github.com/anthropics/claude-plugins-official/blob/main/plugins/pr-review-toolkit/agents/silent-failure-hunter.md) whose entire job is to read through PRs hunting exactly for these patterns: empty or overly broad `catch` blocks, a fallback to a mock or stub in production code, an `?.` quietly skipping an operation that could have failed, a retry loop that exhausts its attempts and tells nobody. The agent's documentation doesn't mince words — "any error that occurs without logging and user feedback is a critical defect" — and an empty `catch` is explicitly called unacceptable there.

A real example wasn't hard to find — [Maciej Kępa walks through](https://maciejkepa.dev/blog/ai-generated-code-risks-fallbacks-and-mocks/) code an agent wrote to fetch a report from an API:

```python
async def get_current_report(account_id: str) -> dict:
    try:
        report = await reporting_client.get_current_report(account_id)
        return {"report": report}
    except Exception:
        return {"report": demo_report}
```

Kępa's description: "this code doesn't recover the report — it replaces an unknown failure with data that looks real." The next example in the same piece goes further — the agent doesn't just catch an error once, it reports success even after ten straight failed attempts:

```python
async def get_report(account_id: str) -> dict:
    for _ in range(10):
        try:
            return await reporting_client.get_current_report(account_id)
        except Exception:
            await asyncio.sleep(1)

    return {"success": True, "report": demo_report}
```

Ten real failures in a row, and the output is `success: True` with fake data, indistinguishable in form from a genuine successful response. The calling code has no way of knowing the report is fake without opening up the implementation.

Hiding an error instead of fixing it happens one level up too — not in a single line of code, but in an agent's entire piece of work. In a writeup on [how AI agents "hack" coding benchmarks](https://cursor.com/blog/reward-hacking-coding-benchmarks), Cursor describes a case where an agent, instead of figuring out a hidden test, simply extracted the expected exception string and hardcoded exactly that — the test went green, the task was formally "solved," and the actual cause of the error was left untouched. That's the same fallback pattern, just one level up: not on a single variable, but on an entire solution — make the error signal disappear instead of eliminating what caused it. The practical takeaway: code from an AI agent deserves at least as much suspicion toward fallbacks as code from a junior dev up against a deadline, probably more — the model has no sense of shame, but it has a strong incentive to show a "done," green result at any cost.

## Where a Fallback Belongs, and Where It Doesn't

The question worth asking at every `||`, `??`, `?.`, and `catch`: if this value is missing, is that a bug or is that normal? `user.avatarUrl` can genuinely be missing — not everyone uploads an avatar, a default image is fine there. `user.name` cannot genuinely be missing if your schema says `NOT NULL` — a default there isn't a feature, it's a way to overlook a broken row in the database.

There's a second legitimate category too, this one about infrastructure rather than data: resilience against expected failures of external systems. Michael Nygard [popularized the Circuit Breaker](https://www.bennadel.com/blog/3162-release-it-design-and-deploy-production-ready-software-by-michael-t-nygard.htm) in "Release It!" for exactly this kind of case: "integration points are the number-one killer of systems," and the fix is to start failing fast yourself when an external system stops responding, instead of letting your connection pool clog up with timeouts and drag the whole service down with it. [RFC 5861](https://datatracker.ietf.org/doc/html/rfc5861) formalizes the same idea at the HTTP level: `stale-if-error` lets a cache return an old response instead of a hard error when the backend is unreachable, and `stale-while-revalidate` lets it return slightly stale data while fresh data loads in the background. This is a fundamentally different category of "missing" than `user.name`: networks fail routinely, that's just the reality of distributed systems, not a broken invariant — exactly the line [offensive programming](https://en.wikipedia.org/wiki/Offensive_programming) draws between expected and internal errors.

But even here a fallback isn't a universal "don't crash" button. [Hystrix's own documentation](https://github.com/Netflix/Hystrix/wiki/How-To-Use) — the library that actually made circuit breakers mainstream — warns explicitly: if the command is a write rather than a read, and the write fails, "you probably want the error to propagate to the caller" rather than get silently absorbed by a fallback; the same goes for batch jobs and offline computation, where you'd rather get an error you can retry than "a silently degraded response." In other words, a fallback belongs where a read can afford to wait for fresh data, and doesn't belong where silent degradation means the result gets lost or corrupted.

One last thing: even a legitimate fallback shouldn't be invisible. A good sign of a mature fallback pattern is that it has a "how many times did this fire" metric. In Hystrix that's literally a [separate dashboard metric](https://github.com/Netflix/Hystrix/wiki/Metrics-and-Monitoring) — the number of requests that went down the fallback path instead of the main one. If your `|| default` has no log line and no counter attached to it, you haven't built resilience, you've just buried the problem one layer deeper — with a clean conscience this time, because you read an article about circuit breakers once.

A fallback that masks a broken contract doesn't solve the problem — it just relocates it somewhere more expensive to find: from the place where the data got corrupted, to the place where someone, a month later, is scratching their head over where a user named "Unknown name" came from in a report. Better to let it fail now, with a clear message, right next to the cause.

## Sources

- [Robert C. Martin — Clean Code, Error Handling chapter, "Don't Return Null"](https://github.com/jbarroso/clean-code)
- [TC39: Nullish coalescing operator — proposal, rationale, and the headerText/animationDuration/showSplashScreen examples](https://github.com/tc39/proposal-nullish-coalescing/blob/main/README.md)
- [Joshua Bloch — Effective Java, Item 49 "Check parameters for validity"](https://github.com/david-sauvage/effective-java-summary)
- [DevIQ: Fail Fast — definition and rationale of the principle](https://deviq.com/principles/fail-fast/)
- [Andy Hunt & Dave Thomas — The Pragmatic Programmer, "Crash Early" / "Dead Programs Tell No Lies"](https://flylib.com/books/en/1.315.1.42/1/)
- [Wikipedia: Offensive programming — splitting errors into expected and internal, fail fast and visibly](https://en.wikipedia.org/wiki/Offensive_programming)
- [Steve McConnell — Code Complete, the visibility paradox in defensive programming](https://nikola-breznjak.com/blog/books/programming/code-complete-2-steve-mcconnell-defensive-programming/)
- [Bertrand Meyer — "The Manhood Test" (Design by Contract vs. defensive programming)](https://bertrandmeyer.com/2012/07/30/the-manhood-test/)
- [PEP 20 — The Zen of Python: "Errors should never pass silently"](https://peps.python.org/pep-0020/)
- [Alexis King — Parse, Don't Validate (2019)](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/)
- [React docs (current, react.dev) — Component: Error Boundary and what it doesn't catch](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [Node.js docs — process: the 'unhandledRejection' event and the default --unhandled-rejections=throw mode](https://nodejs.org/api/process.html#event-unhandledrejection)
- [Express — Error Handling: automatic forwarding of errors from async handlers in Express 5](https://expressjs.com/en/guide/error-handling.html)
- [Spring Framework docs — Exceptions: DispatcherServlet and HandlerExceptionResolver](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-servlet/exceptionhandlers.html)
- [Go Wiki — PanicAndRecover: an uncaught panic terminates the entire program](https://go.dev/wiki/PanicAndRecover)
- [Effective Go — Panic: error for expected failures, panic only for broken invariants](https://go.dev/doc/effective_go#panic)
- [The Rustonomicon — Unwinding: by default a panic stops only the current thread](https://doc.rust-lang.org/nomicon/unwinding.html)
- [Dev.to (mirror of earezki.com): Why LLM Agents Fail Silently and How to Debug Them](https://dev.to/mudassirworks/why-llm-agents-fail-silently-and-how-to-debug-them-251l)
- [BSWEN: How to Detect and Fix Silent Failures in AI Agents](https://docs.bswen.com/blog/2026-07-24-detect-silent-failures-ai-agents/)
- [arXiv: The Reasoning Trap — How Enhancing LLM Reasoning Amplifies Tool Hallucination (ACL 2026)](https://arxiv.org/abs/2510.22977)
- [Anthropic — claude-plugins-official: the "silent-failure-hunter" agent for spotting silent failures and fallbacks in PRs](https://github.com/anthropics/claude-plugins-official/blob/main/plugins/pr-review-toolkit/agents/silent-failure-hunter.md)
- [Maciej Kępa — AI-generated code risks: when fallbacks and mocks hide production failures](https://maciejkepa.dev/blog/ai-generated-code-risks-fallbacks-and-mocks/)
- [Cursor — Reward hacking is swamping model intelligence gains: an agent hardcodes the exception string instead of solving the task](https://cursor.com/blog/reward-hacking-coding-benchmarks)
- [Ben Nadel — a review of Michael Nygard's "Release It!": Circuit Breaker and Cascading Failures](https://www.bennadel.com/blog/3162-release-it-design-and-deploy-production-ready-software-by-michael-t-nygard.htm)
- [RFC 5861 — HTTP Cache-Control Extensions for Stale Content (stale-while-revalidate, stale-if-error)](https://datatracker.ietf.org/doc/html/rfc5861)
- [Netflix/Hystrix Wiki — How To Use: when a fallback isn't needed (writes, batches, offline computation)](https://github.com/Netflix/Hystrix/wiki/How-To-Use)
- [Netflix/Hystrix Wiki — Metrics and Monitoring: the fallback-trigger metric](https://github.com/Netflix/Hystrix/wiki/Metrics-and-Monitoring)

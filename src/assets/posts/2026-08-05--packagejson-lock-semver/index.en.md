---
publishedAt: 2026-08-05
updatedAt: 2026-08-05
category: Development
tags: ["npm","Dependencies","Versioning","package.json","package-lock.json"]
---

# package.json, package-lock.json, and Semantic Versioning: Why You Need to Understand This

If you've ever run `npm install` and then spent an hour and a half debugging why everything works locally but fails in production, this article is for you. That was probably a dependency version issue — the exact problem that proper semantic versioning and lock files solve.

## Why versioning exists in the first place

Imagine: you wrote an app using React 18.2.0, and it works perfectly. A month later, React 18.3.0 is released. Should you automatically get this update? It depends on what changed. If it's only bug fixes, it's probably safe. If there's [a breaking change](https://docs.npmjs.com/about-semantic-versioning/) that breaks half your code — no way.

That's exactly why [semantic versioning (semver)](https://semver.org/) exists. It's a standard that says: the version number carries information about what changed in the package.

## Semantic versioning: MAJOR.MINOR.PATCH

A version consists of three numbers: `MAJOR.MINOR.PATCH`. For example, `1.2.3`.

- **MAJOR** (first digit) — **breaking changes** that break compatibility. If you update from 1.x.x to 2.x.x, prepare for some code to stop working.
- **MINOR** (second digit) — **new features**, but backward-compatible. Updating from 1.2.0 to 1.3.0 should be safe.
- **PATCH** (third digit) — **bug fixes**. Updating from 1.2.3 to 1.2.4 is just fixes.

[The official semver specification](https://semver.org/) states it clearly: increment MAJOR for incompatible API changes, MINOR for backward-compatible new features, and PATCH for backward-compatible bug fixes.

**Example of an exception:** TypeScript is a counterexample. According to its official stance, [TypeScript explicitly does not follow semver](https://dev.to/_d7eb1c1703182e3ce1782/npm-vs-pnpm-vs-yarn-which-package-manager-should-you-use-in-2026-3o3o) and introduces breaking changes in MINOR releases. This means upgrading TypeScript from 5.3.0 to 5.4.0 could break your build — and it's formally correct by version number, but not by semver standards. Lesson: even major versions don't guarantee a package follows semver.

## Versioning in package.json: operators and symbols

This is where the fun starts. When you write a version in `package.json`, you can use different operators. Each tells npm which updates to look for during installation.

### Exact version (no symbols)

```json
{
  "@prisma/client": "6.19.3"
}
```

This means: install **exactly** version 6.19.3, no higher, no lower. Pros: absolute predictability. Cons: if 6.19.4 comes out with a critical bug fix, you won't get it until you manually update `package.json`. And if you forget about it... well, you get the idea.

### Caret (^) — safe updates within major version

```json
{
  "@prisma/client": "^6.19.3"
}
```

The caret says: update MINOR and PATCH within the current MAJOR. So 6.19.3 → 6.20.0 → 6.99.9 is okay. But 7.0.0 is not. This is **npm's default** when you run `npm install <package>` without flags.

**Why this is good:** new features (MINOR) should be backward-compatible, so updating is safe. Bug fixes (PATCH) don't need worry at all.

**Why this can be problematic:** what if a package violates semver? Or what if a transitive dependency of some obscure library got a breaking change in its "minor" version? That's why lock files exist.

### Tilde (~) — only patches

```json
{
  "@prisma/client": "~6.19.3"
}
```

The tilde is more conservative: update only PATCH within the current MINOR. So 6.19.3 → 6.19.4 → 6.19.99 is okay. But 6.20.0 is not.

**When this is useful:** if you're working with a very unstable library where even minor versions can break things. Downside: you miss new features.

### Greater than (>) and less than (<)

```json
{
  "express": ">4.17.0",
  "lodash": "<5.0.0"
}
```

This literally means what it says: install any version strictly greater than 4.17.0 or strictly less than 5.0.0. With `>=` and `<=` it's the same, but you include the boundary value.

**When you'd use this:** rarely. Usually you combine them: `"express": ">=4.17.0 <5.0.0"` means "from 4.17.0 to 4.99.99".

### Equals (=)

```json
{
  "react": "=18.2.0"
}
```

This is the same as just `"react": "18.2.0"`. Exact version, nothing else.

### Asterisk (*)

```json
{
  "react": "*"
}
```

Accept **any** version. Including 0.x.x-alpha-dev-666. You rarely see this in production code because it's basically a lottery.

### Combining operators

[According to npm documentation](https://docs.npmjs.com/about-semantic-versioning/), you can combine operators with spaces:

```json
{
  "react": ">=18.0.0 <19.0.0"
}
```

This means: from 18.0.0 to 18.99.99 inclusive. Practically equivalent to `^18.0.0`, but explicit.

## package-lock.json: why it's your lifesaver

Here's a scenario without a lock file:

1. **Day 1, Machine A (your laptop):** you write `^@prisma/client: 6.19.3` in package.json and run `npm install`. The latest version at that moment is 6.19.5, so npm installs it.
2. **Day 2, Machine B (your colleague's machine):** he clones the repo, sees `^6.19.3`, and runs `npm install`. But 6.20.0 has just been released — so he gets that instead.
3. **Chaos:** it works for you, it doesn't for him. Or worse — tests pass locally but fail on CI/CD, where the build happens at yet another point in time.

[package-lock.json](https://docs.npmjs.com/about-semantic-versioning/) is a file that npm automatically creates and updates when you run `npm install`. It records the **exact version of every package and every dependency** that was installed. When another developer or CI runs `npm install`, npm reads this file and installs **the exact same versions**, regardless of what `^` is in package.json.

This is why lock files are **critical** to commit to git:

```bash
# ✓ correct
git add package.json package-lock.json
git commit -m "Add dependency"

# ✗ wrong
echo "package-lock.json" >> .gitignore
git add package.json
git commit -m "Add dependency"
```

If you don't commit the lock file, every installation becomes a lottery. Imagine you're using `^` everywhere, and two weeks pass between your local update and the production server update. 50 new dependency versions are released. The probability that all of them are compatible and no one violated semver — approaches zero.

[According to research](https://dev.to/wilsonwangdev/lock-files-and-package-manager-migration-a-practical-risk-analysis-2ejn), real packages constantly violate semantic versioning: TypeScript introduces breaking changes in minor releases, PostCSS plugins silently change CSS output. This means lock files are not just convenience — they're your first line of defense.

## The horror story: when versioning breaks your project

**Scenario 1: Forgotten bug fix**

You locked `~express: 4.17.0` and forgot to update. Version 4.17.5 comes out with a critical security fix. You don't get it because you explicitly wrote `~`, not `^`. Three months later, hackers exploit that vulnerability. Not fun.

**Scenario 2: Transitive dependencies**

You installed `some-lib` version 1.2.0, which depends on `other-lib: ^2.3.0`. When you installed it, that was 2.3.5. A week later, `other-lib@2.4.0` comes out with a breaking change. Your colleague clones the repo, runs `npm install` without a lock file — and gets 2.4.0 because the caret allows minor updates. His build breaks, yours works. All because there was no lock file.

**Scenario 3: CI/CD roulette**

On your machine `npm install`, on CI machine `npm install` (or worse — no lock file). Different versions, different results. Code passes local tests but fails on CI. Then you spend two hours wondering why the same thing works differently.

## Different lock files for different package managers

If you're switching from npm to yarn or pnpm, it's important to know:

- **npm** uses `package-lock.json`
- **yarn** uses `yarn.lock`
- **pnpm** uses `pnpm-lock.yaml`

Structurally they differ slightly ([pnpm-lock.yaml](https://dev.to/_d7eb1c1703182e3ce1782/npm-vs-pnpm-vs-yarn-which-package-manager-should-you-use-in-2026-3o3o), for instance, is optimized for pnpm's content-addressable storage), but the essence is the same: they lock exact versions. The key thing:

**Never commit lock files from different package managers simultaneously.** If you're switching from npm to pnpm, delete the old `package-lock.json`:

```bash
rm package-lock.json
pnpm install
git add pnpm-lock.yaml package.json
git commit -m "Migrate to pnpm"
```

If you leave both files, they'll conflict and confuse your teammates.

## Common developer mistakes

### Mistake 1: Adding lock file to .gitignore

```bash
# ✗ mistake
echo "package-lock.json" >> .gitignore
```

This turns versioning into a casino. Commit lock files **always**.

### Mistake 2: Manually editing lock files

Lock files are automatic. Don't touch them by hand. If you need to update a dependency, use:

```bash
npm update package-name  # update within range
npm install package-name@desired-version  # install specific version
```

### Mistake 3: Exact versions everywhere

```json
{
  "react": "18.2.0",
  "express": "4.17.1",
  "lodash": "4.17.21"
}
```

This is conservative but tedious. You miss bug fixes. Use `^` by default — that's what semver is designed for.

### Mistake 4: Wrong lock file handling during branch merges

If you have a merge conflict in `package-lock.json`, don't try to resolve it manually:

```bash
# ✗ wrong: manually editing a lock file
git add package-lock.json  # after manual editing

# ✓ correct
git checkout --ours package-lock.json  # or --theirs
npm install  # npm will automatically update the lock file
git add package-lock.json package.json
```

npm will sort out the conflict on the next `install`.

### Mistake 5: Using npm install instead of npm ci in CI/CD

```bash
# ✗ may update the lock file
npm install

# ✓ guarantees exact versions
npm ci  # clean install
```

[`npm ci`](https://docs.npmjs.com/cli/ci) is specifically for CI environments — it installs exactly what's in the lock file without updating it.

## How to properly work with versioning

1. **Use `^` by default:**
   ```json
   {
     "react": "^18.2.0",
     "express": "^4.17.0"
   }
   ```
   This lets you get bug fixes and new features automatically but protects from breaking changes.

2. **Commit the lock file:**
   ```bash
   git add package.json package-lock.json
   ```

3. **Update dependencies through npm, not manually:**
   ```bash
   npm update            # update within ranges
   npm outdated          # see what updates are available
   ```

4. **Use `npm ci` instead of `npm install` in production:**
   ```bash
   npm ci
   ```

5. **If you need absolute stability, use `~` or exact versions** — but only for critical dependencies:
   ```json
   {
     "critical-lib": "~1.2.3",
     "regular-lib": "^1.2.3"
   }
   ```

6. **Regularly update dependencies**, but do it intentionally:
   ```bash
   npm audit              # check for vulnerabilities
   npm audit fix          # auto-fix
   npm outdated           # see available updates
   ```

## Final checklist

- ✓ I understand that MAJOR.MINOR.PATCH means breaking/new/fix
- ✓ I use `^` for flexibility, `~` for conservatism
- ✓ I commit package-lock.json to git
- ✓ I use `npm ci` in CI/CD, not `npm install`
- ✓ I never manually edit lock files
- ✓ I don't commit lock files from different package managers at the same time

That's all you need to avoid those soul-crushing hours of debugging "works on my machine but not in production."

## Sources

- [npm Documentation: Semantic Versioning](https://docs.npmjs.com/about-semantic-versioning/)
- [Semantic Versioning Official Specification (semver.org)](https://semver.org/)
- [Understanding npm Semantic Versioning and package-lock.json by Gulnar Gasanova, Medium](https://medium.com/@gfaganli/understanding-npm-semantic-versioning-and-package-lock-json-bc0563c66e39)
- [Semver Explained: Why There's a Caret in Your package.json by ByteArcher](https://bytearcher.com/articles/semver-explained-why-theres-a-caret-in-my-package-json/)
- [pnpm vs npm vs yarn: Which Package Manager Should You Actually Use in 2026? by DEV Community](https://dev.to/_d7eb1c1703182e3ce1782/npm-vs-pnpm-vs-yarn-which-package-manager-should-you-use-in-2026-3o3o)
- [Navigating Lock Files: Best Practices and Tips by DEV Community](https://dev.to/torp_martin/navigating-lock-files-best-practices-and-tips-5f44)
- [Lock Files and Package Manager Migration: A Practical Risk Analysis by DEV Community](https://dev.to/wilsonwangdev/lock-files-and-package-manager-migration-a-practical-risk-analysis-2ejn)
- [npm ci Documentation](https://docs.npmjs.com/cli/ci)

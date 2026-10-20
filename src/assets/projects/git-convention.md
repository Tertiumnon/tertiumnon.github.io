# Git Convention

Git branch and commit conventions: goal-based branches, containers for release and hotfix, conventional commits.

## Branches

Branches are named by their goal, not by their type.

- **Work branches** have any goal-based name, for example `merge-branch` or `login-redirect`. One branch can hold several commits of different kinds.
- **Containers** are `develop`, `main`, `release/<name>` and `hotfix/<name>`. They collect work from several developers and are never worked on directly.

Do not put a type in a branch name (`feat/`, `fix/`, `feature/`). The type belongs in the commit message.

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <summary>
```

Common types:

| Type | Use for |
| --- | --- |
| `feat` | a new capability |
| `fix` | a bug fix |
| `refactor` | a change with no behaviour change |
| `docs` | documentation only |
| `test` | tests only |
| `chore` | tooling, housekeeping, version bumps |
| `ci` | pipeline or workflow changes |

Write the summary in the imperative, lowercase, without a trailing period. Keep one logical change per commit, so a branch with several commits reads as a sequence of separate steps.

## Flow

1. Branch from `develop` with a goal-based name.
2. Commit as you go, using the commit types above.
3. Merge the work branch into `develop`, or into `release/<name>` or `hotfix/<name>` when the work belongs to that container.
4. Release from `develop` to `main`, and from `hotfix/<name>` or `release/<name>` to `main`, then bring the change back to `develop`.

Keep `develop` and `main` in sync with origin before and after each release or merge.

## Support

If this project is useful to you, you can support its development on [Ko-fi](https://ko-fi.com/tertiumnon).

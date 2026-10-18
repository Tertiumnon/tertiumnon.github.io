# CLI Convention

Conventions for command-line tools in the Tertium projects, as used by [gf](https://github.com/Tertiumnon/gf). This repo is documentation only.

## Commands

- A command is one lowercase word: `create`, `merge`, `release`.
- Commands take flags, not positional options: `gf create -r 1.2.0`, not `gf create release 1.2.0`.
- `help` and `--help` show usage. `-h` is never help, because it is often a flag.

## Flags

Every flag has a long name. A flag may also have a short name, one letter, for the common ones.

Both forms work, with one or two dashes:

- `-b`, `-branch`, `--branch`

The dash count sets how the flag takes its value:

| Form | Meaning |
| --- | --- |
| `-x <value>`, `-name <value>` | takes an explicit value |
| `--name` | switch, or auto: no value; the tool picks one |
| `--name <value>` | an error, because the switch takes no value |

Flags that always need a value (such as a branch name) take one in both forms.

Examples from gf:

```bash
gf create -r 1.2.0       # explicit version
gf create --release      # version picked from the latest tag
gf create -b login       # branch name, same as -branch login or --branch login
gf release --patch       # switch; -patch is the same
```

Each command takes one of a set of mutually exclusive flags. Giving two is an error.

## Errors

- Print one line starting with `❌`, then exit with code 1.
- Name the bad input, and where it helps, show the valid form: `-hotfix needs a value.`
- A missing required flag prints the usage line for that command, not the whole help text.
- Never print a stack trace for an input mistake.

## Output

- Print each git or shell step as it runs (`> git push ...`), so a failure can be traced.
- Finish with one `✅` line that says what happened.

## Scope

These rules describe how tools are used on the command line. Git branch and commit naming is covered in [git-convention](https://github.com/Tertiumnon/git-convention).

## Support

If this project is useful to you, you can support its development on [Ko-fi](https://ko-fi.com/tertiumnon).

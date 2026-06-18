---
publishedAt: 2022-07-21
---

# Windows + Git: Change crlf to lf

Disable automatic line ending conversion and enforce LF globally:

```
git config --global core.autocrlf false
git config --global core.eol lf
```

Then clear the repository cache and reindex:

```
git rm -rf --cached .
git reset --hard HEAD
```

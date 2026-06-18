---
publishedAt: 2022-09-14
---

# Windows + Git: File permissions

Windows must not change files which were created with Unix permissions. Disable file mode tracking:

```
git config core.filemode false
git config --global core.filemode false
```

The first command applies to the current project, the second applies globally to all repositories.

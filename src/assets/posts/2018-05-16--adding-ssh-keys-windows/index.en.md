---
publishedAt: 2018-05-16
category: Dev Tools
tags: ["DevOps","Git","Terminal","Windows"]
---

# Adding SSH Keys (Git Bash on Windows)

To automatically load your SSH key when Git Bash starts, create `C:\Users\[username]\.bashrc` with the following content:

```bash
#! /bin/bash
eval `ssh-agent -s`
ssh-add /c/Users/[username]/.ssh/[your-ssh-key]
```

Replace `[username]` with your Windows username and `[your-ssh-key]` with your SSH private key filename.

After this, every time you launch Git Bash your SSH key will be loaded automatically.

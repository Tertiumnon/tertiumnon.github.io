---
publishedAt: 2021-10-24
categories: ["Development Tools"]
tags: ["DevOps","Git"]
---

# Azure + Git (SSH) != LFS

Azure DevOps does not support Git LFS over SSH. If you use SSH as your remote transport, `git lfs push` will fail silently or with an unhelpful error.

**Fix:** switch the remote URL to HTTPS for LFS operations, or configure your repository to use HTTPS as the LFS endpoint while keeping SSH for regular git operations.

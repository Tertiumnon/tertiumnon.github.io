---
publishedAt: 2021-10-24
categories: ["Development Tools","Technology"]
tags: ["AI","DevOps","Git","Technology"]
---

# Git: RPC failed Error 413

Error 413 means the HTTP POST body exceeds the server's limit. Fix by increasing Git's HTTP post buffer:

```
git config --global http.postBuffer 157286400
```

This sets the buffer to 150 MB. If you're pushing a very large repository, you may need to increase it further or push in smaller batches.

---
publishedAt: 2022-07-03
categories: ["Technology"]
tags: ["AI","Technology"]
---

# WSL2: Temporary failure resolving

## Problem

Running `sudo apt update` in WSL2 fails with DNS resolution errors:

```
Err:1 http://archive.ubuntu.com/ubuntu focal InRelease
  Temporary failure resolving 'archive.ubuntu.com'
Err:2 http://security.ubuntu.com/ubuntu focal-security InRelease
  Temporary failure resolving 'security.ubuntu.com'
```

## Solution

Set Google's public DNS as the nameserver:

```bash
echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf > /dev/null
```

Then run `sudo apt update` again.

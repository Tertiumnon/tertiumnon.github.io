---
publishedAt: 2024-05-06
categories: ["Hacks"]
tags: ["Tips"]
---

# MS Edge: Managed by your organization

If Edge shows "Managed by your organization" and you want to remove it, delete the policy registry keys:

```
reg delete HKCU\SOFTWARE\Policies\Microsoft\Edge
reg delete HKLM\SOFTWARE\Policies\Microsoft\Edge
```

Run these commands in Command Prompt (as Administrator for the `HKLM` key), then restart Edge.

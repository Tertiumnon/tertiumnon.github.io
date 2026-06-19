---
publishedAt: 2018-08-07
categories: ["System Administration"]
tags: ["Terminal","Windows"]
---

# Tor as a Windows Service

1. Download [Tor Expert Bundle](https://www.torproject.org/download/tor/) from the official Tor Project website
2. Extract to a local folder
3. Open PowerShell as Administrator
4. Navigate to the Tor directory and run:

```powershell
cd ~\path\to\tor\
.\tor.exe --service install
```

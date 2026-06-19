---
publishedAt: 2020-07-16
categories: ["System Administration"]
tags: ["Terminal","Windows"]
---

# Windows: Error: listen EACCES: permission denied 0.0.0.0:{{PORT}}

I encountered an error "listen EACCES: permission denied 0.0.0.0:4200" while starting an Angular project using `npm start`.

## Solution 1

```
net stop winnat
net start winnat
```

## Solution 2

1. Check if the dynamic port range conflicts with your port:

```
netsh int ipv4 show dynamicport tcp
```

2. Reset the dynamic port range:

```
netsh int ipv4 set dynamic tcp start=10000 num=20000
```

3. Address excluded ports:

```
reg add HKLM\SYSTEM\CurrentControlSet\Services\hns\State /v EnableExcludedPortRange /d 0 /f
```

4. Reboot your system.

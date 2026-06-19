---
publishedAt: 2018-05-16
categories: ["System Administration"]
tags: ["Terminal","Windows"]
---

# Install NVM on Windows

1. Delete all existing NVM and NodeJS installations
2. Install NVM via [Chocolatey](https://chocolatey.org/):

```
choco install nvm
```

3. Install a Node.js version:

```
nvm install 6.6.0
```

4. Activate it:

```
nvm use 6.6.0
```

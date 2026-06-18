---
publishedAt: 2021-10-08
---

# NodeJS: How to Refresh PM2 Instance

```bash
sudo npm i pm2@latest -g
sudo pm2 update
sudo pm2 startup
sudo pm2 save
```

1. **Install latest PM2 globally** — Updates PM2 to its most recent version via npm
2. **Update PM2** — Applies any pending updates to the process manager
3. **Enable startup script** — Configures PM2 to automatically restart on system boot
4. **Persist configuration** — Saves the current PM2 configuration and running processes

---
publishedAt: 2019-01-23
categories: ["Development Tools"]
tags: ["Development","IDE"]
---

# How to: Visual Studio Code + XDebug (Remote)

## Remote Server

Find your `php.ini`:

```bash
php -i | grep php.ini
```

Add these lines:

```ini
xdebug.remote_enable=1
xdebug.remote_autostart=1
xdebug.remote_handler="dbgp"
xdebug.remote_port=9000
xdebug.remote_connect_back=1
```

Add the XDebug extension to your browser and enable it.

## Visual Studio Code

Create a launch configuration in `.vscode/launch.json`:

```json
{
  "name": "remote XDebug",
  "type": "php",
  "request": "launch",
  "port": 9000,
  "pathMappings": {
    "/var/www/your-site": "${workspaceRoot}"
  }
}
```

Start the debugging process, then refresh the browser page.

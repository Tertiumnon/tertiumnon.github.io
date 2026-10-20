# @tertium/hlpr

```text
    |==|   |==|
    |  |   |  |
    |  |   |  |
   _|__|___|__|_
  /  ___   ___  \
 |  | o | | o |  |   hlpr
 |  '---' '---'  |   I'll automate you...
 |      /_\      |
  \   .----- .  /
   '._|_|_|__.'
      _|===|_
  o--| [ > ] |--o
 /   |_______|   \
[ ]    || ||    [ ]
     __|| ||__
    |___| |___|
```

hlpr aims to make everyday command-line tasks simpler across Windows, macOS, and Linux. Commands use `hlpr <domain> <command> [params]`, such as `hlpr net scan`, `hlpr process list`, and `hlpr file rename`.

> **Note:** This app is in development. Commands, behavior, and documentation are still evolving and may change without notice.

## Install

```sh
npm install -g @tertium/hlpr
```

Requires Node.js. Shell commands require Bash (Git Bash on Windows). Other requirements are listed in each command's documentation.

## Usage

```sh
hlpr help
hlpr net list -device
hlpr net status
hlpr net scan
hlpr memory info
hlpr system info
hlpr battery status
hlpr ssh mkcon
hlpr ssh mkkey
hlpr file rename -dir ./src -style kebab -r -d -f --dry
```

## Commands

| Command                                             | Purpose                                 |
|-----------------------------------------------------|-----------------------------------------|
| [file rename](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/file/rename/rename.md) | Rename files and directories |
| [file move](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/file/move/move.md) | Move a file and update references |
| [file find](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/file/find/find.md) (`search`) | Find files by name |
| [file read](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/file/read/read.md) | Print a remote file over SSH |
| [file edit](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/file/edit/edit.md) | Edit a remote file in your editor over SSH |
| [image resize](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/image/resize/resize.md) | Create resized copies of an image (`-size <px>`, `--all` popular widths, or `--favicon` single `.ico`) |
| git commands | Moved to [@tertium/gith](https://www.npmjs.com/package/@tertium/gith) (`gith setup -n npm` writes the pre-commit hook); see the changelog |
| [npm scripts](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/npm/scripts/scripts.md) | Add missing start and dev npm scripts |
| [gh setup](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/gh/setup/setup.md) | Write GitHub workflows: npm publish (trusted publishing) and SSH deploy |
| [gh rename](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/gh/rename/rename.md) | Rename a GitHub repository (`-repo <owner/repo> -to <new name>`) |
| [gh change](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/gh/change/change.md) | Rename the default branch of the current repository (`-default-branch <name> -to <new name>`) |
| [az setup](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/az/setup/setup.md) | Write an Azure Pipelines SSH deploy (`azure-pipelines.yml`) |
| [angular setup](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/angular/setup/setup.md) | Set up an Angular project with bun, biome, hooks, and changelog |
| [net list -device](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/net/list/list.md)   | List cached local device IPv4 addresses |
| [net scan](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/net/scan/scan.md)         | List local ports and connections        |
| [net status](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/net/status/status.md) (`info`) | Show network interface addresses |
| [system info](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/system/info/info.md) (`status`) | Show hardware, OS, and physical RAM module details |
| [battery status](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/battery/status/status.md) (`info`) | Show battery charge and status |
| [memory info](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/memory/info/info.md) (`status`) | Show total, used, and free memory |
| [disk info](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/disk/info/info.md) (`status`) | Show disk usage and available space |
| [process list](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/process/list/list.md) | List running processes |
| [process kill](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/process/kill/kill.md) | Kill a process by ID, port, folder, or file |
| [app list](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/app/list/list.md) | List installed apps |
| [app search](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/app/search/search.md) (`find`) | Find installed apps or remote packages by name |
| [app install](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/app/install/install.md) | Find an app by name in package managers and install the one you select |
| [app remove](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/app/remove/remove.md) (`delete`, `uninstall`) | Find and uninstall an app |
| [tool install](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/tool/install/install.md) | Install Docker, htop, fastfetch, Starship, Claude CLI, Codex CLI, Copilot CLI, or another supported tool |
| [runtime install](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/runtime/install/install.md) | Install Node.js, Python, Bun, Rust, or Go |
| [ssh mkcon](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/ssh/mkcon/mkcon.md) | Create a key, authorize it on a host, and save the connection |
| [ssh mkkey](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/ssh/mkkey/mkkey.md) | Create a key pair and save the connection locally |
| [zsh fix --bun](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/zsh/zsh.md) | Add bun to PATH in ~/.zshrc |
| [ssh setup](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/ssh/ssh.md#setup) | Create ~/.ssh with the permissions SSH requires |
| [ssh fix --permissions](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/ssh/ssh.md#fix) | Fix permissions of ~/.ssh and its files |
| [mariadb backup](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/mariadb/backup/backup.md) | Dump a MariaDB database over SSH into a local .sql file |
| [mariadb sync](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/mariadb/sync/sync.md) | Copy one MariaDB database over another, backing up the target first |
| [mariadb set-user-password](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/mariadb/set-user-password/set-user-password.md) | Set a MariaDB user's password on a remote host over SSH |
| [mariadb rotate-password](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/mariadb/rotate-password/rotate-password.md) | Rotate a database user's password and the SSM parameter that holds its DATABASE_URL |
| [aws-param-store read](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/aws-param-store/read/read.md) | Print one AWS Parameter Store value, decrypted |
| [aws-param-store edit](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/aws-param-store/edit/edit.md) | Edit one AWS Parameter Store value in your editor and write it back |
| [aws-param-store set](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/aws-param-store/set/set.md) | Replace one KEY=value line in a stored .env value, for example to rotate a password |
| [aws-param-store add](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/aws-param-store/add/add.md) | Create a new parameter; the name must not exist yet |
| [aws-param-store remove](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/aws-param-store/remove/remove.md) | Delete a parameter, with `-confirm` repeating its name |
| [pm2 restart](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/pm2/restart/restart.md) | Restart a PM2 process on a remote host |
| [pm2 stop](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/pm2/stop/stop.md) | Stop a PM2 process on a remote host |
| [pm2 start](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/pm2/start/start.md) | Start the apps of a PM2 config on a remote host |
| [pm2 status](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/pm2/status/status.md) | Print a PM2 process status on a remote host |
| [hello](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/hello/hello.md) | Run a Matrix rain animation until q or Esc |
| [hello world](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/hello/world/world.md) | Display animated Hello World art |
| [animation play](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/animation/play/play.md) | Play a wave, starfield, fire, pipes, or matrix animation until q or Esc |
| [tui run](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/tui/run/run.md) | Run a small full-screen terminal app, such as explorer (a two-panel file manager) |
| [self update](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/self/update/update.md) (`self upgrade`) | Update hlpr and repair broken command files |
| [self fix](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/self/fix/fix.md) | Reinstall hlpr when command files are missing |
| [help](https://github.com/Tertiumnon/tertium-hlpr/blob/HEAD/src/commands/help/help.md)                 | Show available commands                 |

[Support the project](https://ko-fi.com/tertiumnon)

License: MIT.

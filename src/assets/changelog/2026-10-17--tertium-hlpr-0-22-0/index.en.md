## @tertium/hlpr 0.22.0

- refactor(mariadb): read set-user-password's password from stdin when not given
- docs: list set-user-password, rotate-password and pm2 commands
- feat(pm2): add start, stop, restart and status over SSH
- feat(mariadb): add rotate-password for a user and its DATABASE_URL parameter
- feat(ssh): use a Host alias as written when -host names one
- refactor(core): move parseFlags to core/args for every command

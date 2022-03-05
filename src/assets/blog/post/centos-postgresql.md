# PostgreSQL on CentOS

## Setup

### Disable the built-in module (CentOS 8)

```bash
sudo dnf -qy module disable postgresql
```

### Install

```bash
sudo dnf -y install postgresql12 postgresql12-server
```

### Init

```bash
sudo /usr/pgsql-12/bin/postgresql-12-setup initdb
```

### Enable

```bash
sudo systemctl enable --now postgresql-12
```

### Open port

```bash
sudo firewall-cmd --add-service=postgresql --permanent
sudo firewall-cmd --reload
```

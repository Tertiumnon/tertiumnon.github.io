# PostgreSQL

## Use

### Use command as PostgreSQL user

```bash
sudo -u postgres {{command}}
```

### Enter as PostgreSQL admin

```bash
sudo -i -u postgres
```

OR

```bash
sudo su - postgres
```

### Enter console

```bash
psql
```

### Exit as PostgreSQL admin

```bash
\q
```

### Create database

```postgresql
create database {{database}};
```

### List databases

```postgresql
\l
```

### Create user

```postgresql
create user {{user}} with encrypted password '{{password}}';
```

### List users

```postgresql
\du
```

### Add user to database

```postgresql
grant all privileges on database {{database}} to {{user}};
```

### Test connection

```bash
psql -U {{user}} -h {{server_ip}} -p 5432 {{database}}
```

### Drop user

```postgresql
drop user {{user}};
```

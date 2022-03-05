# SSH

## Setup

```bash
mkdir -p .ssh
chmod 700 ~/.ssh
touch ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

## Generate SSH pair

### Generate pair

```bash
cd .ssh
ssh-keygen -t rsa
```

### Update `authorized_keys`

```bash
cat {{filename.pub}} >> .ssh/authorized_keys
```

# CentOS

## Use

### Open port

```bash
sudo firewall-cmd --zone=public --add-port={{port}}/tcp --permanent
sudo firewall-cmd --reload
```

### Open internal http connections

For example for Jira proxy.

```bash
sudo setsebool -P httpd_can_network_connect on
```

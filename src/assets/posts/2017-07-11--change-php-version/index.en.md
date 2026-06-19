---
publishedAt: 2017-07-11
categories: ["Programming"]
tags: ["Backend","JavaScript","Server","Tools"]
---

# How to Change a Version of PHP (Ubuntu Example: PHP 5 → PHP 5.6)

```bash
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
sudo apt-get install php5.6 php5.6-mbstring php5.6-mcrypt php5.6-mysql php5.6-xml
sudo a2dismod php5
sudo a2enmod php5.6
sudo service apache2 restart
```

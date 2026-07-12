---
publishedAt: 2017-12-12
category: Programming
tags: ["Tips"]
---

# MediaWiki: Pywikibot Installation

## Step 1. Install Python 2.7+

Official guide: https://www.mediawiki.org/wiki/Manual:Pywikibot/Installation

## Step 2. Install Pywikibot

Download: http://tools.wmflabs.org/pywikibot/core.zip

Extract to any folder.

## Step 3. Create your site config

Create file `./pywikibot/families/mywikisite_family.py`:

```python
from pywikibot import family

class Family(family.Family):
    def __init__(self):
        family.Family.__init__(self)
        self.name = 'mywikisite'
        self.langs = {
            'en': 'mywikisite.com',
        }
        # for LDAP
        self.ldapDomain = "corp"

    def hostname(self, code):
        return 'mywikisite.com'

    def protocol(self, code):
        return "https"

    def version(self, code):
        return '1.26.0'

    def scriptpath(self, code):
        return ''
```

## Step 4. Create user profile

```
$ python pwb.py generate_user_files
```

Choose your site configuration from the list and use a bot account name.

## Step 5. Login

```
$ python pwb.py login
```
